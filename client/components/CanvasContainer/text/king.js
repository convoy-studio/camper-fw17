import Store from '../../../store'
import dom from 'dom-hand'
import Utils from '../../../utils'
const shaderVx = require("../../../glsl/fur-vx.glsl")
const shaderFx = require("../../../glsl/fur-fx.glsl")

export default (id, props) => {
    const generateTexture = () => {
        var canvas = document.createElement( 'canvas' )
        canvas.width = 256
        canvas.height = 256
        var context = canvas.getContext( '2d' )
        for (var i = 0; i < 10000; i++) {
            // r = hair 1/0 g = length b = darkness
            context.fillStyle = 'rgba(255,' + Math.floor( Math.random() * 500 ) + ','+ Math.floor( Math.random() * 500 ) +',100)'
            context.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2)
        }
        return canvas
    }

    let scope
    let delta, time, oldTime
    let shaderTime = 0
    let meshes = []
    let mouse = new THREE.Vector2(-0.5, 0.5)
    let currentMouse = { x:0, y:0, vx:0, vy:0 }
    let gravity = new THREE.Vector3(0, -0.75, 0)
    const size = [ 700, 400 ]
    const container = new THREE.Object3D()
    const containerScale = 1.7
    container.scale.set(containerScale, containerScale, containerScale)
    container.position.set(0, -140, 0)
    container.visible = false

    // hair texture
    const texture = new THREE.Texture(generateTexture())
    texture.needsUpdate = true
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping

    // diffuse color
    const diffuseColor = Store.getTexture(id, 'diffuse')
    diffuseColor.wrapS = diffuseColor.wrapT = THREE.RepeatWrapping;

    const loader = new THREE.JSONLoader()
    loader.load(Store.baseMediaPath() + 'mesh/king.js', (geometry) => {
        const size = 0.06
        geometry.applyMatrix( new THREE.Matrix4().scale( new THREE.Vector3( size, size, size ) ) )
        createMeshes(geometry)
    })

    const createMeshes = (geometry) => {
        const shells = 20
        for (let i = 0; i < shells; i++) {
            const uniforms = {
                color: { type: 'c', value: new THREE.Color( 0x5C43CE ) },
                hairMap: { type: 't', value: texture },
                colorMap: { type: 't', value: diffuseColor },
                offset: { type: 'f', value: i / shells },
                globalTime: { type: 'f', value: shaderTime },
                gravity:  { type: 'v3', value: gravity }
            }
            const material = new THREE.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: shaderVx,
                fragmentShader: shaderFx,
                transparent: true
            })
            const mesh =  new THREE.Mesh(geometry, material)
            mesh.matrixAutoUpdate = false
            mesh.frustumCulled = false
            container.add(mesh)
            meshes.push(mesh)
            props.scene.add(container)
        }
    }
    const render = () => {
        if (meshes.length < 1) return
        time = Date.now()
        delta = time - oldTime
        oldTime = time
        if (isNaN(delta) || delta > 1000 || delta === 0 ) {
            delta = 1000 / 60
        }
        const optimalDivider = delta / 6
        const smoothing = Math.max(12, (20 / optimalDivider) )
        const xf = (Store.Mouse.nX - currentMouse.x) / (smoothing * 5)
        const yf = (Store.Mouse.nY - currentMouse.y) / (smoothing * 5)
        currentMouse.vx += xf
        currentMouse.vy += yf
        currentMouse.vx *= 0.96
        currentMouse.vy *= 0.94
        currentMouse.x += currentMouse.vx
        currentMouse.y += currentMouse.vy
        gravity.x = -(Store.Mouse.nX - currentMouse.x) * 2
        const dif = Math.sin(Store.Mouse.nX)*150 - props.camera.position.x
        gravity.y = -0.75 + (Math.abs(dif) / 150) - (Store.Mouse.nY - currentMouse.y) * 2
        container.rotation.x += 0.01 + ((Math.cos(Store.Mouse.nY) * 0.4) - container.rotation.x) / smoothing
        container.rotation.y += ((Math.sin(Store.Mouse.nX) * 0.3) - container.rotation.y) / smoothing
        container.rotation.z += ((Math.sin(Store.Mouse.nX) * 0.07) - container.rotation.z) / smoothing
        shaderTime += delta * 0.005
        for (let i = 0; i < meshes.length; i++) {
            meshes[i].material.uniforms.globalTime.value = shaderTime
        }
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
