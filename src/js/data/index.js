export default {
    'content': {
        'twitter_url': 'https://twitter.com/camper',
        'facebook_url': 'https://www.facebook.com/Camper',
        'instagram_url': 'https://instagram.com/camper/',
        'lab_url': 'http://www.camper.com/lab',
        'men_shop_url': 'http://www.camper.com/int/men/shoes/fw16_inspiration',
        'women_shop_url': 'http://www.camper.com/int/women/shoes/fw16_inspiration',
        'lang': {
            'en': {
                'discover': 'discover',
                'visit': 'visit',
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Shop',
                'shop_men': 'Men',
                'shop_women': 'Women',
                'map_txt': 'INDEX'
            },
            'fr': {
                'discover': 'découvrir',
                'visit': 'visite',
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Acheter',
                'shop_men': 'homme',
                'shop_women': 'femme',
                'map_txt': 'INDEX'
            },
            'es': {
                'discover': 'descubrir',
                'visit': 'visitar',
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Comprar',
                'shop_men': 'hombre',
                'shop_women': 'mujer',
                'map_txt': 'INDEX'
            },
            'it': {
                'discover': 'scoprire',
                'visit': 'visita',
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Acquisti',
                'shop_men': 'uomo',
                'shop_women': 'donna',
                'map_txt': 'INDEX'
            },
            'de': {
                'discover': 'entdecken',
                'visit': 'besuch',
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Shop',
                'shop_men': 'Herren',
                'shop_women': 'Damen',
                'map_txt': 'INDEX'
            },
            'pt': {
                'discover': 'descobrir',
                'visit': 'visita',
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Compre',
                'shop_men': 'Homen',
                'shop_women': 'Mulher',
                'map_txt': 'INDEX'
            }
        }
    },

    'langs': ['en', 'fr', 'es', 'it', 'de', 'pt'],

    'default-route': '/kings/fidelius',

    'groups': {
       kings: {
            color: '#4700B3',
            colorIndex: '#160038',
            colorBackground: '#921438',
            spriteParams: {
                count: 15,
                framerate: 15
            },
            textures: [
                { name: 'diffuse', ext: 'jpg' }
            ]
        },
        armours: {
            color: '#A1A5B5',
            colorIndex: '#37383D',
            colorBackground: '#161D23',
            spriteParams: {
                count: 11,
                framerate: 15
            },
            textures: [
                { name: 'normal', ext: 'jpg' },
                { name: 'specular', ext: 'jpg' },
                { name: 'px', ext: 'jpg' }
            ]
        },
        dino: {
            color: '#CFEF33',
            colorIndex: '#292F0A',
            colorBackground: '#272B1D',
            spriteParams: {
                count: 12,
                framerate: 15
            },
            textures: [
                { name: 'displacement', ext: 'png' },
                { name: 'normal', ext: 'png' },
                { name: 'nx', ext: 'jpg' },
                { name: 'ny', ext: 'jpg' },
                { name: 'nz', ext: 'jpg' },
                { name: 'px', ext: 'jpg' },
                { name: 'py', ext: 'jpg' },
                { name: 'pz', ext: 'jpg' }
            ]
        },
        sport: {
            color: '#FF9F00',
            colorIndex: '#382300',
            colorBackground: '#896A4D',
            spriteParams: {
                count: 12,
                framerate: 15
            },
            textures: [
                { name: 'displacement', ext: 'jpg' },
                { name: 'normal', ext: 'jpg' },
                { name: 'specular', ext: 'jpg' },
                { name: 'nx', ext: 'png' },
                { name: 'ny', ext: 'png' },
                { name: 'nz', ext: 'png' },
                { name: 'px', ext: 'png' },
                { name: 'py', ext: 'png' },
                { name: 'pz', ext: 'png' }
            ]
        }
    },

    'routing': {
        '/kings/fidelius': {
            colors: {
                background: '#d29b36',
                index: '#4700B3'
            },
            shop_url: 'http://www.camper.com/int/men/shoes/kings'
        },
        '/kings/wilma': {
            colors: {
                background: '#921438',
                index: '#4700B3'
            },
            shop_url: 'http://www.camper.com/int/women/shoes/kings'
        },
        '/armours/wilma-extreme': {
            colors: {
                background: '#161D23',
                index: '#1660C0'
            },
            shop_url: 'http://www.camper.com/int/women/shoes/armours'
        },
        '/armours/gorka': {
            colors: {
                background: '#161D23',
                index: '#1660C0'
            },
            shop_url: 'http://www.camper.com/int/men/shoes/armours'
        },
        '/dino/rex': {
            colors: {
                background: '#272B1D',
                index: '#ABEF33'
            },
            shop_url: 'http://www.camper.com/int/men/shoes/dino'
        },
        '/dino/wilma-extreme': {
            colors: {
                background: '#272B1D',
                index: '#D33394'
            },
            shop_url: 'http://www.camper.com/int/women/shoes/dino'
        },
        '/sport/marges': {
            colors: {
                background: '#281942',
                index: '#FF9F00'
            },
            shop_url: 'http://www.camper.com/int/men/shoes/sport'
        },
        '/sport/bowie': {
            colors: {
                background: '#896A4D',
                index: '#FF9F00'
            },
            shop_url: 'http://www.camper.com/int/women/shoes/sport'
        }
    }
}
