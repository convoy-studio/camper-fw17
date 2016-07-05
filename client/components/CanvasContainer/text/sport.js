import Store from '../../../store'
import dom from 'dom-hand'
import Utils from '../../../utils'

export default (id, props) => {
    props.lights.point_0.color = new THREE.Color(0xffffff)
    props.lights.point_1.color = new THREE.Color(0xffffff)
    props.lights.point_2.color = new THREE.Color(0xffffff)
    props.lights.ambient.color = new THREE.Color(0xffffff)
    props.lights.point_0.intensity = 2
    props.lights.point_1.intensity = 2
    props.lights.point_2.intensity = 2
    props.lights.ambient.intensity = 0.8
    props.lights.point_0.position.set(918, -956, -662)
    props.lights.point_1.position.set(-9817, -4553, -4081)
    props.lights.point_2.position.set(580, -405, 4786)

    let scope
    const size = [ 850*4, 410 ]
    const container = new THREE.Object3D()
    const settings = {
        metalness: 0.3,
        roughness: 0.46,
        ambientIntensity: 0.3,
        aoMapIntensity: 100.0,
        lightMapIntensity: 1.0,
        envMapIntensity: 5,
        displacementScale: 1.436143,
        displacementBias: -0.428408,
        normalScale: 1.0,
        point0Intensity: props.lights.point_0.intensity,
        point1Intensity: props.lights.point_1.intensity,
        point2Intensity: props.lights.point_2.intensity,
        ambientLightIntensity: props.lights.ambient.intensity
    }
    // Lights
    const normalMap = Store.getTexture(id, 'normal')
    const aoMap = Store.getTexture(id, 'ao')
    const specularMap = Store.getTexture(id, 'specular')
    const displacementMap = Store.getTexture(id, 'displacement')
    specularMap.wrapS = specularMap.wrapT = THREE.RepeatWrapping
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping
    normalMap.repeat.set( 5.6, 5.6 )
    specularMap.repeat.set( 5.6, 5.6 )

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
    
    let mesh
    const material = new THREE.MeshStandardMaterial({
        color: 0xDC883C,
        // emissive: 0xDC883C,
        roughness: settings.roughness,
        metalness: settings.metalness,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(1, -1), // why does the normal map require negation in this case?
        aoMap: aoMap,
        aoMapIntensity: settings.aoMapIntensity,
        // lightMap: colorMap,
        // lightMapIntensity: settings.lightMapIntensity,
        displacementMap: displacementMap,
        displacementScale: settings.displacementScale,
        displacementBias: settings.displacementBias,
        map: specularMap,
        envMap: cubeTexture,
        envMapIntensity: settings.envMapIntensity
    })

    // // GUI
    // const gui = new dat.GUI({ autoplace: false })
    // dom.select('#gui', document).appendChild(gui.domElement)
    // gui.add(settings, 'metalness', 0, 2.0).onChange((value) => { material.metalness = value })
    // gui.add(settings, 'roughness', 0, 1.0).onChange((value) => { material.roughness = value })
    // gui.add(settings, 'ambientIntensity', 0, 1.0).onChange((value) => { material.ambientIntensity = value })
    // gui.add(settings, 'aoMapIntensity', 0, 100.0).onChange((value) => { material.aoMapIntensity = value })
    // gui.add(settings, 'lightMapIntensity', 0, 10.0).onChange((value) => { material.lightMapIntensity = value })
    // gui.add(settings, 'displacementScale', 0, 5.0).onChange((value) => { material.displacementScale = value })
    // gui.add(settings, 'displacementBias', -1, 1.0).onChange((value) => { material.displacementBias = value })
    // gui.add(settings, 'envMapIntensity', material.envMapIntensity - 20, material.envMapIntensity + 50).onChange((value) => { material.envMapIntensity = value })
    // gui.add(settings, 'point0Intensity', 0, 2.0).onChange((value) => { props.lights.point_0.intensity = value })
    // gui.add(settings, 'point1Intensity', 0, 2.0).onChange((value) => { props.lights.point_1.intensity = value })
    // gui.add(settings, 'point2Intensity', 0, 2.0).onChange((value) => { props.lights.point_2.intensity = value })
    // gui.add(settings, 'ambientLightIntensity', 0, 30.0).onChange((value) => { props.lights.ambient.intensity = value })
    // Utils.guiVec3(gui, 'point0_position', props.lights.point_0.position, 5000, 5000, 5000)
    // Utils.guiVec3(gui, 'point1_position', props.lights.point_1.position, 5000, 5000, 5000)
    // Utils.guiVec3(gui, 'point2_position', props.lights.point_2.position, 5000, 5000, 5000)

    const loader = new THREE.JSONLoader()
    loader.load(Store.baseMediaPath() + 'mesh/sport.js', (object) => {
        mesh = new THREE.Mesh( object, material )
        const scale = 0.06
        mesh.scale.set(scale, scale, scale)
        container.add(mesh)
    })

    const render = () => {
        if (mesh === undefined) return
        // mesh.rotation.x += .01
        // mesh.rotation.y += .01
        // mesh.rotation.z += .01
    }
    const activate = () => {
        props.scene.add(container)
    }
    const deactivate = () => {
        props.scene.remove(container)
    }
    const resize = () => {
    }
    const updateStyle = (id) => {
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
