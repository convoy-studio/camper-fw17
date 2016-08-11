import BaseComponent from '../../pager/components/BaseComponent'
import FrontContainer from '../../components/FrontContainer'
import PagesContainer from '../../components/PagesContainer'
import CanvasContainer from '../../components/CanvasContainer'
import PortraitTransitionContainer from '../../components/PortraitTransitionContainer'
import Store from '../../store'
import Constants from '../../constants'
import { resize as globalResize } from '../../services/global-events'
import raf from 'raf'

class AppTemplate extends BaseComponent {
    constructor() {
        super()
        this.resize = this.resize.bind(this)
        this.animate = this.animate.bind(this)
        this.didStartMorphing = this.didStartMorphing.bind(this)
        this.showInterface = this.showInterface.bind(this)
        this.hideInterface = this.hideInterface.bind(this)
    }
    render(parent) {
        super.render('AppTemplate', parent, undefined)
    }
    componentWillMount() {
        super.componentWillMount()
    }
    componentDidMount() {
        this.portraitTransitionContainer = new PortraitTransitionContainer()
        this.portraitTransitionContainer.render('#app-template')

        this.frontContainer = new FrontContainer()
        this.frontContainer.render('#app-template')

        this.pagesContainer = new PagesContainer()
        this.pagesContainer.render('#app-template')

        this.canvasContainer = new CanvasContainer()
        this.canvasContainer.render('#app-template')

        setTimeout(()=>{
            this.isReady()
            this.onReady()
        }, 0)

        globalResize()

        super.componentDidMount()
    }
    onReady() {
        Store.FrontBlock = document.getElementById('front-block')
        Store.on(Constants.WINDOW_RESIZE, this.resize)
        Store.on(Constants.START_MORPHING, this.didStartMorphing)
        Store.on(Constants.SHOW_INTERFACE, this.showInterface)
        Store.on(Constants.HIDE_INTERFACE, this.hideInterface)

        this.stats = new Stats()
        this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( this.stats.dom )

        this.animate()
    }
    didStartMorphing() {
        this.frontContainer.didStartMorphing()
        this.canvasContainer.didStartMorphing()
    }
    showInterface() {
        this.frontContainer.showInterface()
    }
    hideInterface() {
        this.frontContainer.hideInterface()
    }
    animate() {
        this.stats.update()
        this.pagesContainer.update()
        this.canvasContainer.update()
        this.portraitTransitionContainer.update()
        this.raf = raf(this.animate)
    }
    resize() {
        this.frontContainer.resize()
        this.pagesContainer.resize()
        this.canvasContainer.resize()
        this.portraitTransitionContainer.resize()
        super.resize()
    }
}

export default AppTemplate

