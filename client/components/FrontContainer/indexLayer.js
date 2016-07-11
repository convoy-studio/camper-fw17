import dom from 'dom-hand'
import Store from '../../store'

export default (el)=> {
    let scope
    const background = dom.select('.background', el)
    el.style.opacity = 0
    el.style.visibility = 'hidden'

    const resize = () => {
        const windowW = Store.Window.w
        const windowH = Store.Window.h

        background.style.width = windowW + 'px'
        background.style.height = windowH + 'px'
    }

    const openIndex = () => {
        const color = Store.getGroupIndexColor()
        background.style.backgroundColor = color
        el.style.opacity = 1
        el.style.visibility = 'visible'
    }

    const closeIndex = () => {
        el.style.opacity = 0
        el.style.visibility = 'hidden'
    }

    scope = {
        el,
        resize,
        openIndex,
        closeIndex
    }
    return scope
}
