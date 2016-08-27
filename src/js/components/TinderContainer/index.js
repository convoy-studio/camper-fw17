import BaseComponent from '../../pager/components/BaseComponent'
import template from './template.hbs'
import Store from '../../store'
import Constants from '../../constants'
import Router from '../../services/router'
import Utils from '../../utils'
import Actions from '../../actions'
import miniVideo from 'mini-video'
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
        this.onShowShoe = this.onShowShoe.bind(this)
        this.onShowVideo = this.onShowVideo.bind(this)
        this.maxDistance = 0
        this.throwOutFinished = true

        Store.on(Constants.SHOW_PERSON_INFO, this.onShowShoe)
        Store.on(Constants.SHOW_PERSON_VIDEO, this.onShowVideo)
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
                name: route.target,
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
        this.videoContainer = dom.select('.video-container', this.element)
        this.videoHolder = dom.select('.video-holder', this.videoContainer)
        this.videoBackground = dom.select('.background', this.videoContainer)
        this.backgroundsEl = dom.select('.backgrounds ul', this.element)
        this.cardsLi = dom.select.all('li', this.stackEl)
        this.imgs = dom.select.all('li > div', this.stackEl)

        const config = {}
        this.stack = Swing.Stack(config)
        this.cardsLi.forEach((targetElement) => { this.stack.createCard(targetElement) })

        this.stack.on('dragmove', this.onDragMove)
        this.stack.on('dragstart', this.onDragStart)
        this.stack.on('throwout', this.onThrowout)
        this.stack.on('throwin', this.onThrowin)

        this.updateFromLastChild()
        super.componentDidMount()
    }
    onShowShoe(vars) {
        this.removeCurrentVideo()
        const currentSlide = dom.select('li:last-child', this.stackEl)
        if (dom.classes.has(currentSlide, 'show-shoe')) dom.classes.remove(currentSlide, 'show-shoe')
        else dom.classes.add(currentSlide, 'show-shoe')
    }
    onShowVideo() {
        this.removeCurrentVideo()
        const currentSlide = dom.select('li:last-child', this.backgroundsEl)
        const group = currentSlide.getAttribute('data-group')
        const name = currentSlide.getAttribute('data-name')
        const color = currentSlide.getAttribute('data-background-color')
        const videoPath = Store.baseMediaPath() + 'media/group/' + group + '/' + name + '/portrait/morphing.mp4'
        this.currentVideo = miniVideo({ autoplay: true, loop: true })
        this.currentVideo.addTo(this.videoHolder)
        this.currentVideo.load(videoPath, () => {})
        this.videoContainer.style.visibility = 'visible'
        this.videoBackground.style.backgroundColor = color
    }
    updateFromLastChild() {
        setTimeout(() => { 
            const lastLi = dom.select('li:last-child', this.backgroundsEl)
            Actions.updateCards(
                lastLi.getAttribute('data-color'),
                lastLi.getAttribute('data-background-color'),
                lastLi.getAttribute('data-name'),
                lastLi.getAttribute('data-group')
            )
        })
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
    removeCurrentVideo() {
        if (this.currentVideo) {
            this.currentVideo.pause()
            this.currentVideo.clear()
            this.videoHolder.innerHTML = ''
            this.videoContainer.style.visibility = 'hidden'
            this.currentVideo = null
        }
    }
    onThrowout(e) {
        const oldCard = this.stack.getCard(e.target)
        const newCardEl = e.target
        const lastEl = dom.select('li:first-child', this.stackEl)
        const lastBackgroundEl = dom.select('li:first-child', this.backgroundsEl)

        if (this.fromThrowOut) {
            this.currentBg = dom.select('li:last-child', this.backgroundsEl)
        }

        this.removeCurrentVideo()

        dom.tree.remove(this.backgroundsEl, this.currentBg)
        dom.tree.addBefore(this.backgroundsEl, this.currentBg, lastBackgroundEl)
        this.updateFromLastChild()
        setTimeout(() => {
            this.currentBg.style.opacity = 1
            this.currentBg = undefined
            oldCard.destroy()
            e.target.style.transform = 'translate3d(0px, 0px, 0px) translate(0px, 0px) rotate(0deg)'
            const relative = dom.select('.relative', e.target)
            dom.classes.remove(e.target, 'show-shoe')
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
        if (this.currentBg === undefined) return
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
        const cardW = windowW * 0.7
        const cardH = windowH * 0.5
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
        this.viewport.style.top = (windowH >> 1) - (cardH * 0.64) + 'px'
    }
}

export default TinderContainer
