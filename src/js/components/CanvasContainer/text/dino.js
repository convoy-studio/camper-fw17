import Store from '../../../store'
import dom from 'dom-hand'

export default (id, props) => {
    let scope
    let mesh
    let angle = 0
    const normalScale = 0.8
    const indexScale = 0.26
    const normalPosY = -20
    const indexPosY = -150
    const size = [ 600, 400 ]
    const geometry = Store.Meshes['dino']
    const container = new THREE.Object3D()
    container.scale.set(normalScale, normalScale, normalScale)
    container.position.set(0, normalPosY, 0)
    container.visible = false
    const settings = {
        metalness: 0.48,
        roughness: 0.28,
        ambientIntensity: 0.3,
        aoMapIntensity: 1.0,
        lightMapIntensity: 2.0,
        envMapIntensity: 0.7,
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
    displacementMap.repeat.set( 4, 1.4 )

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
        color: 0xB8FF42,
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

    mesh = new THREE.Mesh(geometry, material)
    const meshScale = 0.06
    mesh.scale.set(meshScale, meshScale, meshScale)
    container.add(mesh)
    props.scene.add(container)

    const render = () => {
        if (mesh === undefined) return
        const smoothing = 0.3
        angle += 0.03
        container.rotation.x += (-0.005) + ((Math.cos(Store.Mouse.nY) * 0.4) - container.rotation.x) * smoothing
        container.rotation.y += ((Math.sin(Store.Mouse.nX) * 0.3) - container.rotation.y) * smoothing
        container.rotation.z += ((Math.sin(Store.Mouse.nX) * 0.1) - container.rotation.z) * smoothing
        props.lights.point_0.position.x += Math.cos(angle) * 300
        props.lights.point_1.position.x += Math.cos(angle) * 400
        props.lights.point_0.position.y += Math.sin(angle) * 300
        props.lights.point_1.position.y += Math.sin(angle) * 800
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
            container.scale.set(indexScale, indexScale, indexScale)
            container.position.y = indexPosY
        } else {
            container.scale.set(normalScale, normalScale, normalScale)
            container.position.y = normalPosY
        }
    }
    const updateStyle = (id) => {
        props.lights.point_0.intensity = 0.56
        props.lights.point_1.intensity = 0.2
        props.lights.point_2.intensity = 0.39
        props.lights.ambient.intensity = 0.8
        props.lights.point_0.position.set(0, 0, 0)
        props.lights.point_1.position.set(0, 0, 0)
        props.lights.point_2.position.set(0, 0, 0)
        props.lights.point_0.position.z = 2500
        props.lights.point_2.position.x = - 1000
        props.lights.point_2.position.z = 1000
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
