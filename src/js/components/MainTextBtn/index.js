import dom from 'dom-hand'
import Constants from '../../constants'
import Utils from '../../utils'

export default (el)=> {
    let scope
    const lineH = 2
    const txtFront = dom.select('.text-front', el)
    const txtBack = dom.select('.text-back', el)
    const bgFront = dom.select('.background-front', el)
    const line = dom.select('.line', el)
    const size = dom.size(txtFront)
    const colorA = el.getAttribute('data-color-a')
    const colorB = el.getAttribute('data-color-b')
    const padding = Constants.PADDING_AROUND * 0
    let tl = new TimelineMax()
    let txtFrontSplt = new SplitText(txtFront, { type: 'chars' }).chars
    let txtBackSplt = new SplitText(txtBack, { type: 'chars' }).chars
    
    txtFront.style.color = colorB
    txtBack.style.color = colorB
    line.style.backgroundColor = colorB
    line.style.height = lineH + 'px'
    line.style.top = ((size[1] + padding) / 2) - (lineH / 2) + 'px'
    el.style.width = size[0] + padding + 'px'
    el.style.height = size[1] + padding + 'px'
    bgFront.style.width = size[0] + padding + 'px'
    bgFront.style.height = size[1] + padding + 'px'
    bgFront.style.left = - padding / 2 + 'px'
    bgFront.style.top = - padding / 2 + 'px'

    TweenMax.set(bgFront, { clip: Utils.rect(0, 0, size[1], 0) })
    TweenMax.set(line, { scaleX:0, transformOrigin: '0% 50%' })
    tl.staggerTo(txtBackSplt, 1, { y:40, scale:0, ease:Expo.easeInOut }, 0.02, 0)
    tl.staggerFrom(txtFrontSplt, 1, { y:-40, scale:0, ease:Expo.easeInOut }, 0.02, 0.3)
    tl.to(bgFront, 1, { clip: Utils.rect(0, size[0], size[1], 0), ease:Expo.easeInOut, overwrite:'none' }, 0)
    tl.to(bgFront, 1, { clip: Utils.rect(0, size[0], size[1], size[0] + 10), ease:Expo.easeOut, overwrite:'none' }, 0.6)
    tl.to(line, 1, { scaleX:1, transformOrigin: '0% 50%', ease:Expo.easeOut, force3D: true, overwrite:'none' }, 1.0)
    tl.addLabel('over')
    tl.to(line, 1, { scaleX:0, transformOrigin: '100% 50%', ease:Expo.easeInOut, force3D: true, overwrite:'none' }, 'over')
    tl.addLabel('out')
    tl.staggerTo(txtFrontSplt, 1, { y:40, scale:0, ease:Expo.easeInOut }, 0.02, 'out')
    tl.addLabel('hide')
    tl.pause(0)

    const over = () => {
    	tl.timeScale(1.6).tweenFromTo(0, 'over')
    }

    const out = () => {
    	tl.timeScale(2).tweenTo('out')
    }

    const hide = () => {
    	tl.timeScale(3).tweenTo('hide')
    }

    const clear = () => {
    	tl.clear()
    	tl = null
    	txtFrontSplt.length = 0
    	txtFrontSplt = null
    	txtBackSplt.length = 0
    	txtBackSplt = null
    }

    scope = {
    	el,
    	over,
    	out,
    	hide,
    	clear,
    	width: size[0],
    	height: size[1]
    }
    return scope
}
