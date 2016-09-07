import Store from '../../store'
import Actions from '../../actions'
import Constants from '../../constants'
import dom from 'dom-hand'

export default (el)=> {
    let scope
    const btns = dom.select.all('li', el)
    const content = Store.globalContent()
    let currentName = undefined
    let currentVars = undefined

    // left arrow
    dom.event.on(btns[0], 'click', (e) => {
        e.preventDefault()

        if (dataLayer !== undefined) {
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_mobile',
                'eventAct': 'pulsar-swipe_izq',
                'eventLbl': Store.CurrentCard.group
            })
        }

        Actions.previousPerson()
    })
    // show shoe
    dom.event.on(btns[1], 'click', (e) => {
        e.preventDefault()
        if (dataLayer !== undefined) {
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_mobile',
                'eventAct': 'pulsar-see_' + Store.CurrentCard.name,
                'eventLbl': Store.CurrentCard.group
            })
        }
        Actions.showPersonInfo(currentName)
    })
    // show video
    dom.event.on(btns[2], 'click', (e) => {
        e.preventDefault()

        if (dataLayer !== undefined) {
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_mobile',
                'eventAct': 'pulsar-play_video_' + Store.CurrentCard.name,
                'eventLbl': Store.CurrentCard.group
            })
        }

        Actions.showPersonVideo()
    })
    // right arrow
    dom.event.on(btns[3], 'click', (e) => {
        e.preventDefault()

        if (dataLayer !== undefined) {
            dataLayer.push({
                'event': 'eventGA',
                'eventCat': 'camp- FW17_mobile',
                'eventAct': 'pulsar-swipe_der',
                'eventLbl': Store.CurrentCard.group
            })
        }

        Actions.nextPerson()
    })

    const changeColor = (vars) => {
        btns.forEach((btn) => {
            const circle = dom.select('svg circle', btn)
            const arrow = dom.select('svg path', btn)
            if (circle) { circle.style.stroke = vars.color }
            if (arrow) { arrow.style.fill = vars.color }
            btn.style.color = vars.color
        })
        currentName = vars.portraitName
        currentVars = vars
        const p = dom.select('.text-field-container p', btns[1])
        dom.classes.remove(p, 'to_shop')
        p.innerHTML = vars.name.replace('-', ' ') + ' ' + content.discover
    }
    
    const resize = () => {
        const windowW = Store.Window.w
        const windowH = Store.Window.h
        const elSize = dom.size(el)

        el.style.left = (windowW >> 1) - (elSize[0] >> 1) + 'px'
        el.style.top = (windowH) - (elSize[1]) - (Constants.PADDING_AROUND >> 1) + 'px'
    }

    const showPersonInfo = () => {
        const p = dom.select('.text-field-container p', btns[1])
        if (dom.classes.has(p, 'to_shop')) {
            const path = '/' + Store.CurrentCard.group + '/' + Store.CurrentCard.name
            const url = Store.getPageContentById(path).shop_url
            if (dataLayer !== undefined) {
                dataLayer.push({
                    'event': 'eventGA',
                    'eventCat': 'camp- FW17_mobile',
                    'eventAct': 'pulsar-product_shop',
                    'eventLbl': Store.CurrentCard.group
                })
            }
            window.open(url, '_blank')
        } else {
            dom.classes.add(p, 'to_shop')
            p.innerHTML = content.shop_title + ' ' + currentVars.name.replace('-', ' ')
        }

    }

    Store.on(Constants.SHOW_PERSON_INFO, showPersonInfo)

    scope = {
        el,
        changeColor,
        resize
    }
    return scope
}
