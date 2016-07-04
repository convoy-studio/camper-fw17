import Store from '../../store'
import Constants from '../../constants'
import sportText from './text/sport'
import kingText from './text/king'
import armourText from './text/armour'
import dinoText from './text/dino'

class GlRenderer {
    init(element) {
        this.render = this.render.bind(this)

        const windowW = Store.Window.w
        const windowH = Store.Window.h
        this.element = element
        this.cameraHeight = 500
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        this.renderer.setPixelRatio( Store.devicePixelRatio() )
        this.renderer.setSize( windowW, windowH )
        this.element.appendChild( this.renderer.domElement )
        this.renderer.gammaInput = true
        this.renderer.gammaOutput = true
        this.renderer.setFaceCulling(THREE.CullFaceNone)
        this.scene = new THREE.Scene()
        let aspect = windowW / windowH
        this.camera = new THREE.OrthographicCamera( - this.cameraHeight * aspect, this.cameraHeight * aspect, this.cameraHeight, - this.cameraHeight, 1, 10000 )
        this.camera.position.z = 1300
        // this.camera = new THREE.PerspectiveCamera( 70, windowW / windowH, 1, 100000 )
        // this.camera.position.z = 800
        this.scene.add( this.camera )
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement )
        this.controls.enableZoom = false
        this.controls.enableDamping = true
        const ambientLight = new THREE.AmbientLight( 0xffffff, 1.8 )
        this.scene.add( ambientLight )
        this.pointLight = new THREE.PointLight( 0x69A524, 0.5 )
        this.pointLight.position.z = 2500
        this.scene.add( this.pointLight )
        const pointLight2 = new THREE.PointLight( 0x69A524, 1 )
        this.camera.add( pointLight2 )
        const pointLight3 = new THREE.PointLight( 0x9CE854, 0.5 )
        pointLight3.position.x = - 1000
        pointLight3.position.z = 1000
        this.scene.add( pointLight3 )
        this.props = {
            renderer: this.renderer,
            scene: this.scene,
            camera: this.camera,
            lights: {
                ambient: ambientLight,
                point_0: this.pointLight,
                point_1: pointLight2,
                point_2: pointLight3
            }
        }
        this.sportText = sportText(Constants.GROUP.SPORT, this.props)
        this.kingText = kingText(Constants.GROUP.KING, this.props)
        this.armourText = armourText(Constants.GROUP.ARMOUR, this.props)
        this.dinoText = dinoText(Constants.GROUP.DINO, this.props)
        this.currentText = this.oldText = undefined
    }
    updateStage(newRoute, oldRoute) {
        if (oldRoute !== undefined && newRoute.parent === oldRoute.parent) {
            this.currentText.updateStyle(newRoute.target)
            return
        }
        this.oldText = this.currentText
        switch (newRoute.parent) {
        case Constants.GROUP.KING:
            this.currentText = this.kingText
            break
        case Constants.GROUP.ARMOUR:
            this.currentText = this.armourText
            break
        case Constants.GROUP.DINO:
            this.currentText = this.dinoText
            break
        case Constants.GROUP.SPORT:
            this.currentText = this.sportText
            break
        default:
            break
        }
        if (this.oldText !== undefined) this.oldText.deactivate()
        this.currentText.activate()
        this.currentText.updateStyle(newRoute.target)
        this.resize()
    }
    resize() {
        if (this.currentText === undefined) return
        const windowW = Store.Window.w
        const windowH = Store.Window.h
        const size = this.currentText.size
        const canvasW = (windowW / Constants.MEDIA_GLOBAL_W) * size[0]
        const canvasH = (windowH / Constants.MEDIA_GLOBAL_H) * size[1]
        const aspect = canvasW / canvasH
        this.camera.left = - this.cameraHeight * aspect
        this.camera.right = this.cameraHeight * aspect
        this.camera.top = this.cameraHeight
        this.camera.bottom = - this.cameraHeight
        this.camera.updateProjectionMatrix()
        // this.camera.aspect = canvasW / canvasH
        // this.camera.updateProjectionMatrix()
        this.renderer.setSize( canvasW, canvasH )
        this.element.style.left = (windowW >> 1) - (canvasW >> 1) + 'px'
        this.element.style.top = windowH - canvasH - (windowH * 0.05) + 'px'
        this.currentText.resize()
    }
    render() {
        if (this.currentText === undefined) return
        this.renderer.render(this.scene, this.camera)
        this.controls.update()
        this.currentText.render()
    }
}

export default GlRenderer
