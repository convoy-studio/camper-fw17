import Constants from '../constants'
import Dispatcher from '../dispatcher'
import Store from '../store'
import router from '../services/router'

function _proceedTransitionInAction(pageId) {
    Dispatcher.handleViewAction({
        actionType: Constants.PAGE_ASSETS_LOADED,
        item: pageId
    })  
}

const Actions = {
    pageHasherChanged: function() {
        Dispatcher.handleViewAction({
            actionType: Constants.PAGE_HASHER_CHANGED,
            item: undefined
        })
    },
    loadPageAssets: function(pageId) {
        const manifest = Store.pageAssetsToLoad()
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


      
