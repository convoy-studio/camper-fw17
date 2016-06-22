import Store from './store'
import Actions from './actions'
import Template from './app-template'
import Router from './services/router'
import { initGlobalEvents } from './services/global-events'
import Preloader from './services/preloader'
import Constants from './constants'
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

	// 	var p = document.getElementById('preloader')

		// Init global events
		initGlobalEvents()

		var appTemplate = new Template()
		appTemplate.isReady = this.loadMainAssets
		appTemplate.render('#app-container')

		// Start routing
		this.router.beginRouting()
	}
	loadMainAssets() {
		// var hashUrl = location.hash.substring(2)
		// var parts = hashUrl.substr(1).split('/')
		// var manifest = Store.pageAssetsToLoad()
		// if(manifest.length < 1) this.onAppReady()
		// else Store.Preloader.load(manifest, this.onAppReady)
		this.onAppReady()
	}
	onAppReady() {
		// return
		// this.loaderAnim.tl.timeScale(2.4).tweenTo(this.loaderAnim.tl.totalDuration() - 0.1)
		// setTimeout(()=> {
		// 	TweenMax.to(this.loaderAnim.el, 0.5, { opacity:0, force3D:true, ease:Expo.easeOut })
		// 	setTimeout(()=> {
		// 		Store.off(Constants.WINDOW_RESIZE, this.resize)
		// 		dom.tree.remove(this.loaderAnim.el)
		// 		this.loaderAnim.tl.eventCallback('onUpdate', null)
		// 		this.loaderAnim.tl.clear()
		// 		this.loaderAnim.tl = null
		// 		this.loaderAnim = null
		// 		setTimeout(()=>Actions.appStart())
		// 		setTimeout(()=>Actions.pageHasherChanged())
		// 	}, 200)
		// }, 1500)
		
		setTimeout(()=>Actions.appStart())
		// setTimeout(()=>Actions.pageHasherChanged())
	}
}

export default App
    	
