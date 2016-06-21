import Actions from '../actions'
import dom from 'dom-hand'

export function resize() {
	Actions.windowResize(window.innerWidth, window.innerHeight)	
}

export function initGlobalEvents() {
	dom.event.on(window, 'resize', resize)
}
