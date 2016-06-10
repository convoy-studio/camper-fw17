import Constants from '../constants'
import Dispatcher from '../dispatcher'
import Store from '../store'

// function _proceedTransitionInAction(pageId) {
//     Dispatcher.handleViewAction({
//         actionType: Constants.PAGE_ASSETS_LOADED,
//         item: pageId
//     })  
// }

var Actions = {
    pageHasherChanged: function(pageId) {
        Dispatcher.handleViewAction({
            actionType: Constants.PAGE_HASHER_CHANGED,
            item: pageId
        })
    }
    // loadPageAssets: function(pageId) {
    //     var manifest = Store.pageAssetsToLoad()
    //     if(manifest.length < 1) {
    //         _proceedTransitionInAction(pageId)
    //     }else{
    //         Store.Preloader.load(manifest, ()=>{
    //             _proceedTransitionInAction(pageId)
    //         })
    //     }
    // },
    // windowResize: function(windowW, windowH) {
    //     Dispatcher.handleViewAction({
    //         actionType: Constants.WINDOW_RESIZE,
    //         item: { windowW:windowW, windowH:windowH }
    //     })
    // },
    // pxContainerIsReady: function(component) {
    //     Dispatcher.handleViewAction({
    //         actionType: Constants.PX_CONTAINER_IS_READY,
    //         item: component
    //     })            
    // },
    // pxAddChild: function(child) {
    //     Dispatcher.handleViewAction({
    //         actionType: Constants.PX_CONTAINER_ADD_CHILD,
    //         item: child
    //     })            
    // },
    // pxRemoveChild: function(child) {
    //     Dispatcher.handleViewAction({
    //         actionType: Constants.PX_CONTAINER_REMOVE_CHILD,
    //         item: child
    //     })            
    // },
    // openFunFact: function() {
    //     Dispatcher.handleViewAction({
    //         actionType: Constants.OPEN_FUN_FACT,
    //         item: undefined
    //     })
    // },
    // closeFunFact: function() {
    //     Dispatcher.handleViewAction({
    //         actionType: Constants.CLOSE_FUN_FACT,
    //         item: undefined
    //     })  
    // },
    // cellMouseEnter: function(id) {
    //     Dispatcher.handleViewAction({
    //         actionType: Constants.CELL_MOUSE_ENTER,
    //         item: id
    //     }) 
    // },
    // cellMouseLeave: function(id) {
    //     Dispatcher.handleViewAction({
    //         actionType: Constants.CELL_MOUSE_LEAVE,
    //         item: id
    //     })
    // },
    // openFeed: function() {
    //     Dispatcher.handleViewAction({
    //         actionType: Constants.OPEN_FEED,
    //         item: undefined
    //     })  
    // },
    // openGrid: function() {
    //     Dispatcher.handleViewAction({
    //         actionType: Constants.OPEN_GRID,
    //         item: undefined
    //     })  
    // },
    // appStart: function() {
    //     Dispatcher.handleViewAction({
    //         actionType: Constants.APP_START,
    //         item: undefined
    //     })    
    // }
}

export default Actions


      
