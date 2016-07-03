import Page from '../Page'
import Store from '../../store'
import dom from 'dom-hand'
import Utils from '../../utils'
import Constants from '../../constants'
import diptyquePart from './diptyque-part'

export default class Product extends Page {
    constructor(props) {
        props.data['background-src'] = Store.getImgSrcById('background')
        props.data['shoe-src'] = Store.getImgSrcById('shoe')
        props.data['face-src'] = Store.getImgSrcById('face')
        super(props)
    }
    componentDidMount() {
        this.background = dom.select('.background', this.element)
        this.leftPart = diptyquePart(dom.select('.left-part', this.element))
        this.rightPart = diptyquePart(dom.select('.right-part', this.element))
        super.componentDidMount()
    }
    setupAnimations() {
        super.setupAnimations()
    }
    didTransitionInComplete() {
        super.didTransitionInComplete()
    }
    willTransitionIn() {
        super.willTransitionIn()
    }
    willTransitionOut() {
        super.willTransitionOut()
    }
    resize() {
        const windowW = Store.Window.w
        const windowH = Store.Window.h

        const backgroundResizeVars = Utils.resizePositionProportionally(windowW, windowH, Constants.MEDIA_GLOBAL_W, Constants.MEDIA_GLOBAL_H)
        this.background.style.width = backgroundResizeVars.width + 'px'
        this.background.style.height = backgroundResizeVars.height + 'px'
        this.background.style.left = (windowW >> 1) - (backgroundResizeVars.width >> 1) + 'px'
        this.background.style.top = (windowH >> 1) - (backgroundResizeVars.height >> 1) + 'px'

        const partResizeVars = Utils.resizePositionProportionally(windowW >> 1, windowH, Constants.MEDIA_GLOBAL_W >> 1, Constants.MEDIA_GLOBAL_H)
        this.leftPart.el.style.width = this.rightPart.el.style.width = partResizeVars.width + 'px'
        this.leftPart.el.style.height = this.rightPart.el.style.height = partResizeVars.height + 'px'
        this.rightPart.el.style.left = (windowW >> 1) + partResizeVars.left + 'px'
        this.rightPart.el.style.top = partResizeVars.top + 20 + 'px'
        this.leftPart.el.style.left = partResizeVars.left + 'px'
        this.leftPart.el.style.top = partResizeVars.top + 'px'
        this.rightPart.iposition.x = partResizeVars.left
        this.rightPart.iposition.y = partResizeVars.top
        this.leftPart.iposition.x = partResizeVars.left
        this.leftPart.iposition.y = partResizeVars.top

        super.resize()
    }
    update() {
        if (this.leftPart === undefined || this.rightPart === undefined) return
        this.leftPart.update(1)
        this.rightPart.update(-1)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
}

