import Store from '../../store'
import Constants from '../../constants'
import dom from 'dom-hand'

var socialLinks = (parent)=> {

	var scope;
	var wrapper = dom.select("#footer #social-wrapper", parent)

	scope = {
		resize: ()=> {
			var windowW = Store.Window.w
			var windowH = Store.Window.h
			var padding = Constants.PADDING_AROUND * 0.4

			var wrapperSize = dom.size(wrapper)

			var socialCss = {
				left: windowW - padding - wrapperSize[0],
				top: windowH - padding - wrapperSize[1],
			}

			wrapper.style.left = socialCss.left + 'px'
			wrapper.style.top = socialCss.top + 'px'
		},
		show: ()=> {
			setTimeout(()=>dom.classes.remove(wrapper, 'hide'), 1000)
		},
		hide: ()=> {
			setTimeout(()=>dom.classes.add(wrapper, 'hide'), 500)
		}
	}

	return scope
}

export default socialLinks