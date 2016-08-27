import Store from '../../../store'
import dom from 'dom-hand'
import Utils from '../../../utils'

export default (id, props) => {
    let scope
    let mesh
    const normalScale = 0.05
    const indexScale = 0.017
    const normalPosY = -220
    const indexPosY = -380
    const size = [ 900, 360 ]
    const geometry = Store.Meshes['sport']
    const container = new THREE.Object3D()
    const containerScale = 6.0
    container.scale.set(containerScale, containerScale, containerScale)
    container.position.set(0, normalPosY, 0)
    container.visible = false
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
    
    const material = new THREE.MeshStandardMaterial({
        color: 0xDC883C,
        roughness: settings.roughness,
        metalness: settings.metalness,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(1, -1),
        displacementMap: displacementMap,
        displacementScale: settings.displacementScale,
        displacementBias: settings.displacementBias,
        map: specularMap,
        envMap: cubeTexture,
        envMapIntensity: settings.envMapIntensity
    })

    mesh = new THREE.Mesh(geometry, material)
    mesh.scale.set(normalScale, normalScale, normalScale)
    container.add(mesh)
    props.scene.add(container)

    const render = () => {
        if (mesh === undefined) return
        const smoothing = 0.3
        container.rotation.x += (-0.005) + ((Math.cos(Store.Mouse.nY) * 0.4) - container.rotation.x) * smoothing
        container.rotation.y += ((Math.sin(Store.Mouse.nX) * 0.3) - container.rotation.y) * smoothing
        container.rotation.z += ((Math.sin(Store.Mouse.nX) * 0.1) - container.rotation.z) * smoothing
    }
    const activate = () => {
        container.visible = true
    }
    const deactivate = () => {
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
        props.lights.point_0.intensity = 0
        props.lights.point_1.intensity = 0
        props.lights.point_2.intensity = 1.15
        props.lights.ambient.intensity = 0.8
        props.lights.point_0.position.set(918, -956, -662)
        props.lights.point_1.position.set(-9817, -4553, -4081)
        props.lights.point_2.position.set(580, -405, 4786)
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
