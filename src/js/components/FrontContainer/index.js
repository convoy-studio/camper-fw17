import BaseComponent from '../../pager/components/BaseComponent'
import template from './template.hbs'
import Store from '../../store'
import Constants from '../../constants'
import headerLinks from '../HeaderLinks'
import ArrowsContainer from '../ArrowsContainer'
import dom from 'dom-hand'
import indexLayer from './indexLayer'

class FrontContainer extends BaseComponent {
    constructor() {
        super()
        this.onAppStarted = this.onAppStarted.bind(this)
        this.didRouteChange = this.didRouteChange.bind(this)
        this.portraitTransitionDidReachHalfTime = this.portraitTransitionDidReachHalfTime.bind(this)

        this.openIndex = this.openIndex.bind(this)
        this.closeIndex = this.closeIndex.bind(this)
        Store.on(Constants.OPEN_INDEX, this.openIndex)
        Store.on(Constants.CLOSE_INDEX, this.closeIndex)
        Store.on(Constants.PORTRAIT_TRANSITION.DID_REACH_HALF_TIME, this.portraitTransitionDidReachHalfTime)
    }
    render(parent) {
        let scope = {}
        const generaInfos = Store.generalInfos()
        scope.infos = Store.globalContent()
        scope.general = generaInfos
        scope.mediaBasePath = Store.baseMediaPath
        super.render('FrontContainer', parent, template, scope)
    }
    componentWillMount() {
        super.componentWillMount()
    }
    componentDidMount() {
        Store.on(Constants.APP_START, this.onAppStarted)
        Store.on(Constants.ROUTE_CHANGED, this.didRouteChange)

        this.headerEl = dom.select('header', this.element)
        this.headerLinks = headerLinks(this.element)

        const indexLayerEl = dom.select('.index-layer-container', this.element)
        this.indexLayer = indexLayer(indexLayerEl)

        this.arrowsContainer = new ArrowsContainer()
        this.arrowsContainer.render(this.element)
        
        super.componentDidMount()
    }
    portraitTransitionDidReachHalfTime() {
        this.updateColors()
    }
    didRouteChange() {
        const type = Store.getTypeOfPage()
        if (type === Constants.PRODUCT) {
            this.updateColors()
        }
        setTimeout(() => {
            this.arrowsContainer.updateArrowImages()
        }, 500)
    }
    updateColors() {
        const color = Store.getGroupColor()
        const group = Store.getCurrentGroup()
        this.arrowsContainer.changeColor(color)
        this.headerLinks.changeColor(color, group)
    }
    didStartMorphing() {
        Store.FrontBlock.style.visibility = 'visible'
    }
    showInterface() {
        this.arrowsContainer.open()
        dom.classes.add(this.headerEl, 'show')
    }
    hideInterface() {
        this.arrowsContainer.close()
        dom.classes.remove(this.headerEl, 'show')
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
        this.arrowsContainer.resize()
        this.headerLinks.resize()
        this.indexLayer.resize()
    }
}

export default FrontContainer
