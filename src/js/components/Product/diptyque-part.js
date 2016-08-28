import Store from '../../store'
import Utils from '../../utils'
import Constants from '../../constants'
import dom from 'dom-hand'

export default (image, stage)=> {
    let scope
    let img = new createjs.Bitmap(image)
    let container = new createjs.Container()
    img.regX = (Constants.MEDIA_GLOBAL_W  / 2) / 2
    img.regY = (Constants.MEDIA_GLOBAL_H  / 2)
    container.addChild(img)
    stage.addChild(container)
    
    const update = (dir) => {
        const windowW = Store.Window.w
        const nX = (( ( Store.Mouse.x - ( windowW >> 1) ) / ( windowW >> 1 ) ) * 1) - 0.5
        const nY = Store.Mouse.nY - 0.5
        const newx = scope.iposition.x - (30 * nX) * dir
        const newy = scope.iposition.y - (30 * nY) * dir
        scope.position.x += (newx - scope.position.x) * 0.04
        scope.position.y += (newy - scope.position.y) * 0.04
        container.x = scope.position.x
        container.y = scope.position.y
    }

    const clear = () => {
        stage.removeChild(img)
        img = null
    }

    scope = {
        img,
        update,
        clear,
        container,
        iposition: { x: 0, y:0 },
        position: { x: 0, y:0 }
    }
    return scope
}