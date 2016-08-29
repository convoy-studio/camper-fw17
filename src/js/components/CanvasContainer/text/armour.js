import Store from '../../../store'
import Constants from '../../../constants'
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
    let indexTimeout = undefined
    const container = new THREE.Object3D()
    const containerScale = 0.043
    const geometry = Store.Meshes['armours']
    container.scale.set(containerScale, containerScale, containerScale)
    container.position.set(0, normalPosY, 0)
    container.visible = false
    const settings = {
        metalness: 0.5,
        roughness: 0.43,
        ambientIntensity: 0.3,
        aoMapIntensity: 0.0,
        lightMapIntensity: 1.0,
        envMapIntensity: 1.74,
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
    cubeTexture.images[1] = Store.getTextureImg(id, 'px')
    cubeTexture.images[2] = Store.getTextureImg(id, 'px')
    cubeTexture.images[3] = Store.getTextureImg(id, 'px')
    cubeTexture.images[4] = Store.getTextureImg(id, 'px')
    cubeTexture.images[5] = Store.getTextureImg(id, 'px')
    cubeTexture.needsUpdate = true
    cubeTexture.format = THREE.RGBFormat
    cubeTexture.mapping = THREE.CubeReflectionMapping
    
    const material = new THREE.MeshStandardMaterial({
        color: 0xa1a5b5,
        roughness: settings.roughness,
        metalness: settings.metalness,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(0.15, 0.15),
        map: specularMap,
        envMap: cubeTexture,
        envMapIntensity: settings.envMapIntensity
    })

    mesh = new THREE.Mesh(geometry, material)
    mesh.scale.set(normalScale, normalScale, normalScale)
    container.add(mesh)
    props.scene.add(container)

    const tl = new TimelineMax()
    tl.fromTo(mesh.scale, Constants.INDEX_TIME, { x:0, y:0, z:0 }, { x:indexScale, y:indexScale, z:indexScale, ease:Constants.INDEX_EASE })
    tl.pause(0)

    const render = () => {
        if (mesh === undefined) return
        const smoothing = 0.3
        container.rotation.x += (-0.005) + ((Math.cos(Store.Mouse.nY) * 0.4) - container.rotation.x) * smoothing
        container.rotation.y += ((Math.sin(Store.Mouse.nX) * 0.3) - container.rotation.y) * smoothing
        container.rotation.z += ((Math.sin(Store.Mouse.nX) * 0.1) - container.rotation.z) * smoothing
    }
    const activate = () => {
        mesh.scale.set(0, 0, 0)
        container.visible = true
    }
    const deactivate = () => {
        container.visible = false
    }
    const indexState = () => {
        render()
        tl.pause(0)
        render()
    }
    const resize = () => {
        if (mesh === undefined) return
        clearTimeout(indexTimeout)
        if (Store.IndexIsOpened) {
            tl.pause(0)
            indexTimeout = setTimeout(() => { tl.timeScale(1.4).play(0) }, Constants.INDEX_TIMEOUT)
            container.position.y = indexPosY
        } else {
            mesh.scale.set(normalScale, normalScale, normalScale)
            container.position.y = normalPosY
        }
    }
    const updateStyle = (id) => {
        props.lights.point_0.intensity = 0.91
        props.lights.point_1.intensity = 0.6
        props.lights.point_2.intensity = 0.39
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
        indexState,
        container
    }
    return scope
}
