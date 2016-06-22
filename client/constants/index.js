export default {
    WINDOW_RESIZE: 'WINDOW_RESIZE',
    PAGE_HASHER_CHANGED: 'PAGE_HASHER_CHANGED',
    PAGE_ASSETS_LOADED: 'PAGE_ASSETS_LOADED',
    APP_START: 'APP_START',

    LANDSCAPE: 'LANDSCAPE',
    PORTRAIT: 'PORTRAIT',

    FORWARD: 'FORWARD',
    BACKWARD: 'BACKWARD',

    HOME: 'HOME',
    ABOUT: 'ABOUT',

    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',

    INTERACTIVE: 'INTERACTIVE',
    TRANSITION: 'TRANSITION',

    OPEN_FEED: 'OPEN_FEED',
    OPEN_GRID: 'OPEN_GRID',

    PX_CONTAINER_IS_READY: 'PX_CONTAINER_IS_READY',
    PX_CONTAINER_ADD_CHILD: 'PX_CONTAINER_ADD_CHILD',
    PX_CONTAINER_REMOVE_CHILD: 'PX_CONTAINER_REMOVE_CHILD',

    OPEN_FUN_FACT: 'OPEN_FUN_FACT',
    CLOSE_FUN_FACT: 'CLOSE_FUN_FACT',

    CELL_MOUSE_ENTER: 'CELL_MOUSE_ENTER',
    CELL_MOUSE_LEAVE: 'CELL_MOUSE_LEAVE',

    HOME_VIDEO_SIZE: [ 640, 360 ],
    HOME_IMAGE_SIZE: [ 360, 360 ],

    ITEM_IMAGE: 'ITEM_IMAGE',
    ITEM_VIDEO: 'ITEM_VIDEO',

    GRID_ROWS: 4,
    GRID_COLUMNS: 7,

    PADDING_AROUND: 40,
    SIDE_EVENT_PADDING: 120,

    ENVIRONMENTS: {
        PREPROD: {
            static: ''
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
