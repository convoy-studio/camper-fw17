require('../../../sass/app.scss')

import Store from '../../store'
import Actions from '../../actions'
import Utils from '../../utils'
import Template from './template'
import Router from '../../services/router'
import { initGlobalEvents } from '../../services/global-events'
import Preloader from '../../services/preloader'
import dom from 'dom-hand'
import {PagerConstants, PagerStore} from '../../pager/Pager'

class App {
    constructor() {
        this.onAppReady = this.onAppReady.bind(this)
        this.loadMainAssets = this.loadMainAssets.bind(this)
        this.loadMeshes = this.loadMeshes.bind(this)
        this.onInitialPageReady = this.onInitialPageReady.bind(this)
    }
    init() {

        // Init router
        this.router = new Router()
        this.router.init()
        
        // Init Preloader
        Store.Preloader = new Preloader()
        
        
        // Init global events
        initGlobalEvents()

        this.mainLoader = dom.select('#main-loader')
        this.mainLoader.style.opacity = 1
        var $spinner = dom.select('.spinner-wrapper', this.mainLoader)
        var $spinnerSvg = dom.select('svg', $spinner)
        var $logo = dom.select('.logo', this.mainLoader)
        var $background = dom.select('.background', this.mainLoader)
        this.tlIn = new TimelineMax()
        this.tlOut = new TimelineMax()

        this.tlIn.fromTo($spinner, 1, {opacity:0}, { opacity:1, force3D:true, ease:Expo.easeOut }, 0)
        this.tlIn.fromTo($logo, 1, {opacity:0}, { opacity:1, force3D:true, ease:Expo.easeOut }, 0)
        this.tlIn.play(0)

        this.spinnerTween = TweenMax.to($spinnerSvg, 0.5, { rotation:'360deg', repeat:-1, ease:Linear.easeNone })

        this.tlOut.to($spinner, 1, { scale:1.2, y:10, opacity:0, force3D:true, ease:Expo.easeInOut }, 0)
        this.tlOut.to($logo, 1, { scale:1.2, y:-10, opacity:0, force3D:true, ease:Expo.easeInOut }, 0)
        this.tlOut.to($background, 1, { opacity:0, force3D:true, ease:Expo.easeInOut }, 0.6)
        this.tlOut.pause(0)

        const appTemplate = new Template()
        appTemplate.isReady = this.loadMainAssets
        appTemplate.onInitialPageReady =  this.onInitialPageReady
        appTemplate.render('#app-container')
        
        // Start routing
        setTimeout(()=>this.router.beginRouting())
    }
    loadMainAssets() {
        // Collect page manifest and textures manifest and load
        const pageManifest = Store.pageAssetsToLoad()
        const texturesManifest = Store.Detector.isSupportWebGL ? Store.getAllTexturesManifest() : []
        const manifest = pageManifest.concat(texturesManifest)
        Store.Preloader.load(manifest, this.loadMeshes)
    }
    loadMeshes() {

        if (Store.Detector.isSupportWebGL !== true) {
            this.onAppReady()
            return
        }

        let totalLoadedMeshes = 0
        const onMeshLoaded = () => {
            totalLoadedMeshes++
            if (totalLoadedMeshes === 4) this.onAppReady()
        }
        Utils.meshLoader('kings', Store.baseMediaPath() + 'mesh/kings.js', (id, geometry) => { Store.Meshes[id] = geometry; onMeshLoaded(); })
        Utils.meshLoader('armours', Store.baseMediaPath() + 'mesh/armours.js', (id, geometry) => { Store.Meshes[id] = geometry; onMeshLoaded(); })
        Utils.meshLoader('dino', Store.baseMediaPath() + 'mesh/dino.js', (id, geometry) => { Store.Meshes[id] = geometry; onMeshLoaded(); })
        Utils.meshLoader('sport', Store.baseMediaPath() + 'mesh/sport.js', (id, geometry) => { Store.Meshes[id] = geometry; onMeshLoaded(); })
    }
    onInitialPageReady() {
        setTimeout(()=>{
            this.tlOut.timeScale(2).play()
            setTimeout(() => {
                this.tlOut.clear()
                this.tlIn.clear()
                this.spinnerTween.pause()
                this.tlOut = null
                this.tlIn = null
                this.spinnerTween = null
                dom.tree.remove(this.mainLoader)
            }, 1000)
        }, 1000)
    }
    onAppReady() {
        setTimeout(()=>Actions.appStart())
        setTimeout(()=>Actions.routeChanged())
    }
}

export default App
