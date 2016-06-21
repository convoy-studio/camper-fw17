import Page from '../Page'
import Store from '../../store'
import dom from 'dom-hand'

export default class About extends Page {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
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
		var windowW = Store.Window.w
		var windowH = Store.Window.h

		super.resize()
	}
	componentWillUnmount() {
		super.componentWillUnmount()
	}
}

