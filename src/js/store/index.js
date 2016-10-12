import Dispatcher from '../dispatcher'
import Constants from '../constants'
import Actions from '../actions'
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
    const type = _getTypeOfPage()
    const typeId = type.toLowerCase()
    let manifest = []
    if (type !== Constants.PORTRAIT) {
        const filenames = [
            'face.png',
            'shoe.png',
            'background.jpg'
        ]
        let m = _addBasePathsToUrls(filenames, routeObj.parent, routeObj.target, type, typeId)
        manifest = manifest.concat(m)
    }
    if (type === Constants.PORTRAIT) {
        const filenames = [
            'transition.png'
        ]
        let m = _addBasePathsToUrls(filenames, routeObj.parent, null, type, "common")
        manifest = manifest.concat(m)
    }
    return manifest
}
function _addBasePathsToUrls(urls, pageId, targetId, type, typeId) {
    let basePath = Store.baseMediaPath() + 'media/group/'
    basePath += pageId + '/'
    if (targetId) basePath += targetId + '/'
    if (typeId) basePath += typeId + '/'
    let manifest = []
    for (let i = 0; i < urls.length; i++) {
        const splitter = urls[i].split('.')
        const fileName = splitter[0]
        const extension = splitter[1]
        let id = typeId + '-' + pageId + '-'
        if (targetId) id += targetId + '-'
        id += fileName
        manifest[i] = {
            id,
            src: basePath + fileName + '.' + extension
        }
    }
    return manifest
}
function _isRetina() {
    return isRetina()
}
function _getAllGroupsTexturesManifest() {
    let manifest = []
    const mainPath = Store.baseMediaPath()
    for (let k in data.groups) {
        if ({}.hasOwnProperty.call(data.groups, k)) {
            const textures = data.groups[k].textures
            textures.forEach((tex) => {
                const id = k + '-texture-' + tex.name
                const src = mainPath + 'media/group/' + k + '/common/' + tex.name + '.' + tex.ext
                manifest.push({ id, src })
            })
        }
    }
    return manifest
}
function _getImageDeviceExtension() {
    const retina = _isRetina()
    let str = '@1x'
    if (retina === true) str = '@2x'
    return str
}
function _getDeviceRatio() {
    const scale = (window.devicePixelRatio === undefined) ? 1 : window.devicePixelRatio
    return (scale > 1) ? 2 : 1
}
function _getTypeOfPage(route) {
    let type
    const h = route || Router.getNewRoute()
    if (h.parts.length === 3) type = Constants.PRODUCT
    else type = Constants.PORTRAIT
    return type
}
function _getPageContent() {
    const route = Router.getNewRoute()
    const path = (route.type === Constants.PRODUCT) ? route.path.replace('/product', '') : route.path
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
    return Store.getURL() + data['default-route']
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
    getURL: () => {
        return HostName + '/' + JSLang + '_' + JSCountry + '/content/' + CampaignName
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
    getTypeOfPage: () => {
        return _getTypeOfPage()
    },
    pagePreloaderId: () => {
        const route = Router.getNewRoute()
        return route.type.toLowerCase() + '-' + route.parts[0] + '-' + route.parts[1] + '-'
    },
    getImgSrcById: (name) => {
        const route = Router.getNewRoute()
        const type = route.type.toLowerCase()
        const id = type + '-' + route.parent + '-' + route.target + '-' + name
        return Store.Preloader.getImageURL(id)
    },
    getImgById: (name) => {
        const route = Router.getNewRoute()
        const type = route.type.toLowerCase()
        const id = type + '-' + route.parent + '-' + route.target + '-' + name
        return Store.Preloader.getContentById(id)
    },
    getTextureSrc: (group, name) => {
        return Store.Preloader.getImageURL(group + '-texture-' + name)
    },
    getTexture: (group, name) => {
        const img = Store.getTextureImg(group, name)
        const texture = new THREE.Texture()
        texture.image = img
        texture.needsUpdate = true
        return texture
    },
    getTextureImg: (group, name) => {
        return Store.Preloader.getContentById(group + '-texture-' + name)
    },
    baseMediaPath: () => {
        return JSUrlStatic
    },
    getCurrentGroup: () => {
        return Router.getNewRoute().parent
    },
    getGroupColor: () => {
        const id = Store.getCurrentGroup()
        return data.groups[id].color
    },
    getAllGroups: () => {
        let groups = []
        for (let prop in data.groups) {
            if ({}.hasOwnProperty.call(data.groups, prop)) {
                groups.push(prop)
            }
        }
        return groups
    },
    getGroupIndexColor: () => {
        const id = Store.getCurrentGroup()
        return data.groups[id].colorIndex
    },
    getGroupById: (id) => {
        return data.groups[id]
    },
    getGroupColors: () => {
        const id = Store.getCurrentGroup()
        return {
            main: data.groups[id].color,
            index: data.groups[id].colorIndex,
            background: data.groups[id].colorBackground
        }
    },
    getPageColorsById: (id) => {
        return data.routing[id].colors
    },
    getPageContentById: (id) => {
        return data.routing[id]
    },
    getGroupSpriteParams: () => {
        const id = Store.getCurrentGroup()
        return data.groups[id].spriteParams
    },
    getGroupBackgroundColor: () => {
        const id = Store.getCurrentGroup()
        return data.groups[id].colorBackground
    },
    getAllTexturesManifest: () => {
        return _getAllGroupsTexturesManifest()
    },
    generalInfos: () => {
        return data.content
    },
    devicePixelRatio: () => {
        return _getDeviceRatio()
    },
    getRouteDirection: () => {
        const newRoute = Router.getNewRoute()
        const oldRoute = Router.getOldRoute()
        let direction = 1
        if (oldRoute === undefined) return direction
        if (newRoute.index > oldRoute.index) direction = 1
        else direction = -1
        if (newRoute.index === 0 && oldRoute.index === 7) direction = 1
        if (newRoute.index === 7 && oldRoute.index === 0) direction = -1
        return direction
    },
    getNextRoute: () => {
        const newRoute = Router.getNewRoute()
        const routes = Router.getPortraitRoutes()
        const current = (newRoute.type === Constants.PORTRAIT) ? newRoute.path : newRoute.path.replace('/product', '')
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
        const newRoute = Router.getNewRoute()
        const routes = Router.getPortraitRoutes()
        const current = (newRoute.type === Constants.PORTRAIT) ? newRoute.path : newRoute.path.replace('/product', '')
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
        return Store.getNextRoute().url
    },
    getPreviousPath: () => {
        return Store.getPreviousRoute().url
    },
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
    Mouse: { x:0, y:0, nX:0, nY:0 },
    Parent: undefined,
    Canvas: undefined,
    Orientation: Constants.ORIENTATION.LANDSCAPE,
    Detector: {},
    AfterMorphingRoute: undefined,
    IndexIsOpened: false,
    InterfaceIsOpen: false,
    CurrentCard: undefined,
    Meshes: {},
    dispatcherIndex: Dispatcher.register((payload) => {
        const action = payload.action
        switch (action.actionType) {
        case Constants.WINDOW_RESIZE:
            Store.Window.w = action.item.windowW
            Store.Window.h = action.item.windowH
            Store.Orientation = (Store.Window.w > Store.Window.h) ? Constants.ORIENTATION.LANDSCAPE : Constants.ORIENTATION.PORTRAIT
            Store.emitChange(action.actionType)
            break
        case Constants.START_MORPHING:
            Store.AfterMorphingRoute = action.item
            setTimeout(() => { Actions.hideInterface() }, 0)
            Store.emitChange(action.actionType, action.item)
            break
        case Constants.ROUTE_CHANGED:
            const type = Store.getTypeOfPage()
            setTimeout(() => { Actions.showInterface() }, 100)
            Store.emitChange(action.actionType, action.item)
            break
        case Constants.OPEN_INDEX:
            Store.IndexIsOpened = true
            Store.emitChange(action.actionType)
            break
        case Constants.CLOSE_INDEX:
            Store.IndexIsOpened = false
            Store.emitChange(action.actionType)
            break
        case Constants.SHOW_INTERFACE:
            if (Store.InterfaceIsOpen) return
            Store.InterfaceIsOpen = true
            Store.emitChange(action.actionType)
            break
        case Constants.HIDE_INTERFACE:
            if (!Store.InterfaceIsOpen) return
            Store.InterfaceIsOpen = false
            Store.emitChange(action.actionType)
            break
        case Constants.UPDATE_CARDS:
            Store.CurrentCard = {
                name: action.item.portraitName,
                group: action.item.group
            }

            if (dataLayer !== undefined) {
                const group = Store.getCurrentGroup()
                dataLayer.push({
                    'event': 'virtualPage',
                    'pageName': JSLang + '_' + JSCountry + '/FW17/mobile/nav_' + Store.CurrentCard.name + '_' + Store.CurrentCard.group
                })
            }

            Store.emitChange(action.actionType, action.item)
            break
        default:
            Store.emitChange(action.actionType, action.item)
            break
        }
        return true
    })
})

export default Store
