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

        this.tlOpen = new TimelineMax()
        this.tlClose = new TimelineMax()

        super.componentDidMount()
    }
    onLeftArrowClicked(e) {
        e.preventDefault()
        const path = Store.getPreviousPath()
        Router.setRoute(path)
    }
    onRightArrowClicked(e) {
        e.preventDefault()
        const path = Store.getNextPath()
        Router.setRoute(path)
    }
    changeColor(color) {
        this.leftArrow.changeColor(color)
        this.rightArrow.changeColor(color)
    }
    open() {
        this.tlOpen.timeScale(1.8).play()
    }
    close() {
        this.tlClose.timeScale(1.8).play()
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

        this.tlOpen.clear()
        this.tlClose.clear()

        const padding = Constants.PADDING_AROUND * 2
        this.tlOpen.fromTo(this.leftArrow.el, 1, { x:-padding, force3D: true }, { x:0, force3D: true, ease: Expo.easeInOut }, 0)
        this.tlOpen.fromTo(this.rightArrow.el, 1, { x:padding, force3D: true }, { x:0, force3D: true, ease: Expo.easeInOut }, 0)
        this.tlClose.fromTo(this.leftArrow.el, 1, { x: 0, force3D: true }, { x: -padding, force3D: true, ease: Expo.easeInOut }, 0)
        this.tlClose.fromTo(this.rightArrow.el, 1, { x: 0, force3D: true }, { x: padding, force3D: true, ease: Expo.easeInOut }, 0)
        this.tlClose.pause(0)
        this.tlOpen.pause(0)
    }
}

export default ArrowsContainer
