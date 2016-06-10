import Dispatcher from '../dispatcher'
import Constants from '../constants'
import {EventEmitter2} from 'eventemitter2'
import assign from 'object-assign'
import data from '../data'
import Router from '../services/router'
import isRetina from 'is-retina'

// function _getContentScope() {
//     var hashObj = Router.getNewHash()
//     return Store.getRoutePathScopeById(hashObj.hash)
// }
// function _getPageAssetsToLoad() {
//     var scope = _getContentScope()
//     var hashObj = Router.getNewHash()
//     var type = _getTypeOfPage()
//     var manifest;

//     if(type != Constants.HOME) {
//         var filenames = [
//             'character' + _getImageDeviceExtension() +'.png',
//             'character-bg.jpg',
//             'shoe-bg.jpg'
//         ]
//         manifest = _addBasePathsToUrls(filenames, hashObj.parent, hashObj.target, type)
//     }

//     // In case of extra assets
//     if(scope.assets != undefined) {
//         var assets = scope.assets
//         var assetsManifest;
//         if(type == Constants.HOME) {
//             assetsManifest = _addBasePathsToUrls(assets, 'home', hashObj.target, type)
//         }else{
//             assetsManifest = _addBasePathsToUrls(assets, hashObj.parent, hashObj.target, type)       
//         }
//         manifest = (manifest == undefined) ? assetsManifest : manifest.concat(assetsManifest)
//     }

//     return manifest
// }
// function _addBasePathsToUrls(urls, pageId, targetId, type) {
//     var basePath = (type == Constants.HOME) ? _getHomePageAssetsBasePath() : _getPageAssetsBasePathById(pageId, targetId)
//     var manifest = []
//     for (var i = 0; i < urls.length; i++) {
//         var splitter = urls[i].split('.')
//         var fileName = splitter[0]
//         var extension = splitter[1]
//         var id = pageId + '-'
//         if(targetId) id += targetId + '-'
//         id += fileName
//         manifest[i] = {
//             id: id,
//             src: basePath + fileName + '.' + extension
//         }
//     }
//     return manifest
// }
// function _getPageAssetsBasePathById(id, assetGroupId) {
//     return Store.baseMediaPath() + 'image/diptyque/' + id + '/' + assetGroupId + '/'
// }
// function _getHomePageAssetsBasePath() {
//     return Store.baseMediaPath() + 'image/home/'
// }
// function _getImageDeviceExtension() {
//     var retina = _isRetina()
//     var str = '@1x'
//     if(retina == true) str = '@2x'
//     return str
// }
// function _isRetina() {
//     return isRetina()
// }
// function _getDeviceRatio() {
//     var scale = (window.devicePixelRatio == undefined) ? 1 : window.devicePixelRatio
//     return (scale > 1) ? 2 : 1
// }
// function _getTypeOfPage(hash) {
//     var h = hash || Router.getNewHash()
//     if(h.parts.length == 2) return Constants.DIPTYQUE
//     else return Constants.HOME
// }
// function _getPageContent() {
//     var hashObj = Router.getNewHash()
//     var hash = hashObj.hash.length < 1 ? '/' : hashObj.hash
//     var content = data.routing[hash]
//     return content
// }
// function _getContentByLang(lang) {
//     return data.content.lang[lang]
// }
// function _getGlobalContent() {
//     return _getContentByLang(Store.lang())
// }
// function _getAppData() {
//     return data
// }
// function _getDefaultRoute() {
//     return data['default-route']
// }
// function _windowWidthHeight() {
//     return {
//         w: window.innerWidth,
//         h: window.innerHeight
//     }
// }
// function _getDiptyqueShoes() {
//     var hashObj = Router.getNewHash()
//     var baseurl = _getPageAssetsBasePathById(hashObj.parent, hashObj.target)
//     return _getContentScope().shoes
// }

var Store = assign({}, EventEmitter2.prototype, {
    emitChange: function(type, item) {
        this.emit(type, item)
    },
    // pageContent: function() {
    //     return _getPageContent()
    // },
    // appData: function() {
    //     return _getAppData()
    // },
    // defaultRoute: function() {
    //     return _getDefaultRoute()
    // },
    // globalContent: function() {
    //     return _getGlobalContent()
    // },
    // pageAssetsToLoad: function() {
    //     return _getPageAssetsToLoad()
    // },
    // getRoutePathScopeById: function(id) {
    //     id = id.length < 1 ? '/' : id
    //     return data.routing[id]
    // },
    // baseMediaPath: function() {
    //     return Store.getEnvironment().static
    // },
    // getPageAssetsBasePathById: function(parent, target) {
    //     return _getPageAssetsBasePathById(parent, target)
    // },
    // getEnvironment: function() {
    //     return Constants.ENVIRONMENTS[ENV]
    // },
    // getTypeOfPage: function(hash) {
    //     return _getTypeOfPage(hash)
    // },
    // getHomeVideos: function() {
    //     return data['home-videos']
    // },
    // generalInfos: function() {
    //     return data.content
    // },
    // diptyqueShoes: function() {
    //     return _getDiptyqueShoes()
    // },
    // getNextDiptyque: function() {
    //     var hashObj = Router.getNewHash()
    //     var routes = Router.getDiptyqueRoutes()
    //     var current = hashObj.hash
    //     for (var i = 0; i < routes.length; i++) {
    //         var route = routes[i]
    //         if(route == current) {
    //             var index = (i+1) > routes.length-1 ? 0 : (i+1)
    //             return routes[index]
    //         }
    //     };
    // },
    // getPreviousDiptyque: function() {
    //     var hashObj = Router.getNewHash()
    //     var routes = Router.getDiptyqueRoutes()
    //     var current = hashObj.hash
    //     for (var i = 0; i < routes.length; i++) {
    //         var route = routes[i]
    //         if(route == current) {
    //             var index = (i-1) < 0 ? routes.length-1 : (i-1)
    //             return routes[index]
    //         }
    //     };
    // },
    // getDiptyquePageIndex: function() {
    //     var hashObj = Router.getNewHash()
    //     var routes = Router.getDiptyqueRoutes()
    //     var current = hashObj.hash
    //     for (var i = 0; i < routes.length; i++) {
    //         var route = routes[i]
    //         if(route == current) {
    //             return i
    //         }
    //     };
    // },
    // getImageDeviceExtension: _getImageDeviceExtension,
    // getPreviewUrlByHash: function(hash) {
    //     return Store.baseMediaPath() + 'image/diptyque/' + hash + '/preview.gif'
    // },
    // getFeed: function() {
    //     return data.feed
    // },
    // lang: function() {
    //     var defaultLang = true
    //     for (var i = 0; i < data.langs.length; i++) {
    //         var lang = data.langs[i]
    //         if(lang == JS_lang) {
    //             defaultLang = false
    //         }
    //     };
    //     return (defaultLang == true) ? 'en' : JS_lang
    // },
    // Window: function() {
    //     return _windowWidthHeight()
    // },
    // addPXChild: function(item) {
    //     Store.PXContainer.add(item.child)
    // },
    // removePXChild: function(item) {
    //     Store.PXContainer.remove(item.child)
    // },
    Parent: undefined,
    Canvas: undefined,
    FrontBlock: undefined,
    Orientation: Constants.LANDSCAPE,
    Detector: {
        isMobile: undefined
    },
    dispatcherIndex: Dispatcher.register(function(payload){
        var action = payload.action
        switch(action.actionType) {
            case Constants.WINDOW_RESIZE:
                Store.Window.w = action.item.windowW
                Store.Window.h = action.item.windowH
                Store.Orientation = (Store.Window.w > Store.Window.h) ? Constants.LANDSCAPE : Constants.PORTRAIT
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

