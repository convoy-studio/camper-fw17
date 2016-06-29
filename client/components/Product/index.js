import Page from '../Page'
import Store from '../../store'
import dom from 'dom-hand'
import Utils from '../../utils'
import Constants from '../../constants'

export default class About extends Page {
    constructor(props) {
        props.data['background-src'] = Store.getImgSrcById('background')
        super(props)
    }
    componentDidMount() {
        this.background = dom.select('.background', this.element)
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

        super.resize()
    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
}

