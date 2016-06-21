import BaseComponent from '../../pager/components/BaseComponent'
import template from './template.hbs'
import Store from '../../store'
import Constants from '../../constants'
import headerLinks from '../HeaderLinks'
import socialLinks from '../SocialLinks'
import Router from '../../services/router'
import dom from 'dom-hand'

class FrontContainer extends BaseComponent {
	constructor() {
		super()
		this.onAppStarted = this.onAppStarted.bind(this)
	}
	render(parent) {
		var scope = {}
		var generaInfos = Store.generalInfos()
		scope.infos = Store.globalContent()
		scope.general = generaInfos
		super.render('FrontContainer', parent, template, scope)
	}
	componentWillMount() {
		super.componentWillMount()
	}
	componentDidMount() {
		this.headerEl = dom.select('header', this.element)
		Store.on(Constants.APP_START, this.onAppStarted)
		this.headerLinks = headerLinks(this.element)
		super.componentDidMount()
	}
	onAppStarted() {
		Store.off(Constants.APP_START, this.onAppStarted)
		dom.classes.add(this.headerEl, 'show')
	}
	resize() {
		if(!this.domIsReady) return
		this.headerLinks.resize()

	}
}

export default FrontContainer


