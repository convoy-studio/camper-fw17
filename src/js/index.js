if (!window.console) window.console = { log: () => {} }

import Store from './store'
import Utils from './utils'
import DesktopApp from './app/desktop'
import MobileApp from './app/mobile'
import MobileDetect from 'mobile-detect'
import dom from 'dom-hand'
import domready from 'domready'
const url = require('url')
const currentURL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname
const md = new MobileDetect(window.navigator.userAgent)

Store.Detector.isSafari = (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1)
Store.Detector.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1
Store.Detector.isMobile = (md.mobile() || md.tablet()) ? true : false
Store.Parent = dom.select('#app-container')
Store.Detector.oldIE = dom.classes.contains(Store.Parent, 'ie6') || dom.classes.contains(Store.Parent, 'ie7') || dom.classes.contains(Store.Parent, 'ie8')
Store.Detector.url = url.parse(currentURL)
Store.Detector.isSupportWebGL = Utils.supportWebGL()
if (Store.Detector.oldIE) Store.Detector.isMobile = true

// const query = href.split('?')[1]
// Store.Detector.url.query = query !== undefined ? '?' + query : ''
// console.log(Store.Detector.url)

// console.log(Store.Detector.isSupportWebGL)
// Store.Detector.isSupportWebGL = false

// // Debug
// Store.Detector.isMobile = true

domready(() => {

	// const href = window.location.href
	// const loc = href.split('?')
	// if (loc[1]) {
	// 	window.location.href = loc[0]
	// }

	let app
	if (Store.Detector.isMobile) {
	    dom.classes.add(dom.select('html'), 'mobile')
	    app = new MobileApp()
	} else {
	    app = new DesktopApp()
	}

	app.init()
	
})

