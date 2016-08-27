import dom from 'dom-hand'
import Store from '../../store'

export default (el)=> {
    let scope
    const background = dom.select('.background', el)
    const linksContainer = dom.select('.links-container', el)
    const menShop = dom.select('.men-shop', linksContainer)
    const womenShop = dom.select('.women-shop', linksContainer)
    const camperLab = dom.select('.camper-lab', linksContainer)
    const allLi = dom.select.all('li a', linksContainer)
    el.style.opacity = 0
    el.style.visibility = 'hidden'

    const resize = () => {
        const windowW = Store.Window.w
        const windowH = Store.Window.h

        const linksSize = dom.size(linksContainer)
        linksContainer.style.left = (windowW >> 1) - (linksSize[0] >> 1) + 'px'
        linksContainer.style.top = (windowH >> 1) - (linksSize[1] >> 1) + 'px'

        background.style.width = windowW + 'px'
        background.style.height = windowH + 'px'
    }

    const openIndex = () => {
        const color = Store.getGroupBackgroundColor()
        el.style.opacity = 1
        el.style.visibility = 'visible'
    }

    const closeIndex = () => {
        el.style.opacity = 0
        el.style.visibility = 'hidden'
    }

    const changeColor = (vars) => {
        background.style.backgroundColor = vars.bgColor
        background.style.color = vars.color
        allLi.forEach((item) => { item.style.color = vars.color })
    }

    const menShopClicked = () => {
        if (dataLayer !== undefined) {
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_mobile',
                'eventAct': 'pulsar-menu_shop_man',
                'eventLbl': Store.CurrentCard.group
            })
        }
    }

    const womenShopClicked = () => {
        if (dataLayer !== undefined) {
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_mobile',
                'eventAct': 'pulsar-menu_shop_woman',
                'eventLbl': Store.CurrentCard.group
            })
        }
    }

    const camperLabClicked = () => {
        if (dataLayer !== undefined) {
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_mobile',
                'eventAct': 'pulsar-menu_camper_lab',
                'eventLbl': Store.CurrentCard.group
            })
        }
    }

    dom.event.on(menShop, 'click', menShopClicked)
    dom.event.on(womenShop, 'click', womenShopClicked)
    dom.event.on(camperLab, 'click', camperLabClicked)

    scope = {
        el,
        changeColor,
        resize,
        openIndex,
        closeIndex
    }
    return scope
}
