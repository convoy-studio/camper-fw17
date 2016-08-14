import BaseComponent from '../../pager/components/BaseComponent'
import template from './template.hbs'
import Store from '../../store'
import Constants from '../../constants'
import Router from '../../services/router'
import Utils from '../../utils'
import Actions from '../../actions'
import raf from 'raf'
import dom from 'dom-hand'
const Swing = require('swing')

const Card = {
    DIRECTION_LEFT: 'left',
    DIRECTION_RIGHT: 'right'
}

class TinderContainer extends BaseComponent {
    constructor() {
        super()
        this.onDragMove = this.onDragMove.bind(this)
        this.onThrowout = this.onThrowout.bind(this)
        this.onDragStart = this.onDragStart.bind(this)
        this.onThrowin = this.onThrowin.bind(this)
        this.maxDistance = 0
        this.throwOutFinished = true
    }
    render(parent) {
        let scope = {}
        let portraits = []
        const routes = Router.getPortraitRoutes()
        const baseMediaPath = Store.baseMediaPath() + 'media/group'
        routes.forEach((route) => {
            const group = Store.getGroupById(route.parent)
            const colors = Store.getPageColorsById(route.path)
            portraits.push({
                group: route.parent,
                background_color: colors.background,
                index_color: colors.index,
                face_url: baseMediaPath + route.path + '/mobile/face.jpg',
                shoe_url: baseMediaPath + route.path + '/mobile/shoe.jpg'
            })
        })
        scope.portraits = portraits
        super.render('TinderContainer', parent, template, scope)
    }
    componentDidMount() {
        this.viewport = dom.select('#viewport', this.element)
        this.stackEl = dom.select('ul.stack', this.viewport)
        this.backgroundsEl = dom.select('.backgrounds ul', this.element)
        this.cardsLi = dom.select.all('li', this.stackEl)
        this.imgs = dom.select.all('li > div', this.stackEl)

        const config = {}
        this.stack = Swing.Stack(config)
        this.cardsLi.forEach((targetElement) => {
            this.stack.createCard(targetElement)
        })

        this.stack.on('dragmove', this.onDragMove)
        this.stack.on('dragstart', this.onDragStart)
        this.stack.on('throwout', this.onThrowout)
        this.stack.on('throwin', this.onThrowin)

        setTimeout(() => { Actions.updateCardsColors(dom.select('li:last-child', this.backgroundsEl).getAttribute('data-color')) })

        super.componentDidMount()
    }
    onDragStart(e) {
        if (this.currentBg !== undefined) return
        this.currentBg = dom.select('li:last-child', this.backgroundsEl)
        this.currentBg.style.opacity = 1
        this.fromThrowOut = false
    }
    onDragMove(e) {
        raf(() => {
            if (this.currentBg === undefined || e.target === undefined) return
            const matrix = Utils.cssToMatrix(e.target)
            const xPos = parseInt(matrix[4], 10)
            const distance = (xPos / this.maxDistance) * 1
            const opacity = 1 - Math.abs(distance)
            this.currentBg.style.opacity = opacity
        })
    }
    onThrowout(e) {
        const oldCard = this.stack.getCard(e.target)
        const newCardEl = e.target
        const lastEl = dom.select('li:first-child', this.stackEl)
        const lastBackgroundEl = dom.select('li:first-child', this.backgroundsEl)

        if (this.fromThrowOut) {
            this.currentBg = dom.select('li:last-child', this.backgroundsEl)
        }

        dom.tree.remove(this.backgroundsEl, this.currentBg)
        dom.tree.addBefore(this.backgroundsEl, this.currentBg, lastBackgroundEl)
        setTimeout(() => { Actions.updateCardsColors(dom.select('li:last-child', this.backgroundsEl).getAttribute('data-color')) })
        setTimeout(() => {
            this.currentBg.style.opacity = 1
            this.currentBg = undefined
            oldCard.destroy()
            e.target.style.transform = 'translate3d(0px, 0px, 0px) translate(0px, 0px) rotate(0deg)'
            const relative = dom.select('.relative', e.target)
            TweenMax.set(relative, { x:0, y:0, rotation:0 })
            dom.tree.remove(e.target)
            setTimeout(() => {
                this.stackEl.insertBefore(newCardEl, lastEl)
                this.stack.createCard(newCardEl)
            }, 0)
        }, 0)
        this.fromThrowOut = false
    }
    onThrowin(e) {
        this.currentBg.style.opacity = 1
        this.currentBg = undefined
    }
    nextPerson() {
        this.throwOutByDir(1)
    }
    previousPerson() {
        this.throwOutByDir(-1)
    }
    throwOutByDir(dir) {
        if (!this.throwOutFinished) return
        this.fromThrowOut = true
        const windowW = Store.Window.w
        const currentEl = dom.select('li:last-child', this.stackEl)
        const relative = dom.select('.relative', currentEl)
        const card = this.stack.getCard(currentEl)
        const rotation = Utils.rand(-40, 40, 0)
        const y = Utils.rand(-100, 100, 0)
        TweenMax.to(relative, 0.7, { x: dir * (windowW * 1.2), y:y, rotation: rotation, ease:Expo.easeOut })
        this.throwOutFinished = false
        setTimeout(() => {
            card.throwOut(0, 0)
            setTimeout(() => {
                this.throwOutFinished = true
            }, 200)
        }, 500)
    }
    resize() {
        const windowW = Store.Window.w
        const windowH = Store.Window.h
        const cardW = windowW * 0.85
        const cardH = windowH * 0.6
        this.maxDistance = cardW

        if (!this.domIsReady) return
        
        const imgResizeVars = Utils.resizePositionProportionally(cardW, cardH, Constants.MEDIA_MOBILE_W, Constants.MEDIA_MOBILE_H)

        this.cardsLi.forEach((card) => {
            card.style.width = cardW + 'px'
            card.style.height = cardH + 'px'
        })
        this.imgs.forEach((img) => {
            img.style.width = imgResizeVars.width + 'px'
            img.style.height = imgResizeVars.height + 'px'
            img.style.top = imgResizeVars.top + 'px'
            img.style.left = imgResizeVars.left + 'px'
        })
        this.viewport.style.left = (windowW >> 1) - (cardW >> 1) - 4 + 'px'
        this.viewport.style.top = (windowH >> 1) - (cardH * 0.58) + 'px'
    }
}

export default TinderContainer
