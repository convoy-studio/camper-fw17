import Page from '../Page'
import Store from '../../store'
import Utils from '../../utils'
import Constants from '../../constants'
import Router from '../../services/router'
import miniVideo from 'mini-video'
import dom from 'dom-hand'

export default class Portrait extends Page {
    constructor(props) {
        // props.data['test-image'] = Store.baseMediaPath() + 'image/DesertVillage.png'
        super(props)

        this.startMorphing = this.startMorphing.bind(this)
        this.loadMorphing = this.loadMorphing.bind(this)
        this.didEndedMorphing = this.didEndedMorphing.bind(this)
        Store.on(Constants.START_MORPHING, this.startMorphing)
        Store.on(Constants.LOAD_MORPHING, this.loadMorphing)
    }
    componentDidMount() {
        const bgVideoContainer = dom.select('#background-video-container', this.element)
        const morphingVideoContainer = dom.select('.morphing-video-container', this.element)
        this.baseVideoPath = Store.baseMediaPath() + 'media/group/' + this.props.route.parent + '/' + this.props.route.target + '/portrait/'
        
        this.bgVideo = miniVideo({ autoplay: false, loop: true })
        this.bgVideo.addTo(bgVideoContainer)
        this.bgVideo.load(this.baseVideoPath + 'loop.mp4', () => { this.bgVideo.play() })

        this.morphingVideo = miniVideo({ autoplay: false, loop: false })
        this.morphingVideo.addTo(morphingVideoContainer)
        this.morphingVideo.on('ended', this.didEndedMorphing)

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
    didEndedMorphing() {
        Router.setRoute(Store.AfterMorphingRoute)
    }
    startMorphing() {
        dom.classes.add(this.morphingVideo.parent, 'open')
        if (this.morphingVideo.isLoaded) {
            this.morphingVideo.play()
        } else {
            this.morphingVideo.load(this.baseVideoPath + 'morphing.mp4', () => { this.morphingVideo.play() })    
        }
    }
    loadMorphing() {
        if (this.morphingVideo.isLoaded) return
        this.morphingVideo.load(this.baseVideoPath + 'morphing.mp4', () => {})
    }
    resize() {
        const windowW = Store.Window.w
        const windowH = Store.Window.h
        const resizeVars = Utils.resizePositionProportionally(windowW, windowH, Constants.MEDIA_GLOBAL_W, Constants.MEDIA_GLOBAL_H)

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
        Store.off(Constants.START_MORPHING, this.startMorphing)
        Store.off(Constants.LOAD_MORPHING, this.loadMorphing)
        this.bgVideo.clear()
        this.morphingVideo.clear()
        super.componentWillUnmount()
    }
}

