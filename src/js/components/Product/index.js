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

        const element = dom.select('canvas', this.element)
        const params = {
            element: element,
            width: Constants.MEDIA_GLOBAL_W,
            height: Constants.MEDIA_GLOBAL_H
        }
        this.stage = Utils.setupCanvas(params)
        this.leftPart = diptyquePart(Store.getImgSrcById('shoe'), this.stage)
        this.rightPart = diptyquePart(Store.getImgSrcById('face'), this.stage)

        super.componentDidMount()
    }
    setupAnimations() {
        const windowW = Store.Window.w
        this.tlIn.from(this.background, 1, { opacity:0, ease:Expo.easeOut }, 0)
        this.tlIn.from(this.leftPart.img, 1, { x:-(windowW >> 1), alpha:0, scaleX:3, ease:Expo.easeOut }, 0.3)
        this.tlIn.from(this.rightPart.img, 1, { x:(windowW >> 1), alpha:0, scaleX:3, ease:Expo.easeOut }, 0.3)

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

        const canvas = this.stage.canvas
        canvas.width = windowW
        canvas.height = windowH
        const partResizeVars = Utils.resizePositionProportionally(windowW >> 1, windowH, Constants.MEDIA_GLOBAL_W >> 1, Constants.MEDIA_GLOBAL_H)
        this.leftPart.container.scaleX = this.leftPart.container.scaleY = partResizeVars.scale
        this.rightPart.container.scaleX = this.rightPart.container.scaleY = partResizeVars.scale

        const halfW = windowW / 2
        const halfH = windowH / 2
        const rightX = halfW + (halfW / 2)
        const rightY = halfH
        const leftX = halfW / 2
        const leftY = halfH

        this.rightPart.iposition.x = rightX
        this.rightPart.iposition.y = rightY
        this.leftPart.iposition.x = leftX
        this.leftPart.iposition.y = leftY
        this.rightPart.position.x = rightX
        this.rightPart.position.y = rightY
        this.leftPart.position.x = leftX
        this.leftPart.position.y = leftY

        super.resize()
    }
    update() {
        if (this.stage === undefined) return
        this.stage.update()
        this.leftPart.update(1)
        this.rightPart.update(-1)
    }
    componentWillUnmount() {
        this.leftPart.clear()
        this.rightPart.clear()
        this.stage.clear()
        this.stage = null
        this.leftPart = null
        this.rightPart = null
        super.componentWillUnmount()
    }
}

