import BaseComponent from '../../pager/components/BaseComponent'
import template from './template.hbs'
import Store from '../../store'
import arrow from './arrow'
import Constants from '../../constants'
import Actions from '../../actions'
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
        this.leftArrow = arrow(dom.select('.left-arrow', this.element), 1)
        this.rightArrow = arrow(dom.select('.right-arrow', this.element), -1)

        this.onLeftArrowClicked = this.onLeftArrowClicked.bind(this)
        this.mouseOverLeft = this.mouseOverLeft.bind(this)
        this.mouseOutLeft = this.mouseOutLeft.bind(this)
        this.onRightArrowClicked = this.onRightArrowClicked.bind(this)
        this.mouseOverRight = this.mouseOverRight.bind(this)
        this.mouseOutRight = this.mouseOutRight.bind(this)

        dom.event(this.leftArrow.el, 'click', this.onLeftArrowClicked)
        dom.event(this.leftArrow.el, 'mouseenter', this.mouseOverLeft)
        dom.event(this.leftArrow.el, 'mouseleave', this.mouseOutLeft)
        dom.event(this.rightArrow.el, 'click', this.onRightArrowClicked)
        dom.event(this.rightArrow.el, 'mouseenter', this.mouseOverRight)
        dom.event(this.rightArrow.el, 'mouseleave', this.mouseOutRight)

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
    mouseOverLeft(e) {
        e.preventDefault()
        this.leftArrow.over()
        // Actions.mainArrowOver(Constants.LEFT)
    }
    mouseOverRight(e) {
        e.preventDefault()
        this.rightArrow.over()
        // Actions.mainArrowOver(Constants.RIGHT)
    }
    mouseOutLeft(e) {
        e.preventDefault()
        this.leftArrow.out()
        // Actions.mainArrowOut(Constants.LEFT)
    }
    mouseOutRight(e) {
        e.preventDefault()
        this.rightArrow.out()
        // Actions.mainArrowOut(Constants.RIGHT)
    }
    resize() {
        const windowW = Store.Window.w
        const windowH = Store.Window.h

        if (!this.domIsReady) return
        this.leftArrow.resize()
        this.rightArrow.resize()

        this.leftArrow.el.style.width = (Constants.PADDING_AROUND * 2) + 'px'
        this.leftArrow.el.style.height = windowH + 'px'
        this.leftArrow.el.style.left = 0 + 'px'
        this.leftArrow.iconHolder.style.left = Constants.PADDING_AROUND - (this.leftArrow.size[1] >> 1) + 'px'
        this.leftArrow.iconHolder.style.top = (windowH >> 1) - (this.leftArrow.size[1] >> 1) + 'px'

        this.rightArrow.el.style.width = (Constants.PADDING_AROUND * 2) + 'px'
        this.rightArrow.el.style.height = windowH + 'px'
        this.rightArrow.el.style.left = (windowW) - (Constants.PADDING_AROUND * 2) + 'px'
        this.rightArrow.iconHolder.style.left = Constants.PADDING_AROUND - (this.rightArrow.size[1] >> 1) + 'px'
        this.rightArrow.iconHolder.style.top = (windowH >> 1) - (this.rightArrow.size[1] >> 1) + 'px'

        this.tl.clear()

        const padding = Constants.PADDING_AROUND * 2
        this.tl.fromTo(this.leftArrow.el, 1, { x:-padding, force3D: true }, { x:0, force3D: true, ease: Expo.easeInOut }, 0)
        this.tl.fromTo(this.rightArrow.el, 1, { x:padding, force3D: true }, { x:0, force3D: true, ease: Expo.easeInOut }, 0)
        if (this.isOpen) this.tl.pause(this.tl.totalDuration())
        else this.tl.pause(0)
    }
}

export default ArrowsContainer
