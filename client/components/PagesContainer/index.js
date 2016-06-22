import Constants from '../../constants'
import {PagerActions} from '../../pager/Pager'
import Store from '../../store'
import BasePager from '../../pager/components/BasePager'
import Router from '../../services/router'
import Home from '../Home'
import HomeTemplate from '../Home/template.hbs'
import About from '../About'
import AboutTemplate from '../About/template.hbs'

class PagesContainer extends BasePager {
    constructor() {
        super()
        this.didHasherChange = this.didHasherChange.bind(this)
        this.pageAssetsLoaded = this.pageAssetsLoaded.bind(this)
        Store.on(Constants.PAGE_HASHER_CHANGED, this.didHasherChange)
        Store.on(Constants.PAGE_ASSETS_LOADED, this.pageAssetsLoaded)
    }
    componentWillMount() {
        super.componentWillMount()
    }
    componentDidMount() {
        super.componentDidMount()
    }
    didHasherChange() {
        Store.Parent.style.cursor = 'wait'
        Store.FrontBlock.style.visibility = 'visible'
        const newHash = Router.getNewHash()
        const oldHash = Router.getOldHash()
        if (oldHash === undefined) {
            this.templateSelection(newHash)
        } else {
            PagerActions.onTransitionOut()
        }
    }
    templateSelection(newHash) {
        let type = undefined
        let template = undefined
        switch (newHash.type) {
        case Constants.ABOUT:
            type = About
            template = AboutTemplate
            break
        case Constants.HOME:
            type = Home
            template = HomeTemplate
            break
        default:
            type = Home
            template = HomeTemplate
        }
        this.setupNewComponent(newHash, type, template)
        this.currentComponent = this.components['new-component']
    }
    pageAssetsLoaded() {
        const newHash = Router.getNewHash()
        this.templateSelection(newHash)
        super.pageAssetsLoaded()
    }
    update() {
        if (this.currentComponent !== undefined) this.currentComponent.update()
    }
    resize() {
        if (this.currentComponent !== undefined) this.currentComponent.resize()
    }
}

export default PagesContainer
