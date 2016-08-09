const page = {
}

export default {
    'content': {
        'twitter_url': 'https://twitter.com/camper',
        'facebook_url': 'https://www.facebook.com/Camper',
        'instagram_url': 'https://instagram.com/camper/',
        'lab_url': 'http://www.camper.com/lab',
        'men_shop_url': 'http://www.camper.com/int/men/shoes/ss16_inspiration',
        'women_shop_url': 'http://www.camper.com/int/women/shoes/ss16_inspiration',
        'lang': {
            'en': {
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
                'visit': 'visit',
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Acheter',
                'shop_men': 'homme',
                'shop_women': 'femme',
                'map_txt': 'INDEX'
            },
            'es': {
                'visit': 'visit',
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Comprar',
                'shop_men': 'hombre',
                'shop_women': 'mujer',
                'map_txt': 'INDEX'
            },
            'it': {
                'visit': 'visit',
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Acquisiti',
                'shop_men': 'uomo',
                'shop_women': 'donna',
                'map_txt': 'INDEX'
            },
            'de': {
                'visit': 'visit',
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Shop',
                'shop_men': 'Herren',
                'shop_women': 'Damen',
                'map_txt': 'INDEX'
            },
            'pt': {
                'visit': 'visit',
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

    'default-route': '/king/fidelius',

    'groups': {
        king: {
            color: '#4700B3',
            colorIndex: '#160038',
            colorBackground: '#921438',
            spriteParams: {
                count: 15,
                framerate: 16
            },
            textures: [
                { name: 'diffuse', ext: 'jpg' }
            ]
        },
        armour: {
            color: '#A1A5B5',
            colorIndex: '#37383D',
            colorBackground: '#161D23',
            spriteParams: {
                count: 12,
                framerate: 16
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
                framerate: 16
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
                framerate: 16
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
        '/king/fidelius': page,
        '/king/wilma': page,
        '/armour/wilma-extreme': page,
        '/armour/gorka': page,
        '/dino/rex': page,
        '/dino/wilma-extreme': page,
        '/sport/marges': page,
        '/sport/bowie': page
    }
}
