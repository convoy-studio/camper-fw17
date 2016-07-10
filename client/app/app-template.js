import BaseComponent from '../pager/components/BaseComponent'
import FrontContainer from '../components/FrontContainer'
import PagesContainer from '../components/PagesContainer'
import CanvasContainer from '../components/CanvasContainer'
import Store from '../store'
import Constants from '../constants'
import { resize as globalResize } from '../services/global-events'
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
        this.animate()
    }
    didStartMorphing() {
        this.frontContainer.didStartMorphing()
        this.canvasContainer.didStartMorphing()
    }
    showInterface() {
        // this.frontContainer.showInterface()
    }
    hideInterface() {
        // this.frontContainer.hideInterface()
    }
    animate() {
        this.raf = raf(this.animate)
        this.pagesContainer.update()
        this.canvasContainer.update()
    }
    resize() {
        this.frontContainer.resize()
        this.pagesContainer.resize()
        this.canvasContainer.resize()
        super.resize()
    }
}

export default AppTemplate

