import BaseComponent from '../../pager/components/BaseComponent'
import template from './template.hbs'
import Store from '../../store'
import Constants from '../../constants'
import headerLinks from '../HeaderLinks'
import ArrowsContainer from '../ArrowsContainer'
import dom from 'dom-hand'

class FrontContainer extends BaseComponent {
    constructor() {
        super()
        this.onAppStarted = this.onAppStarted.bind(this)
        this.didRouteChange = this.didRouteChange.bind(this)
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
        this.headerLinks = headerLinks(this.element)

        this.arrowsContainer = new ArrowsContainer()
        this.arrowsContainer.render(this.element)

        super.componentDidMount()
    }
    didRouteChange() {
        const color = Store.getGroupColor()
        this.arrowsContainer.changeColor(color)
        this.headerLinks.changeColor(color)
    }
    didStartMorphing() {
        this.arrowsContainer.close()
    }
    onAppStarted() {
        Store.off(Constants.APP_START, this.onAppStarted)
        dom.classes.add(this.headerEl, 'show')
    }
    resize() {
        if (!this.domIsReady) return
        this.arrowsContainer.resize()
        this.headerLinks.resize()
    }
}

export default FrontContainer
