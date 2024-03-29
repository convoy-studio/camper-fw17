require('../../../sass/app.scss')

import Store from '../../store'
import Actions from '../../actions'
import Template from './template'
import Router from '../../services/router'
import { initGlobalEvents } from '../../services/global-events'
import Preloader from '../../services/preloader'
import dom from 'dom-hand'

class App {
    constructor() {
        this.onAppReady = this.onAppReady.bind(this)
        this.loadMainAssets = this.loadMainAssets.bind(this)
    }
    init() {
        // Init router
        this.router = new Router()
        this.router.init()
        // Init Preloader
        Store.Preloader = new Preloader()
        // Init global events
        initGlobalEvents()
        this.appTemplate = new Template()
        this.appTemplate.isReady = this.loadMainAssets
        this.appTemplate.render('#app-container')

        const mainLoader = dom.select('#main-loader')
        dom.tree.remove(mainLoader)

        // Start routing
        setTimeout(()=>this.router.beginRouting())
    }
    loadMainAssets() {
        this.onAppReady()
    }
    onAppReady() {
        setTimeout(()=>Actions.appStart())
        setTimeout(()=>Actions.routeChanged())
        setTimeout(()=>this.appTemplate.renderTinder())
    }
}

export default App
