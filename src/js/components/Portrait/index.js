import Page from '../Page'
import Store from '../../store'
import Utils from '../../utils'
import Constants from '../../constants'
import Router from '../../services/router'
import miniVideo from 'mini-video'
import dom from 'dom-hand'
import MainTextbtn from '../../components/MainTextBtn'

export default class Portrait extends Page {
    constructor(props) {
        const content = Store.globalContent()
        const colors = Store.getGroupColors()
        props.data.mediaBasePath = Store.baseMediaPath
        props.data.groupTitle = (Store.lang() === 'de') ? Store.getCurrentGroup() + ' ' + content.discover  : content.discover + ' ' + Store.getCurrentGroup()
        props.data.group = Store.getCurrentGroup()
        props.data.colors = colors
        super(props)
        this.startMorphing = this.startMorphing.bind(this)
        this.loadMorphing = this.loadMorphing.bind(this)
        this.didEndedMorphing = this.didEndedMorphing.bind(this)
        this.titleCanvasEnter = this.titleCanvasEnter.bind(this)
        this.titleCanvasLeave = this.titleCanvasLeave.bind(this)
        this.mainArrowOver = this.mainArrowOver.bind(this)
        this.mainArrowOut = this.mainArrowOut.bind(this)
        Store.on(Constants.START_MORPHING, this.startMorphing)
        Store.on(Constants.LOAD_MORPHING, this.loadMorphing)
        Store.on(Constants.TITLE_CANVAS_ENTER, this.titleCanvasEnter)
        Store.on(Constants.TITLE_CANVAS_LEAVE, this.titleCanvasLeave)
        Store.on(Constants.MAIN_ARROW_OVER, this.mainArrowOver)
        Store.on(Constants.MAIN_ARROW_OUT, this.mainArrowOut)
    }
    componentWillMount() {
        super.componentWillMount()
    }
    componentDidMount() {
        this.pageWrapper = dom.select('.page-wrapper', this.element)

        const bgVideoContainer = dom.select('#background-video-container', this.element)
        const morphingVideoContainer = dom.select('.morphing-video-container', this.element)
        this.baseVideoPath = Store.baseMediaPath() + 'media/group/' + this.props.route.parent + '/' + this.props.route.target + '/portrait/'

        this.morphingVideo = miniVideo({ autoplay: false, loop: false })
        this.morphingVideo.addTo(morphingVideoContainer)
        this.morphingVideo.on('ended', this.didEndedMorphing)

        const textBtnEl = dom.select('.discover-text-container', this.element)
        this.mainTextBtn = MainTextbtn(textBtnEl)

        this.bgVideo = miniVideo({ autoplay: false, loop: true })
        this.bgVideo.addTo(bgVideoContainer)
        this.bgVideo.load(this.baseVideoPath + 'loop.mp4', () => {
            this.bgVideo.play()
            // wait to load the video before all be ready !!
            super.componentDidMount()
        })
    }
    titleCanvasEnter() {
        if (this.mainTextBtn !== undefined) this.mainTextBtn.over()
    }
    titleCanvasLeave() {
        if (this.mainTextBtn !== undefined) this.mainTextBtn.out()
    }
    setupAnimations() {
        this.tlOut.to(this.morphingVideo.parent, 1, { opacity:0, scaleX:3, force3D:true, ease:Expo.easeOut }, 0)
        super.setupAnimations()
    }
    didTransitionInComplete() {
        dom.classes.add(this.bgVideo.parent, 'show')
        super.didTransitionInComplete()
    }
    willTransitionIn() {
        TweenMax.set(this.mainTextBtn.el, { opacity: 1 })
        super.willTransitionIn()
    }
    willTransitionOut() {
        super.willTransitionOut()
    }
    didEndedMorphing() {
        Router.setRoute(Store.AfterMorphingRoute)
    }
    startMorphing() {
        this.removeEventListeners()
        this.mainTextBtn.hide()
        dom.classes.add(this.morphingVideo.parent, 'open')
        if (this.morphingVideo.isLoaded) this.morphingVideo.play()
        else this.morphingVideo.load(this.baseVideoPath + 'morphing.mp4', () => { this.morphingVideo.play() })
    }
    loadMorphing() {
        if (this.morphingVideo.isLoaded) return
        this.morphingVideo.load(this.baseVideoPath + 'morphing.mp4', () => {})
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
    removeEventListeners() {
        Store.off(Constants.START_MORPHING, this.startMorphing)
        Store.off(Constants.LOAD_MORPHING, this.loadMorphing)
        Store.off(Constants.TITLE_CANVAS_ENTER, this.titleCanvasEnter)
        Store.off(Constants.TITLE_CANVAS_LEAVE, this.titleCanvasLeave)
        Store.off(Constants.MAIN_ARROW_OVER, this.mainArrowOver)
        Store.off(Constants.MAIN_ARROW_OUT, this.mainArrowOut)
    }
    resize() {
        const windowW = Store.Window.w
        const windowH = Store.Window.h
        const resizeVars = Utils.resizePositionProportionally(windowW, windowH, Constants.MEDIA_GLOBAL_W, Constants.MEDIA_GLOBAL_H)

        this.mainTextBtn.el.style.left = (windowW >> 1) - (this.mainTextBtn.width >> 1) + 'px'
        this.mainTextBtn.el.style.top = windowH - this.mainTextBtn.height - (windowH * 0.05) + 'px'

        this.bgVideo.parent.style.width = resizeVars.width + 'px'
        this.bgVideo.parent.style.height = resizeVars.height + 'px'
        this.bgVideo.parent.style.top = resizeVars.top + 'px'
        this.bgVideo.parent.style.left = resizeVars.left + 'px'

        this.morphingVideo.parent.style.width = resizeVars.width + 'px'
        this.morphingVideo.parent.style.height = resizeVars.height + 'px'
        this.morphingVideo.parent.style.top = resizeVars.top + 'px'
        this.morphingVideo.parent.style.left = resizeVars.left + 'px'

        super.resize()
    }
    componentWillUnmount() {
        this.removeEventListeners()
        this.mainTextBtn.clear()
        this.bgVideo.clear()
        this.morphingVideo.clear()
        this.morphingVideo = null
        this.bgVideo = null
        this.mainTextBtn = null
        super.componentWillUnmount()
    }
}

