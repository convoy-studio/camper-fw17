import Store from '../../../store'

export default (id, props)=> {
    let scope
    const size = [ 600, 300 ]
    const container = new THREE.Object3D()
    const settings = {
        metalness: 1.0,
        roughness: 0.4,
        ambientIntensity: 0.2,
        aoMapIntensity: 1.0,
        envMapIntensity: 1.0,
        displacementScale: 2.436143, // from original model
        normalScale: 1.0
    }
    const texture = Store.getTexture(id, 'bump')
    const geometry = new THREE.BoxGeometry( 100, 100, 100 )
    const material = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        map: texture
    })
    const cube = new THREE.Mesh( geometry, material )
    container.add(cube)
    const render = () => {
        cube.rotation.x += .01
        cube.rotation.y += .01
        cube.rotation.z += .01
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
