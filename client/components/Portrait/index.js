import Page from '../Page'
import Store from '../../store'
import Utils from '../../utils'
import Constants from '../../constants'
import miniVideo from 'mini-video'
import dom from 'dom-hand'

export default class Home extends Page {
    constructor(props) {
        // props.data['test-image'] = Store.baseMediaPath() + 'image/DesertVillage.png'
        super(props)

        console.log(miniVideo)
    }
    componentDidMount() {
        const bgVideoContainer = dom.select('#background-video-container', this.element)
        this.bgVideo = miniVideo({
            autoplay: false,
            loop: true
        })
        this.bgVideo.addTo(bgVideoContainer)
        this.bgVideo.load(Store.baseMediaPath() + 'image/portrait-loop.mp4', () => {
            this.bgVideo.play()
        })
        console.log(this.bgVideo)
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

        const resizeVars = Utils.resizePositionProportionally(windowW, windowH, Constants.MEDIA_GLOBAL_W, Constants.MEDIA_GLOBAL_H)
        console.log(this.bgVideo.el, this.bgVideo.parent)
        this.bgVideo.parent.style.width = resizeVars.width + 'px'
        this.bgVideo.parent.style.height = resizeVars.height + 'px'
        this.bgVideo.parent.style.top = resizeVars.top + 'px'
        this.bgVideo.parent.style.left = resizeVars.left + 'px'

        super.resize()
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
}

