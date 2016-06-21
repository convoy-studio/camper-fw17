import BasePage from '../../pager/components/BasePage'
import Store from '../../store'
import Constants from '../../constants'
import dom from 'dom-hand'

export default class Page extends BasePage {
	constructor(props) {
		super(props)
		this.transitionInCompleted = false
	}
	componentWillMount() {
		super.componentWillMount()
	}
	componentDidMount() {
		super.componentDidMount()
	}
	willTransitionIn() {
		super.willTransitionIn()
	}
	willTransitionOut() {
		super.willTransitionOut()
	}
	didTransitionInComplete() {
		super.didTransitionInComplete()
	}
	setupAnimations() {
		super.setupAnimations()
	}
	getImageUrlById(id) {
		var url = this.props.hash.type == Constants.HOME ? 'home-' + id : this.props.hash.parent + '-' + this.props.hash.target + '-' + id
		return Store.Preloader.getImageURL(url)
	}
	getImageSizeById(id) {
		var url = this.props.hash.type == Constants.HOME ? 'home-' + id : this.props.hash.parent + '-' + this.props.hash.target + '-' + id
		return Store.Preloader.getImageSize(url)
	}
	resize() {
		super.resize()
	}
	update() {
	}
	componentWillUnmount() {
		super.componentWillUnmount()
	}
}
