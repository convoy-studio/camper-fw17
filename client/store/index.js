import Dispatcher from '../dispatcher'
import Constants from '../constants'
import {EventEmitter2} from 'eventemitter2'
import assign from 'object-assign'
import data from '../data'
import Router from '../services/router'
import isRetina from 'is-retina'

function _getContentScope(route) {
    return Store.getRoutePathScopeById(route.path)
}
function _getPageAssetsToLoad(route) {
    const routeObj = (route === undefined) ? Router.getNewRoute() : route
    const scope = _getContentScope(routeObj)
    const type = _getTypeOfPage()
    const id = type.toLowerCase()
    let manifest = []

    if (type !== Constants.PORTRAIT) {
        const filenames = [
            'character' + _getImageDeviceExtension() + '.png',
            'character-bg.jpg',
            'shoe-bg.jpg'
        ]
        manifest = _addBasePathsToUrls(filenames, routeObj.parent, routeObj.target, type)
    } else {
        let filenames = []
        scope[id].assets.forEach((asset) => {
            const name = asset.name + '.' + asset.ext
            // const name = asset.name + _getImageDeviceExtension() + '.' + asset.ext
            filenames.push(name)
        })
        manifest = _addBasePathsToUrls(filenames, routeObj.parent, routeObj.target, type, id)
    }
    // In case of extra assets
    if (scope.assets !== undefined) {
        const assets = scope.assets
        let assetsManifest
        if (type === Constants.PORTRAIT) {
            assetsManifest = _addBasePathsToUrls(assets, 'home', routeObj.target, type)
        } else {
            assetsManifest = _addBasePathsToUrls(assets, routeObj.parent, routeObj.target, type)
        }
        manifest = (manifest === undefined) ? assetsManifest : manifest.concat(assetsManifest)
    }

    return manifest
}
function _addBasePathsToUrls(urls, pageId, targetId, type, typeId) {
    let basePath = (type === Constants.PORTRAIT) ? _getPortraitPageAssetsBasePath() : _getPageAssetsBasePathById(pageId, targetId)
    basePath += pageId + '/' + targetId + '/' + typeId + '/'
    let manifest = []
    for (let i = 0; i < urls.length; i++) {
        const splitter = urls[i].split('.')
        const fileName = splitter[0]
        const extension = splitter[1]
        let id = pageId + '-'
        if (targetId) id += targetId + '-'
        id += fileName
        manifest[i] = {
            id,
            src: basePath + fileName + '.' + extension
        }
    }
    return manifest
}
function _getPageAssetsBasePathById(id, assetGroupId) {
    return Store.baseMediaPath() + 'media/diptyque/' + id + '/' + assetGroupId + '/'
}
function _getPortraitPageAssetsBasePath() {
    return Store.baseMediaPath() + 'media/group/'
}
function _isRetina() {
    return isRetina()
}
function _getImageDeviceExtension() {
    const retina = _isRetina()
    let str = '@1x'
    if (retina === true) str = '@2x'
    return str
}
// function _getDeviceRatio() {
//     const scale = (window.devicePixelRatio === undefined) ? 1 : window.devicePixelRatio
//     return (scale > 1) ? 2 : 1
// }
function _getTypeOfPage(route) {
    let type
    const h = route || Router.getNewRoute()
    if (h.parts.length === 3) type = Constants.PRODUCT
    else type = Constants.PORTRAIT
    return type
}
function _getPageContent() {
    const routeObj = Router.getNewRoute()
    const path = routeObj.path.length < 1 ? '/' : routeObj.path
    const content = data.routing[path]
    return content
}
function _getContentByLang(lang) {
    return data.content.lang[lang]
}
function _getGlobalContent() {
    return _getContentByLang(Store.lang())
}
function _getAppData() {
    return data
}
function _getDefaultRoute() {
    return data['default-route']
}
function _windowWidthHeight() {
    return {
        w: window.innerWidth,
        h: window.innerHeight
    }
}

const Store = assign({}, EventEmitter2.prototype, {
    emitChange: (type, item) => {
        Store.emit(type, item)
    },
    pageContent: () => {
        return _getPageContent()
    },
    appData: () => {
        return _getAppData()
    },
    defaultRoute: () => {
        return _getDefaultRoute()
    },
    globalContent: () => {
        return _getGlobalContent()
    },
    pageAssetsToLoad: (route) => {
        return _getPageAssetsToLoad(route)
    },
    getRoutePathScopeById: (id) => {
        let key = id.length < 1 ? '/' : id
        if (key.indexOf('product')) key = key.replace('/product', '')
        return data.routing[key]
    },
    baseMediaPath: () => {
        return Store.getEnvironment().static
    },
    getCurrentGroup: () => {
        return Router.getNewRoute().parent
    },
    getGroupColor: () => {
        const id = Store.getCurrentGroup()
        return data.groups[id].color
    },
    // getPageAssetsBasePathById: function(parent, target) {
    //     return _getPageAssetsBasePathById(parent, target)
    // },
    getEnvironment: () => {
        return Constants.ENVIRONMENTS[ENV]
    },
    // getTypeOfPage: function(hash) {
    //     return _getTypeOfPage(hash)
    // },
    // getHomeVideos: function() {
    //     return data['home-videos']
    // },
    generalInfos: () => {
        return data.content
    },
    // diptyqueShoes: function() {
    //     return _getDiptyqueShoes()
    // },
    getNextRoute: () => {
        const hashObj = Router.getNewRoute()
        const routes = Router.getPortraitRoutes()
        const current = hashObj.path
        let nextRoute = undefined
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i]
            if (route.path === current) {
                const index = (i + 1) > routes.length - 1 ? 0 : (i + 1)
                nextRoute = routes[index]
                break
            }
        }
        return nextRoute
    },
    getPreviousRoute: () => {
        const hashObj = Router.getNewRoute()
        const routes = Router.getPortraitRoutes()
        const current = hashObj.path
        let previousRoute = undefined
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i]
            if (route.path === current) {
                const index = (i - 1) < 0 ? routes.length - 1 : (i - 1)
                previousRoute = routes[index]
                break
            }
        }
        return previousRoute
    },
    getNextPath: () => {
        return Store.getNextRoute().path
    },
    getPreviousPath: () => {
        return Store.getPreviousRoute().path
    },
    // getDiptyquePageIndex: function() {
    //     var hashObj = Router.getNewRoute()
    //     var routes = Router.getDiptyqueRoutes()
    //     var current = hashObj.hash
    //     for (var i = 0; i < routes.length; i++) {
    //         var route = routes[i]
    //         if(route == current) {
    //             return i
    //         }
    //     };
    // },
    getImageDeviceExtension: _getImageDeviceExtension,
    lang: () => {
        let defaultLang = true
        for (let i = 0; i < data.langs.length; i++) {
            const lang = data.langs[i]
            if (lang === JSLang) {
                defaultLang = false
            }
        }
        return (defaultLang === true) ? 'en' : JSLang
    },
    Window: () => {
        return _windowWidthHeight()
    },
    // addPXChild: function(item) {
    //     Store.PXContainer.add(item.child)
    // },
    // removePXChild: function(item) {
    //     Store.PXContainer.remove(item.child)
    // },
    Parent: undefined,
    Canvas: undefined,
    Orientation: Constants.ORIENTATION.LANDSCAPE,
    Detector: {},
    dispatcherIndex: Dispatcher.register((payload) => {
        const action = payload.action
        switch (action.actionType) {
        case Constants.WINDOW_RESIZE:
            Store.Window.w = action.item.windowW
            Store.Window.h = action.item.windowH
            Store.Orientation = (Store.Window.w > Store.Window.h) ? Constants.ORIENTATION.LANDSCAPE : Constants.ORIENTATION.PORTRAIT
            Store.emitChange(action.actionType)
            break
        default:
            Store.emitChange(action.actionType, action.item)
            break
        }
        return true
    })
})

export default Store
