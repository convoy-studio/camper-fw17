import Store from '../../store'
import sportText from './sport-text'

class GlRenderer {
    init(element) {
        const windowW = Store.Window.w
        const windowH = Store.Window.h
        this.settings = {
            metalness: 1.0,
            roughness: 0.4,
            ambientIntensity: 0.2,
            aoMapIntensity: 1.0,
            envMapIntensity: 1.0,
            displacementScale: 2.436143, // from original model
            normalScale: 1.0
        }
        this.element = element
        this.cameraHeight = 500
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setPixelRatio( Store.devicePixelRatio() )
        this.renderer.setSize( windowW, windowH )
        this.element.appendChild( this.renderer.domElement )
        this.renderer.gammaInput = true
        this.renderer.gammaOutput = true
        this.scene = new THREE.Scene()
        let aspect = windowW / windowH
        this.camera = new THREE.OrthographicCamera( - this.cameraHeight * aspect, this.cameraHeight * aspect, this.cameraHeight, - this.cameraHeight, 1, 10000 )
        this.camera.position.z = 1500
        this.scene.add( this.camera )
        this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement )
        this.controls.enableZoom = false
        this.controls.enableDamping = true
        const ambientLight = new THREE.AmbientLight( 0xffffff, this.settings.ambientIntensity )
        this.scene.add( ambientLight )
        this.pointLight = new THREE.PointLight( 0xff0000, 0.5 )
        this.pointLight.position.z = 2500
        this.scene.add( this.pointLight )
        const pointLight2 = new THREE.PointLight( 0xff6666, 1 )
        this.camera.add( pointLight2 )
        const pointLight3 = new THREE.PointLight( 0x0000ff, 0.5 )
        pointLight3.position.x = - 1000
        pointLight3.position.z = 1000
        this.scene.add( pointLight3 )


        const imgsrc = Store.pagePreloaderId() + 'bump'
        console.log(Store.Preloader.getImageURL(imgsrc))

        this.sportText = sportText()
    }
    render() {
    }
}

export default GlRenderer
