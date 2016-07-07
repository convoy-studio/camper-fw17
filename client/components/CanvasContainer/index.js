import BaseComponent from '../../pager/components/BaseComponent'
import NormalRenderer from './normal-renderer'
import GlRenderer from './gl-renderer'
import Store from '../../store'
import Constants from '../../constants'
import Router from '../../services/router'
import Actions from '../../actions'
import {PagerStore, PagerConstants} from '../../pager/Pager'
import dom from 'dom-hand'

class CanvasContainer extends BaseComponent {
    constructor() {
        super()
        this.pageAssetsLoaded = this.pageAssetsLoaded.bind(this)
        this.pageInitialAssetsLoaded = this.pageInitialAssetsLoaded.bind(this)
        this.pageTransitionDidFinish = this.pageTransitionDidFinish.bind(this)
        this.didCanvasClick = this.didCanvasClick.bind(this)
        this.didCanvasMouseEnter = this.didCanvasMouseEnter.bind(this)
        
        Store.on(Constants.PAGE_ASSETS_LOADED, this.pageAssetsLoaded)
        Store.on(Constants.APP_START, this.pageInitialAssetsLoaded)
        PagerStore.on(PagerConstants.PAGE_TRANSITION_DID_FINISH, this.pageTransitionDidFinish)
    }
    render(parent) {
        super.render('CanvasContainer', parent)
    }
    componentWillMount() {
        super.componentWillMount()
    }
    componentDidMount() {
        dom.event.on(this.element, 'click', this.didCanvasClick)
        dom.event.on(this.element, 'mouseenter', this.didCanvasMouseEnter)
        super.componentDidMount()
    }
    didCanvasClick(e) {
        e.preventDefault()
        const route = Router.getNewRoute()
        const newRoute = '/' + route.parent + '/' + route.target + '/product'
        Actions.startMorphing(newRoute)
    }
    didCanvasMouseEnter(e) {
        e.preventDefault()
        Actions.loadMorphing()
    }
    pageInitialAssetsLoaded() {
        Store.off(Constants.APP_START, this.pageInitialAssetsLoaded)
        if (Store.Detector.isSupportWebGL) this.renderer = new GlRenderer()
        else this.renderer = new NormalRenderer()
        this.renderer.init(this.element)
        this.updateStage()
    }
    pageTransitionDidFinish() {
        const newRoute = Router.getNewRoute()
        if (newRoute.type === Constants.PRODUCT) {
            this.element.style.display = 'none'
        } else {
            this.element.style.display = 'block'
        }
    }
    pageAssetsLoaded() {
        this.updateStage()
    }
    didStartMorphing() {
        this.renderer.close()
    }
    updateStage() {
        const newRoute = Router.getNewRoute()
        const oldRoute = Router.getOldRoute()
        if (newRoute.type === Constants.PRODUCT) {
            console.log('')
        } else {
            this.renderer.updateStage(newRoute, oldRoute)
        }
    }
    update() {
        if (this.renderer === undefined) return
        this.renderer.render()
    }
    resize() {
        if (!this.domIsReady) return
        if (this.renderer === undefined) return
        this.renderer.resize()
    }
}

export default CanvasContainer
