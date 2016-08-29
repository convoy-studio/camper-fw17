import dom from 'dom-hand'

export default (el, dir)=> {
    let scope
    let size = [0, 0]
    const svg = dom.select('svg', el)
    const iconHolder = dom.select('.icon-holder', el)
    const background = dom.select('.background', el)
    const tl = new TimelineMax()
    tl.from(iconHolder, 1, { x:10*dir, ease:Expo.easeOut })
    tl.pause(0)

    const changeColor = (color) => {
        svg.setAttribute('fill', color)
    }

    const over = () => {
        tl.timeScale(1.4).play(0)
    }

    const out = () => {
        tl.timeScale(3).reverse()
    }

    scope = {
        el,
        size,
        changeColor,
        svg,
        iconHolder,
        background,
        over,
        out,
        resize: () => {
            scope.size = dom.size(svg)
        }
    }
    return scope
}
