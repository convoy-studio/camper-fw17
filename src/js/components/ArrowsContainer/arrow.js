import dom from 'dom-hand'

export default (el, dir)=> {
    let scope
    let size = [0, 0]
    const svg = dom.select('svg', el)
    const iconHolder = dom.select('.icon-holder', el)
    const background = dom.select('.background', el)
    const textureBackground = dom.select('.texture-background', el)
    const textureInline = dom.select('.inline-texture', textureBackground)

    const changeColor = (color) => {
        svg.setAttribute('fill', color)
    }

    const over = () => {
        dom.classes.add(el, 'active')
    }

    const out = () => {
        dom.classes.remove(el, 'active')
    }

    const updateBgImg = (src) => {
        textureInline.style.backgroundImage = "url('"+ src +"')";
    }

    scope = {
        el,
        size,
        changeColor,
        svg,
        iconHolder,
        background,
        textureBackground,
        updateBgImg,
        over,
        out,
        resize: () => {
            scope.size = dom.size(svg)
        }
    }
    return scope
}
