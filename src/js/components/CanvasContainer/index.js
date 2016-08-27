import BaseComponent from '../../pager/components/BaseComponent'
import NormalRenderer from './normal-renderer'
import GlRenderer from './gl-renderer'
import Store from '../../store'
import Constants from '../../constants'
import Router from '../../services/router'
import template from './template.hbs'
import Actions from '../../actions'
import {PagerStore, PagerConstants} from '../../pager/Pager'
import dom from 'dom-hand'

class CanvasContainer extends BaseComponent {
    constructor() {
        super()
        this.pageInitialAssetsLoaded = this.pageInitialAssetsLoaded.bind(this)
        this.pageTransitionDidFinish = this.pageTransitionDidFinish.bind(this)
        this.didCanvasClick = this.didCanvasClick.bind(this)
        this.didCanvasMouseEnter = this.didCanvasMouseEnter.bind(this)
        this.didCanvasMouseLeave = this.didCanvasMouseLeave.bind(this)
        this.openIndex = this.openIndex.bind(this)
        this.closeIndex = this.closeIndex.bind(this)
        this.portraitTransitionDidReachHalfTime = this.portraitTransitionDidReachHalfTime.bind(this)
        this.didBtnClick = this.didBtnClick.bind(this)
        this.showTitle = this.showTitle.bind(this)
        this.hideTitle = this.hideTitle.bind(this)
        
        Store.on(Constants.APP_START, this.pageInitialAssetsLoaded)
        Store.on(Constants.OPEN_INDEX, this.openIndex)
        Store.on(Constants.CLOSE_INDEX, this.closeIndex)
        Store.on(Constants.SHOW_TITLE, this.showTitle)
        Store.on(Constants.HIDE_TITLE, this.hideTitle)
        Store.on(Constants.PORTRAIT_TRANSITION.DID_REACH_HALF_TIME, this.portraitTransitionDidReachHalfTime)
        PagerStore.on(PagerConstants.PAGE_TRANSITION_DID_FINISH, this.pageTransitionDidFinish)
    }
    render(parent) {
        let scope = {}
        scope.url = Store.getURL()
        super.render('CanvasContainer', parent, template, scope)
    }
    componentWillMount() {
        super.componentWillMount()
    }
    componentDidMount() {
        dom.event.on(this.element, 'click', this.didCanvasClick)
        dom.event.on(this.element, 'mouseenter', this.didCanvasMouseEnter)
        dom.event.on(this.element, 'mouseleave', this.didCanvasMouseLeave)
        this.buttonsContainer = dom.select('.buttons-container', this.element)
        this.buttons = dom.select.all('li', this.buttonsContainer)
        this.buttons.forEach((btn) => { dom.event.on(btn, 'click', this.didBtnClick) })
        super.componentDidMount()
    }
    didBtnClick (e) {
        e.preventDefault()
        const url = e.currentTarget.getAttribute('data-url')
        const group = e.currentTarget.getAttribute('data-group')
        if (dataLayer !== undefined) {
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_desktop',
                'eventAct': 'pulsar-index',
                'eventLbl': group
            })
        }
        Router.setRoute(url)
    }
    didCanvasClick(e) {
        e.preventDefault()
        if (Store.IndexIsOpened) return
        const route = Router.getNewRoute()
        const newRoute = Store.getURL() + '/' + route.parent + '/' + route.target + '/product'

        if (dataLayer !== undefined) {
            const group = Store.getCurrentGroup()
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_desktop',
                'eventAct': 'pulsar-discover_' + route.target,
                'eventLbl': group
            })
        }

        Actions.startMorphing(newRoute)
    }
    didCanvasMouseEnter(e) {
        e.preventDefault()
        setTimeout(() => { Actions.loadMorphing() }, 0)
        setTimeout(() => { Actions.titleCanvasEnter() }, 0)
    }
    didCanvasMouseLeave(e) {
        e.preventDefault()
        setTimeout(() => { Actions.titleCanvasLeave() }, 0)
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
        if (newRoute.type === Constants.PRODUCT) this.element.style.display = 'none'
        else this.element.style.display = 'block'
    }
    showTitle() {
        this.renderer.open()
    }
    hideTitle() {
        this.renderer.close()
    }
    didStartMorphing() {
        setTimeout(() => { Actions.hideTitle() }, 0)
    }
    portraitTransitionDidReachHalfTime() {
        setTimeout(() => { Actions.showTitle() }, 0)
        this.updateStage()
        setTimeout(() => { Actions.closeIndex() }, 0)
    }
    openIndex() {
        const newRoute = Router.getNewRoute()
        if (newRoute.type === Constants.PRODUCT) this.element.style.display = 'block'
        this.buttonsContainer.style.display = 'block'
        this.renderer.openIndex()
        this.resize()
    }
    closeIndex() {
        const newRoute = Router.getNewRoute()
        this.buttonsContainer.style.display = 'none'
        if (newRoute.type === Constants.PRODUCT) this.element.style.display = 'none'
        this.renderer.closeIndex()   
    }
    updateStage() {
        const newRoute = Router.getNewRoute()
        const oldRoute = Router.getOldRoute()
        this.renderer.updateStage(newRoute, oldRoute)
    }
    update() {
        if (this.renderer === undefined) return
        this.renderer.render()
    }
    resize() {
        if (!this.domIsReady) return
        if (this.renderer === undefined) return
        this.renderer.resize()
        const sizeEl = dom.size(this.element)
        this.buttonsContainer.style.width = sizeEl[0] + 'px'
        this.buttonsContainer.style.height = sizeEl[1] + 'px'
    }
}

export default CanvasContainer
