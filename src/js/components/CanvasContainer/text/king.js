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
            context.fillStyle = 'rgba(255,' + Math.floor( Math.random() * 500 ) + ','+ Math.floor( Math.random() * 500 ) +',100)'
            context.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2)
        }
        return canvas
    }

    const normalScale = 1.6
    const indexScale = 0.47
    const normalPosY = -140
    const indexPosY = 300
    let scope
    let delta, time, oldTime
    let shaderTime = 0
    let meshes = []
    let mouse = new THREE.Vector2(-0.5, 0.5)
    let currentMouse = { x:0, y:0, vx:0, vy:0 }
    let gravity = new THREE.Vector3(0, -0.75, 0)
    const geometry = Store.Meshes['kings']
    const size = [ 700, 400 ]
    const container = new THREE.Object3D()
    container.scale.set(normalScale, normalScale, normalScale)
    container.position.set(0, normalPosY, 0)
    container.visible = false

    // hair texture
    const texture = new THREE.Texture(generateTexture())
    texture.needsUpdate = true
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping

    // diffuse color
    const diffuseColor = Store.getTexture(id, 'diffuse')
    diffuseColor.wrapS = diffuseColor.wrapT = THREE.RepeatWrapping;

    const createMeshes = () => {
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

    const geomScale = 0.06
    geometry.applyMatrix( new THREE.Matrix4().scale( new THREE.Vector3( geomScale, geomScale, geomScale ) ) )
    createMeshes()
    
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
        container.rotation.x += 0.01 + ((Math.cos(Store.Mouse.nY) * 0.4) - container.rotation.x) / smoothing
        container.rotation.y += ((Math.sin(Store.Mouse.nX) * 0.3) - container.rotation.y) / smoothing
        container.rotation.z += ((Math.sin(Store.Mouse.nX) * 0.07) - container.rotation.z) / smoothing
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
        if (meshes.length === 0) return
        if (Store.IndexIsOpened) {
            container.scale.set(indexScale, indexScale, indexScale)
            container.position.y = indexPosY
        } else {
            container.scale.set(normalScale, normalScale, normalScale)
            container.position.y = normalPosY
        }
    }
    const updateStyle = (id) => {
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
