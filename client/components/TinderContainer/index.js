import BaseComponent from '../../pager/components/BaseComponent'
import template from './template.hbs'
import Store from '../../store'
import Constants from '../../constants'
import Router from '../../services/router'
import Utils from '../../utils'
import dom from 'dom-hand'
const Swing = require('swing')

const Card = {
    DIRECTION_LEFT: 'left',
    DIRECTION_RIGHT: 'right'
}

class TinderContainer extends BaseComponent {
    constructor() {
        super()
    }
    render(parent) {
        let scope = {}
        let portraits = []
        const routes = Router.getPortraitRoutes()
        const baseMediaPath = Store.baseMediaPath() + 'media/group'
        routes.forEach((route) => {
            portraits.push({
                face_url: baseMediaPath + route.path + '/mobile/face.jpg',
                shoe_url: baseMediaPath + route.path + '/mobile/shoe.jpg'
            })
        })
        scope.portraits = portraits
        super.render('TinderContainer', parent, template, scope)
    }
    componentDidMount() {
        this.viewport = dom.select('#viewport', this.element)
        this.cardsLi = dom.select.all('li', this.element)
        this.imgs = dom.select.all('li > div', this.element)

        const config = {
            throwOutConfidence: (offset, element) => {
                return Math.min(Math.abs(offset) / element.offsetWidth, 0.01);
            }
        }

        this.stack = Swing.Stack(config)
        this.cardsLi.forEach((targetElement) => {
            // Add card element to the Stack.
            this.stack.createCard(targetElement)
        })
        // Add event listener for when a card is thrown out of the stack.
        this.stack.on('throwout', (event) => {
            // e.target Reference to the element that has been thrown out of the stack.
            // e.throwDirection Direction in which the element has been thrown (Card.DIRECTION_LEFT, Card.DIRECTION_RIGHT).
            console.log('Card has been thrown out of the stack.')
            console.log('Throw direction: ' + (event.throwDirection == Card.DIRECTION_LEFT ? 'left' : 'right'))
        })
        // Add event listener for when a card is thrown in the stack, including the spring back into place effect.
        this.stack.on('throwin', () => {
            console.log('Card has snapped back to the stack.')
        })
        console.log(this.stack)
        super.componentDidMount()
    }
    nextPerson() {
        // const windowW = Store.Window.w
        // const el = this.cardsLi[this.cardsLi.length - 1]
        // const card = this.stack.getCard(el)
        // // card.throwOut(0.1, Utils.rand(-100, 100, 0))
        // card.throwOut(0, 0)
    }
    previousPerson() {
        // const windowW = Store.Window.w
        // const el = this.cardsLi[this.cardsLi.length - 1]
        // const card = this.stack.getCard(el)
        // // card.throwOut(-0.1, Utils.rand(-100, 100, 0))
        // card.throwOut(0, 0)
    }
    resize() {
        const windowW = Store.Window.w
        const windowH = Store.Window.h
        const cardW = windowW * 0.8
        const cardH = windowH * 0.6

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
        this.viewport.style.left = (windowW >> 1) - (cardW >> 1) + 'px'
        this.viewport.style.top = (windowH >> 1) - (cardH * 0.56) + 'px'
    }
}

export default TinderContainer
