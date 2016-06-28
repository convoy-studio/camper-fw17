import BaseComponent from '../../pager/components/BaseComponent'
import NormalRenderer from './normal-renderer'
import GlRenderer from './gl-renderer'
import Store from '../../store'


class CanvasContainer extends BaseComponent {
    constructor() {
        super()
    }
    render(parent) {
        super.render('CanvasContainer', parent)
    }
    componentWillMount() {
        super.componentWillMount()
    }
    componentDidMount() {
        if (Store.Detector.isSupportWebGL) this.renderer = new GlRenderer()
        else this.renderer = new NormalRenderer()
        this.renderer.init(this.element)
        super.componentDidMount()
    }
    update() {
        this.renderer.render()
    }
    resize() {
        if (!this.domIsReady) return
    }
}

export default CanvasContainer
