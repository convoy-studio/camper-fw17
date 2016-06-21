import Constants from '../constants'
import Dispatcher from '../dispatcher'
import Store from '../store'

function _proceedTransitionInAction(pageId) {
    Dispatcher.handleViewAction({
        actionType: Constants.PAGE_ASSETS_LOADED,
        item: pageId
    })  
}

var Actions = {
    pageHasherChanged: function(pageId) {
        Dispatcher.handleViewAction({
            actionType: Constants.PAGE_HASHER_CHANGED,
            item: pageId
        })
    },
    loadPageAssets: function(pageId) {
        var manifest = Store.pageAssetsToLoad()
        if(manifest.length < 1) {
            _proceedTransitionInAction(pageId)
        }else{
            Store.Preloader.load(manifest, ()=>{
                _proceedTransitionInAction(pageId)
            })
        }
    },
    windowResize: function(windowW, windowH) {
        Dispatcher.handleViewAction({
            actionType: Constants.WINDOW_RESIZE,
            item: { windowW:windowW, windowH:windowH }
        })
    },
    appStart: function() {
        Dispatcher.handleViewAction({
            actionType: Constants.APP_START,
            item: undefined
        })    
    }
}

export default Actions


      
