import BaseComponent from '../../pager/components/BaseComponent'
import template from './template.hbs'
import Store from '../../store'
import Constants from '../../constants'
import Actions from '../../actions'
import Utils from '../../utils'
import dom from 'dom-hand'

class PortraitTransitionContainer extends BaseComponent {
    constructor() {
        super()
        this.onAppStarted = this.onAppStarted.bind(this)
        this.didRouteChange = this.didRouteChange.bind(this)
        this.startTransition = this.startTransition.bind(this)
        this.tick = this.tick.bind(this)
        this.sprites = {}
    }
    render(parent) {
        let scope = {}
        super.render('PortraitTransitionContainer', parent, template, scope)
    }
    componentWillMount() {
        super.componentWillMount()
    }
    componentDidMount() {
        Store.on(Constants.APP_START, this.onAppStarted)
        Store.on(Constants.ROUTE_CHANGED, this.didRouteChange)
        Store.on(Constants.PORTRAIT_TRANSITION.WILL_START, this.startTransition)
        
        super.componentDidMount()
    }
    didRouteChange() {
    }
    onAppStarted() {
        Store.off(Constants.APP_START, this.onAppStarted)
    }
    setupCurrentSprite() {
        const direction = Store.getRouteDirection()
        const group = Store.getCurrentGroup()
        if (this.sprites[group] === undefined) {
            const id = 'common-' + group + '-transition'
            const image = Store.Preloader.getContentById(id)
            const element = dom.select('#' + group, this.element)
            const params = Store.getGroupSpriteParams()
            const sprite = Utils.setupAnimatedSprite({
                element: element,
                image: image,
                width: Constants.TRANSITION_SPRITE_W,
                height: Constants.TRANSITION_SPRITE_H,
                count: params.count,
                framerate: params.framerate,
                paused: true
            })
            sprite.sprite.count = params.count
            this.sprites[group] = sprite
            this.currentSprite = sprite
        } else {
            this.currentSprite = this.sprites[group]
        }
        if (direction === 1) this.currentSprite.sprite.rotation = 0
        else this.currentSprite.sprite.rotation = 180
        this.currentSprite.sprite.gotoAndStop(0)
        this.resize()
    }
    startTransition() {
        this.transitionInHalftime = false
        this.transitionIsFinished = false
        this.setupCurrentSprite()
        this.currentSprite.sprite.play()
        setTimeout(() => { this.currentSprite.stage.canvas.style.opacity = 1 }, 50)
        createjs.Ticker.addEventListener('tick', this.tick)
        this.element.style.display = 'block'
    }
    transitionIsInHalfTime() {
        if (this.transitionInHalftime) return
        Actions.portraitTransitionReachedHalfTime()
        this.transitionInHalftime = true
    }
    transitionDidFinish() {
        if (this.transitionIsFinished) return
        this.currentSprite.sprite.gotoAndStop(0)
        createjs.Ticker.removeEventListener('tick', this.tick)
        this.element.style.display = 'none'
        this.currentSprite.stage.canvas.style.opacity = 0
        this.currentSprite = undefined
        this.transitionIsFinished = true   
    }
    tick(event) {
        if (this.currentSprite === undefined) return
        this.currentSprite.stage.update(event)
        if (this.currentSprite.sprite.currentFrame > (this.currentSprite.sprite.count >> 1)) this.transitionIsInHalfTime()
        if (this.currentSprite.sprite.currentFrame >= this.currentSprite.sprite.count - 1) this.transitionDidFinish()
    }
    resize() {
        if (!this.domIsReady) return
        if (this.currentSprite === undefined) return
        const windowW = Store.Window.w
        const windowH = Store.Window.h
        const canvas = this.currentSprite.stage.canvas
        const resizeVars = Utils.resizePositionProportionally(windowW, windowH, Constants.TRANSITION_SPRITE_W, Constants.TRANSITION_SPRITE_H)
        canvas.style.width = resizeVars.width + 'px'
        canvas.style.height = resizeVars.height + 'px'
        canvas.style.left = resizeVars.left + 'px'
        canvas.style.top = resizeVars.top + 'px'
        this.currentSprite.sprite.regX = (Constants.TRANSITION_SPRITE_W >> 1)
        this.currentSprite.sprite.regY = (Constants.TRANSITION_SPRITE_H >> 1)
        this.currentSprite.sprite.x = (Constants.TRANSITION_SPRITE_W >> 1)
        this.currentSprite.sprite.y = (Constants.TRANSITION_SPRITE_H >> 1)
    }
}

export default PortraitTransitionContainer
