import BaseComponent from '../../pager/components/BaseComponent'
import NormalRenderer from './normal-renderer'
import GlRenderer from './gl-renderer'
import Store from '../../store'
import Constants from '../../constants'
import Router from '../../services/router'

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
        super.componentDidMount()
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
        const route = Router.getNewRoute()
        if (route.type === Constants.PRODUCT) return
        this.renderer.updateStage(route)
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
