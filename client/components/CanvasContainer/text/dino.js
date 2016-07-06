import Store from '../../../store'
import dom from 'dom-hand'

export default (id, props) => {
    let scope
    let mesh
    const size = [ 800, 600 ]
    const container = new THREE.Object3D()
    const containerScale = 0.8
    container.scale.set(containerScale, containerScale, containerScale)
    container.position.set(0, -40, 0)
    container.visible = false
    const settings = {
        metalness: 0.2,
        roughness: 0.26,
        ambientIntensity: 0.3,
        aoMapIntensity: 1.0,
        lightMapIntensity: 2.0,
        envMapIntensity: 1.4,
        displacementScale: 2.436143,
        displacementBias: -0.428408,
        normalScale: 1.0,
        point0Intensity: props.lights.point_0.intensity,
        point1Intensity: props.lights.point_1.intensity,
        point2Intensity: props.lights.point_2.intensity,
        ambientLightIntensity: props.lights.ambient.intensity
    }
    // Lights
    const normalMap = Store.getTexture(id, 'normal')
    const displacementMap = Store.getTexture(id, 'displacement')
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping
    displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping
    normalMap.repeat.set( 2, 2 )
    displacementMap.repeat.set( 2, 1.4 )

    const cubeTexture = new THREE.CubeTexture()
    cubeTexture.images[0] = Store.getTextureImg(id, 'px')
    cubeTexture.images[1] = Store.getTextureImg(id, 'nx')
    cubeTexture.images[2] = Store.getTextureImg(id, 'py')
    cubeTexture.images[3] = Store.getTextureImg(id, 'ny')
    cubeTexture.images[4] = Store.getTextureImg(id, 'pz')
    cubeTexture.images[5] = Store.getTextureImg(id, 'nz')
    cubeTexture.needsUpdate = true
    cubeTexture.format = THREE.RGBFormat
    cubeTexture.mapping = THREE.CubeReflectionMapping
    
    const material = new THREE.MeshStandardMaterial({
        color: 0x779B28,
        roughness: settings.roughness,
        metalness: settings.metalness,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(1, 1), // why does the normal map require negation in this case?
        displacementMap: displacementMap,
        displacementScale: settings.displacementScale,
        displacementBias: settings.displacementBias,
        envMap: cubeTexture,
        envMapIntensity: settings.envMapIntensity
    })

    // GUI
    // const gui = new dat.GUI({ autoplace: false })
    // dom.select('#gui', document).appendChild(gui.domElement)
    // // gui.add(settings, 'metalness', 0, 2.0).onChange((value) => { material.metalness = value })
    // // gui.add(settings, 'roughness', 0, 1.0).onChange((value) => { material.roughness = value })
    // // gui.add(settings, 'ambientIntensity', 0, 1.0).onChange((value) => { material.ambientIntensity = value })
    // // gui.add(settings, 'aoMapIntensity', 0, 100.0).onChange((value) => { material.aoMapIntensity = value })
    // // gui.add(settings, 'lightMapIntensity', 0, 10.0).onChange((value) => { material.lightMapIntensity = value })
    // // gui.add(settings, 'displacementScale', 0, 5.0).onChange((value) => { material.displacementScale = value })
    // // gui.add(settings, 'displacementBias', -1, 1.0).onChange((value) => { material.displacementBias = value })
    // // gui.add(settings, 'envMapIntensity', 0, 3.0).onChange((value) => { material.envMapIntensity = value })
    // gui.add(settings, 'point0Intensity', 0, 2.0).onChange((value) => { props.lights.point_0.intensity = value })
    // gui.add(settings, 'point1Intensity', 0, 2.0).onChange((value) => { props.lights.point_1.intensity = value })
    // gui.add(settings, 'point2Intensity', 0, 2.0).onChange((value) => { props.lights.point_2.intensity = value })
    // gui.add(settings, 'ambientLightIntensity', 0, 3.0).onChange((value) => { props.lights.ambient.intensity = value })

    const loader = new THREE.JSONLoader()
    loader.load(Store.baseMediaPath() + 'mesh/dino.js', (object) => {
        mesh = new THREE.Mesh( object, material )
        const scale = 0.06
        mesh.scale.set(scale, scale, scale)
        container.add(mesh)
        props.scene.add(container)
    })

    const render = () => {
        if (mesh === undefined) return
        const smoothing = 0.1
        container.rotation.x += (-0.005) + ((Math.cos(Store.Mouse.nY) * 0.4) - container.rotation.x) * smoothing
        container.rotation.y += ((Math.sin(Store.Mouse.nX) * 0.3) - container.rotation.y) * smoothing
        container.rotation.z += ((Math.sin(Store.Mouse.nX) * 0.1) - container.rotation.z) * smoothing
    }
    const activate = () => {
        // props.scene.add(container)
        container.visible = true
    }
    const deactivate = () => {
        // props.scene.remove(container)
        container.visible = false
    }
    const resize = () => {
    }
    const updateStyle = (id) => {
        props.lights.point_0.color = new THREE.Color(0xffffff)
        props.lights.point_1.color = new THREE.Color(0xffffff)
        props.lights.point_2.color = new THREE.Color(0xffffff)
        props.lights.ambient.color = new THREE.Color(0x000000)
        props.lights.point_0.intensity = 0.48
        props.lights.point_1.intensity = 0.55
        props.lights.point_2.intensity = 0.48
        props.lights.ambient.intensity = 0.8
        props.lights.point_0.position.set(0, 0, 0)
        props.lights.point_1.position.set(0, 0, 0)
        props.lights.point_2.position.set(0, 0, 0)
        props.lights.point_0.position.z = 2500
        props.lights.point_2.position.x = - 1000
        props.lights.point_2.position.z = 1000
    }
    scope = {
        id,
        size,
        activate,
        deactivate,
        resize,
        render,
        updateStyle
    }
    return scope
}
