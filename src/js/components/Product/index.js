import Page from '../Page'
import Store from '../../store'
import dom from 'dom-hand'
import Utils from '../../utils'
import Constants from '../../constants'
import diptyquePart from './diptyque-part'
import MainTextbtn from '../../components/MainTextBtn'

export default class Product extends Page {
    constructor(props) {
        const globalContent = Store.globalContent()
        const colors = Store.getGroupColors()
        props.data['background-src'] = Store.getImgSrcById('background')
        props.data.mediaBasePath = Store.baseMediaPath
        props.data.groupTitle = globalContent['shop_title'] + ' ' + Store.getCurrentGroup()
        props.data.group = Store.getCurrentGroup()
        props.data.colors = colors
        super(props)
    }
    componentDidMount() {
        this.pageWrapper = dom.select('.page-wrapper', this.element)
        
        this.textOver = this.textOver.bind(this)
        this.textOut = this.textOut.bind(this)
        this.textClick = this.textClick.bind(this)

        const element = dom.select('canvas', this.element)
        const params = {
            element: element,
            width: Constants.MEDIA_GLOBAL_W,
            height: Constants.MEDIA_GLOBAL_H
        }
        this.stage = Utils.setupCanvas(params)
        this.stage.enableMouseOver(10);

        this.background = new createjs.Bitmap(Store.getImgById('background'))
        this.background.regX = (Constants.MEDIA_GLOBAL_W  / 2)
        this.background.regY = (Constants.MEDIA_GLOBAL_H  / 2)
        this.stage.addChild(this.background)

        this.leftPart = diptyquePart(Store.getImgById('shoe'), this.stage)
        this.rightPart = diptyquePart(Store.getImgById('face'), this.stage)

        this.leftPart.container.mouseEnabled = true
        this.leftPart.container.mouseChildren = false
        this.leftPart.container.on('click', this.textClick)
        this.leftPart.container.on('mouseover', this.textOver)
        this.leftPart.container.on('mouseout', this.textOut)

        const textBtnEl = dom.select('.shop-text-container', this.element)
        this.mainTextBtn = MainTextbtn(textBtnEl)
        dom.event.on(this.mainTextBtn.el, 'click', this.textClick)
        dom.event.on(this.mainTextBtn.el, 'mouseenter', this.textOver)
        dom.event.on(this.mainTextBtn.el, 'mouseleave', this.textOut)

        this.mainArrowOver = this.mainArrowOver.bind(this)
        this.mainArrowOut = this.mainArrowOut.bind(this)
        Store.on(Constants.MAIN_ARROW_OVER, this.mainArrowOver)
        Store.on(Constants.MAIN_ARROW_OUT, this.mainArrowOut)

        super.componentDidMount()
    }
    setupAnimations() {
        const windowW = Store.Window.w
        this.tlIn.from(this.background, 1, { alpha:0, ease:Expo.easeOut }, 0)
        this.tlIn.from(this.leftPart.img, 1, { x:-(windowW >> 1), alpha:0, scaleX:3, ease:Expo.easeOut }, 0.3)
        this.tlIn.from(this.rightPart.img, 1, { x:(windowW >> 1), alpha:0, scaleX:3, ease:Expo.easeOut }, 0.3)

        super.setupAnimations()
    }
    textOver(e) {
        e.preventDefault()
        this.mainTextBtn.over()
        Store.Parent.style.cursor = 'pointer'
    }
    textOut(e) {
        e.preventDefault()
        this.mainTextBtn.out()
        Store.Parent.style.cursor = 'auto'
    }
    textClick(e) {
        e.preventDefault()
        const content = Store.pageContent()

        if (dataLayer !== undefined) {
            const group = Store.getCurrentGroup()
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_desktop',
                'eventAct': 'pulsar-product_shop',
                'eventLbl': group
            })
        }

        window.open(content.shop_url, '_blank')
    }
    mainArrowOver(dir) {
        switch (dir) {
            case Constants.LEFT:
                dom.classes.add(this.pageWrapper, 'active-left')
            break
            case Constants.RIGHT:
                dom.classes.add(this.pageWrapper, 'active-right')
            break
        }
    }
    mainArrowOut() {
        if (this.pageWrapper === undefined) return
        dom.classes.remove(this.pageWrapper, 'active-left')
        dom.classes.remove(this.pageWrapper, 'active-right')
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
        this.background.x = (windowW >> 1)
        this.background.y = (windowH >> 1)
        this.background.scaleX = this.background.scaleY = backgroundResizeVars.scale

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

        this.mainTextBtn.el.style.left = (windowW >> 1) - (this.mainTextBtn.width >> 1) + 'px'
        this.mainTextBtn.el.style.top = windowH - this.mainTextBtn.height - (windowH * 0.05) + 'px'

        super.resize()
    }
    update() {
        if (this.stage === undefined) return
        this.stage.update()
        this.leftPart.update(1)
        this.rightPart.update(-1)
    }
    componentWillUnmount() {
        this.leftPart.container.off('click', this.textClick)
        this.leftPart.container.off('mouseover', this.textOver)
        this.leftPart.container.off('mouseout', this.textOut)
        dom.event.off(this.mainTextBtn.el, 'click', this.textClick)
        dom.event.off(this.mainTextBtn.el, 'mouseenter', this.textOver)
        dom.event.off(this.mainTextBtn.el, 'mouseleave', this.textOut)
        Store.off(Constants.MAIN_ARROW_OVER, this.mainArrowOver)
        Store.off(Constants.MAIN_ARROW_OUT, this.mainArrowOut)
        this.leftPart.clear()
        this.rightPart.clear()
        this.stage.clear()
        this.mainTextBtn.clear()
        this.stage = null
        this.leftPart = null
        this.rightPart = null
        this.mainTextBtn = null
        super.componentWillUnmount()
    }
}

