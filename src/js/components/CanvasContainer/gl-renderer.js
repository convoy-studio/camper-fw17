import Store from '../../store'
import Constants from '../../constants'
import Utils from '../../utils'
import sportText from './text/sport'
import kingsText from './text/king'
import armoursText from './text/armour'
import dinoText from './text/dino'

class GlRenderer {
    init(element) {
        this.render = this.render.bind(this)

        this.tlOpen = new TimelineMax()
        this.tlClose = new TimelineMax()

        this.isOpen = false
        this.firstTimeOpen = true

        const windowW = Store.Window.w
        const windowH = Store.Window.h
        this.element = element
        this.cameraHeight = 500
        this.angle = 0
        const antialias = Store.devicePixelRatio() > 1 ? false : true
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: antialias })
        this.renderer.setPixelRatio( Store.devicePixelRatio() )
        this.renderer.setSize( windowW, windowH )
        this.element.appendChild( this.renderer.domElement )
        this.renderer.gammaInput = true
        this.renderer.gammaOutput = true
        // this.renderer.setFaceCulling(THREE.CullFaceNone)
        this.scene = new THREE.Scene()
        let aspect = windowW / windowH
        this.camera = new THREE.OrthographicCamera( - this.cameraHeight * aspect, this.cameraHeight * aspect, this.cameraHeight, - this.cameraHeight, 1, 10000 )
        this.camera.position.z = 1300
        this.scene.add( this.camera )
        const ambientLight = new THREE.AmbientLight( 0x666666, 1.8 )
        this.scene.add( ambientLight )
        this.pointLight = new THREE.PointLight( 0xffffff, 0.5 )
        this.pointLight.position.z = 2500
        this.scene.add( this.pointLight )
        const pointLight2 = new THREE.PointLight( 0xffffff, 1 )
        this.camera.add( pointLight2 )
        const pointLight3 = new THREE.PointLight( 0xffffff, 0.5 )
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
        this.kingsText = kingsText(Constants.GROUP.KINGS, this.props)
        this.armoursText = armoursText(Constants.GROUP.ARMOURS, this.props)
        this.dinoText = dinoText(Constants.GROUP.DINO, this.props)
        this.currentText = this.oldText = undefined
        this.allTexts = [this.sportText, this.kingsText, this.armoursText, this.dinoText]
    }
    updateStage(newRoute, oldRoute) {
        if (oldRoute !== undefined && newRoute.parent === oldRoute.parent && this.currentText !== undefined) {
            this.currentText.updateStyle(newRoute.target)
            return
        }
        this.oldText = this.currentText
        switch (newRoute.parent) {
        case Constants.GROUP.KINGS:
            this.currentText = this.kingsText
            break
        case Constants.GROUP.ARMOURS:
            this.currentText = this.armoursText
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
    open() {
        if (this.firstTimeOpen) {
            this.isOpen = true
            this.firstTimeOpen = false
        } else {
            setTimeout(() => { this.isOpen = true }, 200)
        }
        this.tlOpen.timeScale(5).play()
    }
    close() {
        this.isOpen = false
        this.tlClose.timeScale(1.6).play()
    }
    openIndex() {
        this.allTexts.forEach((text) => {
            text.indexState()
            text.activate()
            text.resize()
        })
    }
    closeIndex() {
        this.allTexts.forEach((text) => {
            if (text.id !== this.currentText.id) {
                text.deactivate()
            }
        })
        this.resize()
    }
    resize() {
        if (this.currentText === undefined) return
        const windowW = Store.Window.w
        const windowH = Store.Window.h
        const size = this.currentText.size
        let viewportScale
        let canvasSize
        if (Store.IndexIsOpened) {
            canvasSize = [ 1000, windowH ]
            viewportScale = 0.8
        } else {
            canvasSize = [ size[0], size[1] ]
            viewportScale = 0.4
        }
        const viewportW = windowW * viewportScale
        const viewportH = windowH * viewportScale
        const resizeVars = Utils.resizePositionProportionally(viewportW, viewportH, canvasSize[0], canvasSize[1], Constants.ORIENTATION.LANDSCAPE)
        const canvasW = resizeVars.width
        const canvasH = resizeVars.height
        const aspect = canvasW / canvasH
        this.camera.left = - this.cameraHeight * aspect
        this.camera.right = this.cameraHeight * aspect
        this.camera.top = this.cameraHeight
        this.camera.bottom = - this.cameraHeight
        this.camera.updateProjectionMatrix()

        const canvasScale = Store.IndexIsOpened ? 0.68 : 0.8
        this.renderer.setSize( canvasW * canvasScale, canvasH * canvasScale )
        this.renderer.domElement.style.width = canvasW + 'px'
        this.renderer.domElement.style.height = canvasH + 'px'

        if (Store.IndexIsOpened) {
            this.element.style.left = (windowW >> 1) - (canvasW >> 1) + 'px'
            this.element.style.top = (windowH >> 1) - (canvasH >> 1) + 'px'
        } else {
            this.element.style.left = (windowW >> 1) - (canvasW >> 1) + 'px'
            this.element.style.top = windowH - canvasH - (windowH * 0.05) + 'px'
        }
        this.currentText.resize()
        this.tlOpen.clear()
        this.tlClose.clear()
        this.tlOpen.fromTo(this.element, 1, { scaleX:2, scaleY:0.6, opacity:0, force3D: true }, { scaleX:1, scaleY:1, opacity:1, force3D: true, ease: Expo.easeInOut }, 0)
        this.tlClose.fromTo(this.element, 1, { scaleX:1, scaleY:1, opacity:1, force3D: true }, { scaleX:2, scaleY:0.2, opacity:0, force3D: true, ease: Expo.easeInOut }, 0)
        this.tlClose.pause(0)
        this.tlOpen.pause(0)
    }
    updateLights() {
        this.angle += 0.02
        this.props.lights.point_0.position.x += Math.cos(this.angle) * 100
        this.props.lights.point_1.position.x += Math.cos(this.angle) * 160
        this.props.lights.point_0.position.y += Math.sin(this.angle) * 180
        this.props.lights.point_1.position.y += Math.sin(this.angle) * 200
    }
    render() {
        if (Store.IndexIsOpened) {
            this.allTexts.forEach((text) => { text.render() })
            this.renderer.render(this.scene, this.camera)
            this.updateLights()
        } else {
            if (this.currentText === undefined || this.isOpen === false) return
            this.renderer.render(this.scene, this.camera)
            this.currentText.render()
            this.updateLights()
        }
    }
}

export default GlRenderer
