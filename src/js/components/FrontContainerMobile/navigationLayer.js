import Store from '../../store'
import Actions from '../../actions'
import Constants from '../../constants'
import dom from 'dom-hand'

export default (el)=> {
    let scope
    const btns = dom.select.all('li', el)

    // left arrow
    dom.event.on(btns[0], 'click', (e) => {
    	e.preventDefault()
    	Actions.previousPerson()
    })
    // show shoe
    dom.event.on(btns[1], 'click', (e) => {
    	e.preventDefault()
    	Actions.showPersonInfo()
    })
    // show video
    dom.event.on(btns[2], 'click', (e) => {
    	e.preventDefault()
    	Actions.showPersonVideo()
    })
    // right arrow
    dom.event.on(btns[3], 'click', (e) => {
    	e.preventDefault()
    	Actions.nextPerson()
    })

    const changeColor = (color) => {
        btns.forEach((btn) => {
            const circle = dom.select('svg circle', btn)
            const arrow = dom.select('svg path', btn)
            if (circle) { circle.style.stroke = color }
            if (arrow) { arrow.style.fill = color }
            btn.style.color = color
        })
    }
    
    const resize = () => {
    	const windowW = Store.Window.w
    	const windowH = Store.Window.h
    	const elSize = dom.size(el)

    	el.style.left = (windowW >> 1) - (elSize[0] >> 1) + 'px'
    	el.style.top = (windowH) - (elSize[1]) - (Constants.PADDING_AROUND >> 1) + 'px'
    }

    scope = {
    	el,
        changeColor,
    	resize
    }
    return scope
}
