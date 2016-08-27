import BaseComponent from '../../pager/components/BaseComponent'
import template from './template.hbs'
import Store from '../../store'
import Constants from '../../constants'
import ArrowsContainer from '../ArrowsContainer'
import dom from 'dom-hand'
import indexLayer from './indexLayer'
import navigationLayer from './navigationLayer'

class FrontContainer extends BaseComponent {
    constructor() {
        super()
        this.onAppStarted = this.onAppStarted.bind(this)
        this.didRouteChange = this.didRouteChange.bind(this)
        this.onBurgerClicked = this.onBurgerClicked.bind(this)
        this.updateColors = this.updateColors.bind(this)
        this.onLogoClicked = this.onLogoClicked.bind(this)

        this.openIndex = this.openIndex.bind(this)
        this.closeIndex = this.closeIndex.bind(this)
        Store.on(Constants.OPEN_INDEX, this.openIndex)
        Store.on(Constants.CLOSE_INDEX, this.closeIndex)
        Store.on(Constants.UPDATE_CARDS, this.updateColors)
    }
    render(parent) {
        let scope = {}
        const generaInfos = Store.generalInfos()
        scope.infos = Store.globalContent()
        scope.general = generaInfos
        super.render('FrontContainer', parent, template, scope)
    }
    componentWillMount() {
        super.componentWillMount()
    }
    componentDidMount() {
        Store.on(Constants.APP_START, this.onAppStarted)
        Store.on(Constants.ROUTE_CHANGED, this.didRouteChange)

        this.headerEl = dom.select('header', this.element)
        this.logo = dom.select('.logo', this.headerEl)
        this.logoSvg = dom.select('svg', this.logo)
        this.burger = {
            el: dom.select('.burger', this.element),
            isOpened: false
        }

        dom.event.on(this.burger.el, 'click', this.onBurgerClicked)
        dom.event.on(this.logo, 'click', this.onLogoClicked)

        const indexLayerEl = dom.select('.index-layer-container', this.element)
        this.indexLayer = indexLayer(indexLayerEl)

        const navigationLayerEl = dom.select('.navigation-layer-container', this.element)
        this.navigationLayer = navigationLayer(navigationLayerEl)

        // this.arrowsContainer = new ArrowsContainer()
        // this.arrowsContainer.render(this.element)

        super.componentDidMount()
    }
    updateColors(vars) {
        dom.select('svg', this.burger.el).style.fill = vars.color
        this.navigationLayer.changeColor(vars)
        this.indexLayer.changeColor(vars)
        this.logoSvg.style.fill = vars.color
    }
    onBurgerClicked(e) {
        e.preventDefault()

        if (dataLayer !== undefined) {
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_mobile',
                'eventAct': 'pulsar-menu',
                'eventLbl': Store.CurrentCard.group
            })
        }

        if (this.burger.isOpened) {
            this.closeIndex()
            this.burger.isOpened = false
        } else {
            this.openIndex()
            this.burger.isOpened = true
        }
    }
    onLogoClicked() {
        if (dataLayer !== undefined) {
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_mobile',
                'eventAct': 'pulsar-logo_camper',
                'eventLbl': Store.CurrentCard.group
            })
        }
    }
    didRouteChange() {
        // const color = Store.getGroupColor()
        // this.arrowsContainer.changeColor(color)
        // this.headerLinks.changeColor(color)
    }
    didStartMorphing() {
        // this.arrowsContainer.close()
    }
    showInterface() {
        // this.arrowsContainer.open()
    }
    hideInterface() {
        // this.arrowsContainer.close()
    }
    openIndex() {
        this.indexLayer.openIndex()
    }
    closeIndex() {
        this.indexLayer.closeIndex()
    }
    onAppStarted() {
        Store.off(Constants.APP_START, this.onAppStarted)
        dom.classes.add(this.headerEl, 'show')
    }
    resize() {
        if (!this.domIsReady) return
        // this.arrowsContainer.resize()
        this.indexLayer.resize()
        this.navigationLayer.resize()
    }
}

export default FrontContainer
