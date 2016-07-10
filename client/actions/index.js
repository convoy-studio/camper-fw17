import Constants from '../constants'
import Dispatcher from '../dispatcher'
import Store from '../store'

function _proceedTransitionInAction(pageId) {
    Dispatcher.handleViewAction({
        actionType: Constants.PAGE_ASSETS_LOADED,
        item: pageId
    })
}
function _dispatchNextPreviousAssetsLoaded() {
    Dispatcher.handleViewAction({
        actionType: Constants.LOAD_NEXT_PREVIOUS_PAGE_ASSETS,
        item: undefined
    })
}
const Actions = {
    routeChanged: () => {
        Dispatcher.handleViewAction({
            actionType: Constants.ROUTE_CHANGED,
            item: undefined
        })
    },
    loadPageAssets: (pageId) => {
        const manifest = Store.pageAssetsToLoad()
        if (manifest.length < 1) {
            _proceedTransitionInAction(pageId)
        } else {
            Store.Preloader.load(manifest, ()=>{
                _proceedTransitionInAction(pageId)
            })
        }
    },
    loadNextPreviousPageAssets: () => {
        const nextRoute = Store.getNextRoute()
        const previousRoute = Store.getPreviousRoute()
        const manifestNext = Store.pageAssetsToLoad(nextRoute)
        const manifestPrevious = Store.pageAssetsToLoad(previousRoute)
        Store.Preloader.load(manifestNext, () => {
            Store.Preloader.load(manifestPrevious, _dispatchNextPreviousAssetsLoaded)
        })
    },
    windowResize: (windowW, windowH) => {
        Dispatcher.handleViewAction({
            actionType: Constants.WINDOW_RESIZE,
            item: { windowW: windowW, windowH: windowH }
        })
    },
    appStart: () => {
        Dispatcher.handleViewAction({
            actionType: Constants.APP_START,
            item: undefined
        })
    },
    startMorphing: (route) => {
        Dispatcher.handleViewAction({
            actionType: Constants.START_MORPHING,
            item: route
        })
    },
    loadMorphing: () => {
        Dispatcher.handleViewAction({
            actionType: Constants.LOAD_MORPHING,
            item: undefined
        })
    },
    showInterface: () => {
        Dispatcher.handleViewAction({
            actionType: Constants.SHOW_INTERFACE,
            item: undefined
        })
    },
    hideInterface: () => {
        Dispatcher.handleViewAction({
            actionType: Constants.HIDE_INTERFACE,
            item: undefined
        })
    },
    openIndex: () => {
        Dispatcher.handleViewAction({
            actionType: Constants.OPEN_INDEX,
            item: undefined
        })
    },
    closeIndex: () => {
        Dispatcher.handleViewAction({
            actionType: Constants.CLOSE_INDEX,
            item: undefined
        })
    }
}

export default Actions
