import Store from '../../../store'
import dom from 'dom-hand'
import Utils from '../../../utils'

export default (id, props) => {
    let scope
    let mesh
    const normalScale = 0.05
    const indexScale = 0.016
    const normalPosY = -90
    const indexPosY = 90
    const size = [ 700, 270 ]
    const container = new THREE.Object3D()
    const containerScale = 1.0
    container.scale.set(containerScale, containerScale, containerScale)
    container.position.set(0, normalPosY, 0)
    container.visible = false
    const settings = {
        metalness: 0.5,
        roughness: 0.26,
        ambientIntensity: 0.3,
        aoMapIntensity: 0.0,
        lightMapIntensity: 1.0,
        envMapIntensity: 0.5,
        displacementScale: 1.436143,
        displacementBias: -0.428408,
        normalScale: 1.0,
        point0Intensity: props.lights.point_0.intensity,
        point1Intensity: props.lights.point_1.intensity,
        point2Intensity: props.lights.point_2.intensity,
        ambientLightIntensity: props.lights.ambient.intensity
    }

    const normalMap = Store.getTexture(id, 'normal')
    const specularMap = Store.getTexture(id, 'specular')
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
        color: 0xa1a5b5,
        roughness: settings.roughness,
        metalness: settings.metalness,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(0.2, 0.2), // why does the normal map require negation in this case?
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
    loader.load(Store.baseMediaPath() + 'mesh/armour.js', (object) => {
        mesh = new THREE.Mesh( object, material )
        mesh.scale.set(normalScale, normalScale, normalScale)
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
    const indexState = () => {
        
    }
    const resize = () => {
        if (mesh === undefined) return
        if (Store.IndexIsOpened) {
            mesh.scale.set(indexScale, indexScale, indexScale)
            container.position.y = indexPosY
        } else {
            mesh.scale.set(normalScale, normalScale, normalScale)
            container.position.y = normalPosY
        }
    }
    const updateStyle = (id) => {
        props.lights.point_0.intensity = 0.4
        props.lights.point_1.intensity = 1
        props.lights.point_2.intensity = 0.7
        props.lights.ambient.intensity = 0.8
        props.lights.point_0.position.set(1617, -147, -625)
        props.lights.point_1.position.set(73, 73, -5000)
        props.lights.point_2.position.set(617, 1397, 2838)
        scope.activate()
    }
    scope = {
        id,
        size,
        activate,
        deactivate,
        resize,
        render,
        updateStyle,
        indexState
    }
    return scope
}
