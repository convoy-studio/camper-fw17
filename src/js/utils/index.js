import Constants from '../constants'
import dom from 'dom-hand'

class Utils {
    static normalizeMouseCoords(e, objWrapper) {
        let posx = 0
        let posy = 0
        if (e.pageX || e.pageY) {
            posx = e.pageX
            posy = e.pageY
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
        objWrapper.x = posx
        objWrapper.y = posy
        return objWrapper
    }
    static resizePositionProportionally(windowW, windowH, contentW, contentH, orientation) {
        const aspectRatio = contentW / contentH
        let scale
        if (orientation !== undefined) {
            if (orientation === Constants.LANDSCAPE) {
                scale = (windowW / contentW) * 1
            } else {
                scale = (windowH / contentH) * 1
            }
        } else {
            scale = ((windowW / windowH) < aspectRatio) ? (windowH / contentH) * 1 : (windowW / contentW) * 1
        }
        const newW = contentW * scale
        const newH = contentH * scale
        const css = {
            width: newW,
            height: newH,
            left: (windowW >> 1) - (newW >> 1),
            top: (windowH >> 1) - (newH >> 1),
            scale: scale
        }
        return css
    }
    static tranformArrayFromMiddleAndOut(array) {
        var newArray = []
        var i = Math.ceil(array.length/2)
        var j = i - 1
        while(j >= 0) {
            newArray.push(array[j--])
            if(i < array.length) {
                newArray.push(array[i++])
            }
        }
        return newArray
    }
    static capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    static supportWebGL() {
        try {
            const canvas = document.createElement( 'canvas' )
            return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) )
        } catch ( e ) {
            return false
        }
    }
    static destroyVideo(video) {
        video.pause()
        video.src = ''
        const children = video.childNodes
        for (let i = 0; i < children.length; i++) {
            const child = children[i]
            child.setAttribute('src', '')
            // Wo.KINGS with a polyfill or use jquery
            dom.tree.remove(child)
        }
    }
    static destroyVideoTexture(texture) {
        const video = texture.baseTexture.source
        Utils.destroyVideo(video)
    }
    static rand(min, max, decimals) {
        const randomNum = Math.random() * (max - min) + min
        if (decimals === undefined) {
            return randomNum
        }
        const d = Math.pow(10, decimals)
        return ~~((d * randomNum) + 0.5) / d
    }
    static getImgUrlId(url) {
        const split = url.split('/')
        return split[split.length - 1].split('.')[0]
    }
    static style(div, style) {
        div.style.webkitTransform = style
        div.style.mozTransform    = style
        div.style.msTransform     = style
        div.style.oTransform      = style
        div.style.transform       = style
    }
    static translate(div, x, y, z) {
        if ('webkitTransform' in document.body.style || 'mozTransform' in document.body.style || 'oTransform' in document.body.style || 'transform' in document.body.style) {
            Utils.style(div, 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)')
        } else {
            div.style.top = y + 'px'
            div.style.left = x + 'px'
        }
    }
    static guiVec3(gui, folderName, vec3, offsetX, offsetY, offsetZ, opened = true) {
        const folder = gui.addFolder(folderName)
        folder.add(vec3, 'x', vec3.x - offsetX, vec3.x + offsetX).onChange((value) => { vec3.x = value })
        folder.add(vec3, 'y', vec3.y - offsetY, vec3.y + offsetY).onChange((value) => { vec3.y = value })
        folder.add(vec3, 'z', vec3.z - offsetZ, vec3.z + offsetZ).onChange((value) => { vec3.z = value })
        if (opened) folder.open()
    }
    static setupCanvas(params) {
        const stage = new createjs.Stage(params.element)
        stage.canvas.width = params.width
        stage.canvas.height = params.height
        // if (window.devicePixelRatio) {
        //     const canvas = stage.canvas
        //     // grab the width and height from canvas
        //     height = canvas.getAttribute('height')
        //     width = canvas.getAttribute('width')
        //     // reset the canvas width and height with window.devicePixelRatio applied
        //     canvas.setAttribute('width', Math.round(width * window.devicePixelRatio))
        //     canvas.setAttribute('height', Math.round( height * window.devicePixelRatio))
        //     // force the canvas back to the original size using css
        //     canvas.style.width = width + "px"
        //     canvas.style.height = height + "px"
        //     // set CreateJS to render scaled
        //     stage.scaleX = stage.scaleY = window.devicePixelRatio
        // }
        return stage
    }
    static setupAnimatedSprite(params) {
        params.framerate = params.framerate || 30
        params.regX = params.regX || 0
        params.regY = params.regY || 0
        const spriteSheet = new createjs.SpriteSheet({
            framerate: params.framerate,
            images: [ params.image ],
            frames: {
                width: params.width,
                height: params.height,
                regX: params.regX,
                regY: params.regX,
                count: params.count
            },
            animations: {
                run: [ 0, params.count - 1, "run" ]
            }
        });
        const sprite = new createjs.Sprite(spriteSheet, "run")
        if (params.paused) sprite.gotoAndStop(0)
        else sprite.gotoAndPlay(0)
        return sprite
    }
    static rect(top, right, bottom, left) {
        return 'rect(' + top + 'px,' + right + 'px,' + bottom + 'px,' + left + 'px)'
    }
    static cssToMatrix(element) {
        const computedStyle = window.getComputedStyle(element, null)
        let matrix = computedStyle.getPropertyValue('transform')
            || computedStyle.getPropertyValue('-moz-transform')
            || computedStyle.getPropertyValue('-webkit-transform')
            || computedStyle.getPropertyValue('-ms-transform')
            || computedStyle.getPropertyValue('-o-transform');
        let matrixValue = [];
        const matrixCopy = matrix.replace(/^\w*\(/, '').replace(')', '');
        matrixValue = matrixCopy.split(/\s*,\s*/);
        return matrixValue
    }
    static meshLoader(id, url, callback) {
        const loader = new THREE.JSONLoader()
        loader.load(url, (geometry) => {
            callback(id, geometry)
        })
    }
}

export default Utils
