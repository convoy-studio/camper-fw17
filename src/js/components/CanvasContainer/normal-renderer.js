import Utils from '../../utils'
import Store from '../../store'
import Constants from '../../constants'
import dom from 'dom-hand'

class NormalRenderer {
    init(parent) {
    	this.parent = parent
    	this.buttonsContainer = dom.select('.buttons-container', this.parent)

    	const element = document.createElement('canvas')
    	this.tl = new TimelineMax()
    	dom.tree.add(parent, element)
        const params = {
            element: element,
            width: Constants.TITLE_W,
            height: Constants.TITLE_H
        }
        this.stage = Utils.setupCanvas(params)

        this.sprites = []
        const allGroups = Store.getAllGroups()
        const baseUrl = Store.baseMediaPath()
        allGroups.forEach((group) => {
        	const url = baseUrl + 'media/group/' + group + '/common/title.png'
        	const img = new createjs.Bitmap(url)
        	img.regX = Constants.TITLE_W / 2
        	img.regY = Constants.TITLE_H / 2
        	img.x = Constants.TITLE_W / 2
        	img.y = Constants.TITLE_H / 2
	        img.group = group
        	this.stage.addChild(img)
        	this.sprites.push({
        		img,
        		group
        	})
        })
        this.resize()
    }
    render() {
    	this.stage.update()
    }
    open() {
    	TweenMax.to(this.stage.canvas, 0.5, { scaleX:1, scaleY:1, opacity:1, ease:Expo.easeOut })
    }
    close() {
    	TweenMax.to(this.stage.canvas, 0.7, { scaleX:3, scaleY:0.1, opacity:0, ease:Expo.easeOut })
    }
    openIndex() {
    	this.resize()
    	this.sprites.forEach((sprite) => {
    		sprite.img.alpha = 1
    		sprite.img.scaleX = sprite.img.scaleY = 0.4
    	})
    	const size = dom.size(this.stage.canvas)
    	const itemH = this.resizeVars.height / this.sprites.length
    	this.sprites[0].img.y = (Constants.TITLE_H / 2) - (Constants.TITLE_H * 0.32)
    	this.sprites[1].img.y = (Constants.TITLE_H / 2) - (Constants.TITLE_H * 0.1)
    	this.sprites[2].img.y = (Constants.TITLE_H / 2) + (Constants.TITLE_H * 0.2)
    	this.sprites[3].img.y = (Constants.TITLE_H / 2) + (Constants.TITLE_H * 0.4)
    }
    closeIndex() {
    	this.updateStage()
    	this.resize()
    }
    updateStage() {
    	const currentGroup = Store.getCurrentGroup()
    	this.sprites.forEach((sprite) => {
    		sprite.img.alpha = 0
    		sprite.img.scaleX = sprite.img.scaleY = 1
    		sprite.img.y = Constants.TITLE_H / 2
    		if (currentGroup === sprite.group) this.currentText = sprite
    	})
    	this.currentText.img.alpha = 1
    }
    resize() {

    	const windowW = Store.Window.w
        const windowH = Store.Window.h
        const size = [Constants.TITLE_W, Constants.TITLE_H]
        let viewportScale
        let canvasSize
        if (Store.IndexIsOpened) {
            canvasSize = [ 1000, windowH ]
            viewportScale = 0.8
        } else {
            canvasSize = [ size[0], size[1] ]
            viewportScale = 0.4
        }
        const viewportW = windowW * viewportScale
        const viewportH = windowH * viewportScale
        this.resizeVars = Utils.resizePositionProportionally(viewportW, viewportH, Constants.TITLE_W, Constants.TITLE_H, Constants.ORIENTATION.LANDSCAPE)
        const canvasW = this.resizeVars.width
        const canvasH = this.resizeVars.height
        const canvas = this.stage.canvas
        canvas.style.width = canvasW + 'px'
        canvas.style.height = canvasH + 'px'
        canvas.style.position = 'absolute'

        setTimeout(() => {
        	this.buttonsContainer.style.zIndex = 2
	        this.buttonsContainer.style.width = canvasW + 'px'
	        this.buttonsContainer.style.height = canvasH + 'px'
	        this.buttonsContainer.style.top = canvas.style.top
	        this.buttonsContainer.style.left = canvas.style.left
        }, 300)
        if (Store.IndexIsOpened) {
            canvas.style.left = (windowW >> 1) - (canvasW >> 1) + 'px'
            canvas.style.top = (windowH >> 1) - (canvasH >> 1) + 'px'
        } else {
            canvas.style.left = (windowW >> 1) - (canvasW >> 1) + 'px'
            canvas.style.top = windowH - canvasH + 'px'
        }
    }
}

export default NormalRenderer
