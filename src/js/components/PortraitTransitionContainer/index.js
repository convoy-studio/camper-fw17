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
        this.startPortraitToPortraitTransition = this.startPortraitToPortraitTransition.bind(this)
        this.sprites = {}
        this.timeCounter = 0
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
        Store.on(Constants.PORTRAIT_TRANSITION.WILL_START, this.startPortraitToPortraitTransition)

        const element = dom.select('#transition-container', this.element)
        const params = {
            element: element,
            width: Constants.TRANSITION_SPRITE_W,
            height: Constants.TRANSITION_SPRITE_H
        }
        this.stage = Utils.setupCanvas(params)
        
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
            const params = Store.getGroupSpriteParams()
            const sprite = Utils.setupAnimatedSprite({
                image: image,
                width: Constants.TRANSITION_SPRITE_W,
                height: Constants.TRANSITION_SPRITE_H,
                count: params.count,
                framerate: params.framerate,
                paused: true
            })
            this.stage.addChild(sprite)
            sprite.count = params.count
            this.sprites[group] = sprite
            this.currentSprite = sprite
        } else {
            this.currentSprite = this.sprites[group]
        }
        if (direction === 1) this.currentSprite.rotation = 0
        else this.currentSprite.rotation = 180
        this.currentSprite.frame = 0
        this.currentSprite.gotoAndStop(0)
        this.resize()
    }
    startPortraitToPortraitTransition() {
        this.transitionInHalftime = false
        this.transitionIsFinished = false
        this.setupCurrentSprite()
        this.currentSprite.alpha = 1
        this.element.style.visibility = 'visible'
    }
    portraitToPortraitTransitionIsInHalfTime() {
        if (this.transitionInHalftime) return
        Actions.portraitTransitionReachedHalfTime()
        this.transitionInHalftime = true
    }
    portraitToPortraitTransitionDidFinish() {
        if (this.transitionIsFinished) return
        this.currentSprite.gotoAndStop(0)
        this.currentSprite.alpha = 0
        setTimeout(() => { 
            this.element.style.visibility = 'hidden'
            this.currentSprite = undefined
        }, 500)
        this.transitionIsFinished = true   
    }
    update() {
        if (this.currentSprite === undefined) return
        this.stage.update()
        this.timeCounter ++
        if (this.timeCounter > 2) {
            this.currentSprite.frame += 1
            this.timeCounter = 0
        }
        this.currentSprite.gotoAndStop(this.currentSprite.frame)
        if (this.currentSprite.currentFrame > (this.currentSprite.count >> 1)) this.portraitToPortraitTransitionIsInHalfTime()
        if (this.currentSprite.currentFrame >= this.currentSprite.count - 1) this.portraitToPortraitTransitionDidFinish()
    }
    resize() {
        if (!this.domIsReady) return
        if (this.currentSprite === undefined) return
        const windowW = Store.Window.w
        const windowH = Store.Window.h
        const canvas = this.stage.canvas
        canvas.width = windowW
        canvas.height = windowH
        const resizeVars = Utils.resizePositionProportionally(windowW, windowH, Constants.TRANSITION_SPRITE_W, Constants.TRANSITION_SPRITE_H)
        this.currentSprite.regX = (Constants.TRANSITION_SPRITE_W >> 1)
        this.currentSprite.regY = (Constants.TRANSITION_SPRITE_H >> 1)
        this.currentSprite.x = (windowW >> 1)
        this.currentSprite.y = (windowH >> 1)
        this.currentSprite.scaleX = this.currentSprite.scaleY = resizeVars.scale
    }
}

export default PortraitTransitionContainer
