import dom from 'dom-hand'

export default (el)=> {
    let scope
    let size = [0, 0]
    const svg = dom.select('svg', el)

    const changeColor = (color) => {
        svg.setAttribute('fill', color)
    }

    scope = {
        el,
        size,
        changeColor,
        resize: () => {
            scope.size = dom.size(svg)
        }
    }
    return scope
}
