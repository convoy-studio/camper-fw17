import Store from '../../../store'
import Constants from '../../../constants'

export default (props)=> {
    let scope
    const size = [ 500, 300 ]
    const settings = {
        metalness: 1.0,
        roughness: 0.4,
        ambientIntensity: 0.2,
        aoMapIntensity: 1.0,
        envMapIntensity: 1.0,
        displacementScale: 2.436143, // from original model
        normalScale: 1.0
    }
    const texture = Store.getTexture(Constants.GROUP.ARMOUR, 'bump')
    console.log(texture)
    const render = () => {
    }
    const update = () => {
    }
    const resize = () => {
    }
    scope = {
        size,
        update,
        resize,
        render
    }
    return scope
}
