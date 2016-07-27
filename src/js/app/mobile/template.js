import BaseComponent from '../../pager/components/BaseComponent'
import FrontContainer from '../../components/FrontContainerMobile'
import TinderContainer from '../../components/TinderContainer'
import Store from '../../store'
import Constants from '../../constants'
import { resize as globalResize } from '../../services/global-events'
import raf from 'raf'

class AppTemplate extends BaseComponent {
    constructor() {
        super()
        this.resize = this.resize.bind(this)
        this.didNextPersonClick = this.didNextPersonClick.bind(this)
        this.didPreviousPersonClick = this.didPreviousPersonClick.bind(this)
    }
    render(parent) {
        super.render('AppTemplate', parent, undefined)
    }
    componentWillMount() {
        Store.on(Constants.NEXT_PERSON, this.didNextPersonClick)
        Store.on(Constants.PREVIOUS_PERSON, this.didPreviousPersonClick)

        super.componentWillMount()
    }
    componentDidMount() {
        this.frontContainer = new FrontContainer()
        this.frontContainer.render('#app-template')

        this.tinderContainer = new TinderContainer()
        this.tinderContainer.render('#app-template')

        setTimeout(()=>{
            this.isReady()
            this.onReady()
        }, 0)

        globalResize()

        super.componentDidMount()
    }
    didNextPersonClick() {
        this.tinderContainer.nextPerson()
    }
    didPreviousPersonClick() {
        this.tinderContainer.previousPerson()
    }
    onReady() {
        Store.FrontBlock = document.getElementById('front-block')
        Store.on(Constants.WINDOW_RESIZE, this.resize)
    }
    resize() {
        this.frontContainer.resize()
        this.tinderContainer.resize()
        super.resize()
    }
}

export default AppTemplate

