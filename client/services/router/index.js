import Actions from '../../actions'
import Store from '../../store'
import data from '../../data'
import Constants from '../../constants'
import page from 'page'
import routerStore from './store'

class Router {
    init() {
        this.onParseUrl = this.onParseUrl.bind(this)
        this.routing = data.routing
        this.baseName = '/group/'
        this.firstPass = true
        this.newHashFounded = false
        this.setupRoutes()
        this.setupPage()
        setTimeout(() => {
            page('/group/deia/marta')
        }, 4000)
    }
    beginRouting() {
        page()
    }
    setupPage() {
        let url = this.baseName + '*'
        page(url, this.onParseUrl)
    }
    onParseUrl(ctx) {
        // Swallow the action if we are alredy on that url
        if (routerStore.newHash !== undefined) {
            if (routerStore.newHash.hash === ctx.path) return
        }
        this.newHashFounded = false
        routerStore.ctx = ctx
        this.newHashFounded = this.routeValidation()
        // If URL don't match a pattern, send to default
        if (!this.newHashFounded) {
            this.onDefaultURLHandler()
            return
        }
        this.assignRoute()
    }
    routeValidation() {
        for (let i = 0; i < routerStore.routes.length; i++) {
            let route = routerStore.routes[i]
            if (route === routerStore.ctx.path) {
                return true
            }
        }
        return false
    }
    onDefaultURLHandler() {
        this.sendToDefault()
    }
    assignRoute() {
        const hash = routerStore.ctx.path
        const parts = this.getURLParts(routerStore.ctx.path)
        this.updatePageRoute(hash, parts, parts[0], (parts[1] === undefined) ? '' : parts[1])
    }
    getURLParts(url) {
        const hash = url
        const split = hash.split('/')
        let parts = []
        split.forEach((part) => {
            if (part.length > 1) parts.push(part)
        })
        return parts
    }
    updatePageRoute(hash, parts, parent, target) {
        routerStore.oldHash = routerStore.newHash
        routerStore.newHash = {
            hash: hash,
            parts: parts,
            parent: parent,
            target: target
        }
        routerStore.newHash.type = routerStore.newHash.hash === '' ? Constants.HOME : Constants.ABOUT
        // // If first pass send the action from App.js when all assets are ready
        // if(this.firstPass) {
        //  this.firstPass = false
        // }else{
        //  Actions.pageHasherChanged()
        // }
        Actions.pageHasherChanged()
    }
    sendToDefault() {
        page(Store.defaultRoute())
    }
    setupRoutes() {
        routerStore.routes = []
        let i = 0, k
        const baseName = this.baseName
        for (k in this.routing) {
            let portraitUrl = baseName + k
            let productUrl = baseName + k + '/product'
            routerStore.routes.push(portraitUrl, productUrl)
            i++
        }
    }
    static getBaseURL() {
        return document.URL.split('#')[0]
    }
    static getHash() {
        return routerStore.ctx.path
    }
    static getRoutes() {
        return routerStore.routes
    }
    static getNewHash() {
        return routerStore.newHash
    }
    static getOldHash() {
        return routerStore.oldHash
    }
    static setHash(url) {
        page(url)
    }
}

export default Router
