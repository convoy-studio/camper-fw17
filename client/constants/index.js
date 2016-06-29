export default {
    WINDOW_RESIZE: 'WINDOW_RESIZE',
    ROUTE_CHANGED: 'ROUTE_CHANGED',
    PAGE_ASSETS_LOADED: 'PAGE_ASSETS_LOADED',
    INITIAL_PAGE_ASSETS_LOADED: 'INITIAL_PAGE_ASSETS_LOADED',
    LOAD_NEXT_PREVIOUS_PAGE_ASSETS: 'LOAD_NEXT_PREVIOUS_PAGE_ASSETS',
    APP_START: 'APP_START',

    ORIENTATION: {
        LANDSCAPE: 'LANDSCAPE',
        PORTRAIT: 'PORTRAIT'
    },

    GROUP: {
        KING: 'king',
        ARMOUR: 'armour',
        DINO: 'dino',
        SPORT: 'sport'
    },

    PORTRAIT: 'PORTRAIT',
    PRODUCT: 'PRODUCT',

    FORWARD: 'FORWARD',
    BACKWARD: 'BACKWARD',

    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',

    PX_CONTAINER_IS_READY: 'PX_CONTAINER_IS_READY',
    PX_CONTAINER_ADD_CHILD: 'PX_CONTAINER_ADD_CHILD',
    PX_CONTAINER_REMOVE_CHILD: 'PX_CONTAINER_REMOVE_CHILD',

    PADDING_AROUND: 40,

    ENVIRONMENTS: {
        PREPROD: {
            static: 'http://localhost:3000/'
        },
        PROD: {
            static: JSUrlStatic + '/'
        }
    },

    MEDIA_GLOBAL_W: 1920,
    MEDIA_GLOBAL_H: 1080,

    MIN_MIDDLE_W: 960,
    MQ_XSMALL: 320,
    MQ_SMALL: 480,
    MQ_MEDIUM: 768,
    MQ_LARGE: 1024,
    MQ_XLARGE: 1280,
    MQ_XXLARGE: 1680
}
