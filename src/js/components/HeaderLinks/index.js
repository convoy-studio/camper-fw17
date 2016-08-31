import Store from '../../store'
import Actions from '../../actions'
import Constants from '../../constants'
import dom from 'dom-hand'
import MainTextBtn from '../MainTextBtn'

const headerLinks = (parent)=> {
    let scope
    const logo = dom.select('.logo', parent)
    const logoSvg = dom.select('svg', logo)
    const shopWrapper = dom.select('.shop-wrapper', parent)
    const submenuWrapper = dom.select('.submenu-wrapper', parent)
    const shopTitle = dom.select('.shop-title', shopWrapper)
    const indexBtnTimeout = Store.Detector.isSupportWebGL ? 1600 : 500
    let indexBtnIsEnabled = true
    let visibilityTimeout

    const findBtnById = (id) => {
        let btn = undefined
        for (var i = 0; i < simpleBtns.length; i++) {
            const item = simpleBtns[i]
            if (id === item.id) {
                btn = item
                break
            }
        }
        return btn
    }

    const onSubMenuMouseEnter = (e)=> {
        e.preventDefault()
        clearTimeout(visibilityTimeout)
        submenuWrapper.style.visibility = 'visible'
        dom.classes.add(shopWrapper, 'hovered')
    }

    const onSubMenuMouseLeave = (e)=> {
        e.preventDefault()
        clearTimeout(visibilityTimeout)
        dom.classes.remove(shopWrapper, 'hovered')
        visibilityTimeout = setTimeout(() => { submenuWrapper.style.visibility = 'hidden' }, 500)
    }

    const changeColor = (color, group) => {
        simpleBtns.forEach((btn) => { btn.changeColor(color, group) })
        logoSvg.setAttribute('fill', color)
        shopTitle.style.color = color
    }

    const linkMouseEnter = (e) => {
        e.preventDefault()
        const id = e.currentTarget.getAttribute('data-id')
        const btn = findBtnById(id)
        btn.over()
    }

    const linkMouseLeave = (e) => {
        e.preventDefault()
        const id = e.currentTarget.getAttribute('data-id')
        const btn = findBtnById(id)
        btn.out()
    }

    const simpleTextBtnsEl = dom.select.all('.main-text-btn', parent)
    let simpleBtns = []
    simpleTextBtnsEl.forEach((el) => {
        const id = el.getAttribute('data-id')
        const btn = MainTextBtn(el)
        btn.id = id
        dom.event.on(el, 'mouseenter', linkMouseEnter)
        dom.event.on(el, 'mouseleave', linkMouseLeave)
        simpleBtns.push(btn)
    })
    shopWrapper.addEventListener('mouseenter', onSubMenuMouseEnter)
    shopWrapper.addEventListener('mouseleave', onSubMenuMouseLeave)

    dom.event.on(simpleBtns[1].el, 'click', () => {
        if (dataLayer !== undefined) {
            const group = Store.getCurrentGroup()
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_desktop',
                'eventAct': 'pulsar-camper_lab',
                'eventLbl': group
            })
        }
    })

    dom.event.on(logo, 'click', () => {
        if (dataLayer !== undefined) {
            const group = Store.getCurrentGroup()
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_desktop',
                'eventAct': 'pulsar-logo_camper',
                'eventLbl': group
            })
        }
    })

    dom.event.on(simpleTextBtnsEl[0], 'click', (e) => {
        e.preventDefault()
        if (!indexBtnIsEnabled) return
        indexBtnIsEnabled = false
        setTimeout(() => { indexBtnIsEnabled = true }, indexBtnTimeout)
        if (Store.IndexIsOpened) Actions.closeIndex()
        else Actions.openIndex()
    })

    scope = {
        changeColor,
        resize: ()=> {
            const windowW = Store.Window.w
            const padding = Constants.PADDING_AROUND / 3

            const camperLab = simpleBtns[1]
            const shop = simpleBtns[2]
            const map = simpleBtns[0]
            const shopWomen = simpleBtns[3]
            const shopSize = dom.size(shopWrapper)
            const shopTitleSize = dom.size(shopTitle)

            const camperLabCss = {
                left: windowW - (Constants.PADDING_AROUND * 0.6) - padding - camperLab.width,
                top: Constants.PADDING_AROUND
            }
            const shopCss = {
                left: camperLabCss.left - shopTitleSize[0] - padding - 20,
                top: Constants.PADDING_AROUND
            }
            const mapCss = {
                left: shopCss.left - map.width - padding - 30,
                top: Constants.PADDING_AROUND
            }

            const subW = (simpleBtns[2].width > simpleBtns[3].width) ? simpleBtns[2].width : simpleBtns[3].width
            const subH = simpleBtns[2].height * 2
            submenuWrapper.style.width = subW + 'px'
            submenuWrapper.style.height = subH + 'px'

            // shop.el.style.left = (shopSize[0] >> 1) - (shop.width >> 1) + 'px'
            camperLab.el.style.left = camperLabCss.left + 'px'
            camperLab.el.style.top = camperLabCss.top + 'px'
            shopWrapper.style.left = shopCss.left + 'px'
            shopWrapper.style.top = shopCss.top + 'px'
            map.el.style.left = mapCss.left + 'px'
            map.el.style.top = mapCss.top + 'px'
            shopWomen.el.style.top = shopWomen.height + 'px'
        }
    }

    return scope
}

export default headerLinks
