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
        this.baseName = ''
        this.firstPass = true
        this.newRouteFounded = false
        this.setupRoutes()
        this.setupPage()
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
        if (routerStore.newRoute !== undefined) { if (this.areSimilarURL(routerStore.newRoute.path, ctx.path)) return }
        this.newRouteFounded = false
        routerStore.ctx = ctx
        this.newRouteFounded = this.routeValidation()
        // If URL don't match a pattern, send to default
        if (!this.newRouteFounded) {
            this.onDefaultURLHandler()
            return
        }
        this.assignRoute()
    }
    areSimilarURL(previous, next) {
        let bool = false
        if (previous === next) bool = true
        return bool
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
        const path = routerStore.ctx.path
        const parts = this.getURLParts(routerStore.ctx.path)
        this.updatePageRoute(path, parts, parts[0], (parts[1] === undefined) ? '' : parts[1])
    }
    getURLParts(url) {
        const path = url
        const split = path.split('/')
        let parts = []
        split.forEach((part) => { if (part.length > 1) parts.push(part) })
        return parts
    }
    updatePageRoute(path, parts, parent, target) {
        routerStore.oldRoute = routerStore.newRoute
        routerStore.newRoute = { path, parts, parent, target }
        routerStore.newRoute.type = routerStore.newRoute.parts.length === 3 ? Constants.PRODUCT : Constants.PORTRAIT
        // If first pass send the action from App.js when all assets are ready
        if (this.firstPass) {
            this.firstPass = false
        } else {
            Actions.routeChanged()
        }
    }
    sendToDefault() {
        page(Store.defaultRoute())
    }
    setupRoutes() {
        routerStore.routes = []
        routerStore.portraitRoutes = []
        let i = 0, k
        const baseName = this.baseName
        for (k in this.routing) {
            if ({}.hasOwnProperty.call(this.routing, k)) {
                let portraitUrl = baseName + k
                let productUrl = baseName + k + '/product'
                routerStore.portraitRoutes.push(portraitUrl)
                routerStore.routes.push(portraitUrl, productUrl)
                i++
            }
        }
    }
    static getBaseURL() {
        return document.URL.split('#')[0]
    }
    static getRoute() {
        return routerStore.ctx.path
    }
    static getRoutes() {
        return routerStore.routes
    }
    static getPortraitRoutes() {
        return routerStore.portraitRoutes
    }
    static getNewRoute() {
        return routerStore.newRoute
    }
    static getOldRoute() {
        return routerStore.oldRoute
    }
    static setRoute(path) {
        page(path)
    }
}

export default Router
