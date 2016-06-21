// Avoid console errors for the IE crappy browsers
if ( ! window.console ) console = { log: function(){} };

import Store from './store'
import Utils from './utils'
import App from './app'
// import AppMobile from 'AppMobile'
import TweenMax from 'gsap'
import raf from 'raf'
import MobileDetect from 'mobile-detect'
import dom from 'dom-hand'

var md = new MobileDetect(window.navigator.userAgent)

Store.Detector.isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)
Store.Detector.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') != -1
Store.Detector.isMobile = (md.mobile() || md.tablet()) ? true : false
Store.Parent = dom.select('#app-container')
Store.Detector.oldIE = dom.classes.contains(Store.Parent, 'ie6') || dom.classes.contains(Store.Parent, 'ie7') || dom.classes.contains(Store.Parent, 'ie8')
Store.Detector.isSupportWebGL = Utils.SupportWebGL()
if(Store.Detector.oldIE) Store.Detector.isMobile = true

// // Debug
// // Store.Detector.isMobile = true

var app;
// if(Store.Detector.isMobile) {
// 	dom.classes.add(dom.select('html'), 'mobile')
// 	app = new AppMobile()
// }else{
app = new App()	
// } 

app.init()

