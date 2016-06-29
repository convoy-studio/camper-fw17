import BaseComponent from '../../pager/components/BaseComponent'
import NormalRenderer from './normal-renderer'
import GlRenderer from './gl-renderer'
import Store from '../../store'
import Constants from '../../constants'
import Router from '../../services/router'
import dom from 'dom-hand'

class CanvasContainer extends BaseComponent {
    constructor() {
        super()
        this.pageAssetsLoaded = this.pageAssetsLoaded.bind(this)
        this.pageInitialAssetsLoaded = this.pageInitialAssetsLoaded.bind(this)
        Store.on(Constants.PAGE_ASSETS_LOADED, this.pageAssetsLoaded)
        Store.on(Constants.APP_START, this.pageInitialAssetsLoaded)
    }
    render(parent) {
        super.render('CanvasContainer', parent)
    }
    componentWillMount() {
        super.componentWillMount()
    }
    componentDidMount() {
        dom.event.on(this.element, 'click', this.didCanvasClick)
        super.componentDidMount()
    }
    didCanvasClick(e) {
        e.preventDefault()
        const route = Router.getNewRoute()
        const newRoute = '/' + route.parent + '/' + route.target + '/product'
        Router.setRoute(newRoute)
    }
    pageInitialAssetsLoaded() {
        Store.off(Constants.APP_START, this.pageInitialAssetsLoaded)
        if (Store.Detector.isSupportWebGL) this.renderer = new GlRenderer()
        else this.renderer = new NormalRenderer()
        this.renderer.init(this.element)
        this.updateStage()
    }
    pageAssetsLoaded() {
        this.updateStage()
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
