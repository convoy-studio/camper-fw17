import BaseComponent from '../../pager/components/BaseComponent'
import template from './template.hbs'
import Store from '../../store'
import arrow from './arrow'
import Constants from '../../constants'
import dom from 'dom-hand'
import Router from '../../services/router'

class ArrowsContainer extends BaseComponent {
    constructor() {
        super()
        this.isOpen = false
    }
    render(parent) {
        let scope = {}
        const generaInfos = Store.generalInfos()
        scope.infos = Store.globalContent()
        scope.general = generaInfos
        super.render('ArrowsContainer', parent, template, scope)
    }
    componentDidMount() {
        this.leftArrow = arrow(dom.select('.left-arrow', this.element))
        this.rightArrow = arrow(dom.select('.right-arrow', this.element))

        dom.event(this.leftArrow.el, 'click', this.onLeftArrowClicked)
        dom.event(this.rightArrow.el, 'click', this.onRightArrowClicked)

        this.tl = new TimelineMax()

        super.componentDidMount()
    }
    onLeftArrowClicked(e) {
        e.preventDefault()

        if (dataLayer !== undefined) {
            const group = Store.getCurrentGroup()
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_desktop',
                'eventAct': 'pulsar-nav_der',
                'eventLbl': group
            })
        }

        const path = Store.getPreviousPath()
        Router.setRoute(path)
    }
    onRightArrowClicked(e) {
        e.preventDefault()

        if (dataLayer !== undefined) {
            const group = Store.getCurrentGroup()
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_desktop',
                'eventAct': 'pulsar-nav_izq',
                'eventLbl': group
            })
        }

        const path = Store.getNextPath()
        Router.setRoute(path)
    }
    changeColor(color) {
        this.leftArrow.changeColor(color)
        this.rightArrow.changeColor(color)
    }
    open() {
        this.isOpen = true
        this.tl.timeScale(1.8).play()
    }
    close() {
        this.isOpen = false
        this.tl.timeScale(1.8).reverse()
    }
    resize() {
        const windowW = Store.Window.w
        const windowH = Store.Window.h

        if (!this.domIsReady) return
        this.leftArrow.resize()
        this.rightArrow.resize()

        this.leftArrow.el.style.left = (Constants.PADDING_AROUND) + 'px'
        this.leftArrow.el.style.top = (windowH >> 1) - (this.leftArrow.size[1] >> 1) + 'px'

        this.rightArrow.el.style.left = (windowW) - (Constants.PADDING_AROUND) - (this.rightArrow.size[0]) + 'px'
        this.rightArrow.el.style.top = (windowH >> 1) - (this.rightArrow.size[1] >> 1) + 'px'

        this.tl.clear()

        const padding = Constants.PADDING_AROUND * 2
        this.tl.fromTo(this.leftArrow.el, 1, { x:-padding, force3D: true }, { x:0, force3D: true, ease: Expo.easeInOut }, 0)
        this.tl.fromTo(this.rightArrow.el, 1, { x:padding, force3D: true }, { x:0, force3D: true, ease: Expo.easeInOut }, 0)
        if (this.isOpen) this.tl.pause(this.tl.totalDuration())
        else this.tl.pause(0)
    }
}

export default ArrowsContainer
