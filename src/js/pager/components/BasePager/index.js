import BaseComponent from '../BaseComponent'
import {PagerStore, PagerActions, PagerConstants} from '../../Pager'
import Utils from '../../../utils'
import template from './template.hbs'
import Store from '../../../store'
import Constants from '../../../constants'
import Actions from '../../../actions'

class BasePager extends BaseComponent {
    constructor(initialPageReady) {
        super()
        this.currentPageDivRef = 'page-b'
        this.willPageTransitionIn = this.willPageTransitionIn.bind(this)
        this.willPageTransitionOut = this.willPageTransitionOut.bind(this)
        this.didPageTransitionInComplete = this.didPageTransitionInComplete.bind(this)
        this.didPageTransitionOutComplete = this.didPageTransitionOutComplete.bind(this)
        this.pageTransitionDidFinish = this.pageTransitionDidFinish.bind(this)
        this.portraitTransitionReachedHalfTime = this.portraitTransitionReachedHalfTime.bind(this)
        this.onPageReady = this.onPageReady.bind(this)
        this.initialPageReady = initialPageReady
        this.components = {
            'new-component': undefined,
            'old-component': undefined
        }
    }
    render(parent) {
        super.render('BasePager', parent, template, undefined)
    }
    componentWillMount() {
        PagerStore.on(PagerConstants.PAGE_TRANSITION_IN, this.willPageTransitionIn)
        PagerStore.on(PagerConstants.PAGE_TRANSITION_OUT, this.willPageTransitionOut)
        PagerStore.on(PagerConstants.PAGE_TRANSITION_DID_FINISH, this.pageTransitionDidFinish)
        Store.on(Constants.PORTRAIT_TRANSITION.DID_REACH_HALF_TIME, this.portraitTransitionReachedHalfTime)
        super.componentWillMount()
    }
    willPageTransitionIn() {
        const type = Store.getTypeOfPage()
        if (type === Constants.PORTRAIT) {
            Actions.startPortraitTransition()
        } else {
            this.switchPagesDivIndex()
            if (this.components['new-component'] !== undefined) this.components['new-component'].willTransitionIn()
        }
    }
    willPageTransitionOut() {
        setTimeout(Actions.loadPageAssets, 0)
    }
    pageAssetsLoaded() {
        if (this.components['new-component'] !== undefined) this.components['new-component'].willTransitionOut()
    }
    didPageTransitionInComplete() {
        Store.Parent.style.cursor = 'auto'
        Store.FrontBlock.style.visibility = 'hidden'
        PagerActions.onTransitionInComplete()
        PagerActions.pageTransitionDidFinish()
    }
    didPageTransitionOutComplete() {
        PagerActions.onTransitionOutComplete()
    }
    pageTransitionDidFinish() {
        // Actions.loadNextPreviousPageAssets()
        this.unmountComponent('old-component')
    }
    switchPagesDivIndex() {
        const newComponent = this.components['new-component']
        const oldComponent = this.components['old-component']
        if (newComponent !== undefined) newComponent.parent.style['z-index'] = 2
        if (oldComponent !== undefined) oldComponent.parent.style['z-index'] = 1
    }
    portraitTransitionReachedHalfTime() {
        this.switchPagesDivIndex()
        if (this.components['new-component'] !== undefined) this.components['new-component'].willTransitionIn()
    }
    setupNewComponent(route, Type, tmpl) {
        const id = Utils.capitalizeFirstLetter(route.parent.replace('/', ''))
        this.oldPageDivRef = this.currentPageDivRef
        this.currentPageDivRef = (this.currentPageDivRef === 'page-a') ? 'page-b' : 'page-a'
        const el = document.getElementById(this.currentPageDivRef)
        const props = {
            id: this.currentPageDivRef,
            isReady: this.onPageReady,
            route: route,
            didTransitionInComplete: this.didPageTransitionInComplete,
            didTransitionOutComplete: this.didPageTransitionOutComplete,
            data: Store.pageContent()
        }
        const page = new Type(props)
        page.render(id, el, tmpl, props.data)
        this.components['old-component'] = this.components['new-component']
        this.components['new-component'] = page

        if (PagerStore.pageTransitionState === PagerConstants.PAGE_TRANSITION_IN_PROGRESS) {
            this.components['old-component'].forceUnmount()
        }
    }
    onPageReady(route) {
        this.initialPageReady()
        PagerActions.onPageReady(route)
    }
    componentDidMount() {
        super.componentDidMount()
    }
    unmountComponent(ref) {
        if (this.components[ref] !== undefined) {
            this.components[ref].remove()
        }
    }
}

export default BasePager

