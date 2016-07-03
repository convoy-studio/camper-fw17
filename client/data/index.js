const page = {
    product: {
    },
    portrait: {
    }
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
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Shop',
                'shop_men': 'Men',
                'shop_women': 'Women',
                'map_txt': 'INDEX'
            },
            'fr': {
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Acheter',
                'shop_men': 'homme',
                'shop_women': 'femme',
                'map_txt': 'INDEX'
            },
            'es': {
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Comprar',
                'shop_men': 'hombre',
                'shop_women': 'mujer',
                'map_txt': 'INDEX'
            },
            'it': {
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Acquisiti',
                'shop_men': 'uomo',
                'shop_women': 'donna',
                'map_txt': 'INDEX'
            },
            'de': {
                'home': 'INDEX',
                'lab': 'LAB',
                'camper_lab': 'Camper Lab',
                'shop_title': 'Shop',
                'shop_men': 'Herren',
                'shop_women': 'Damen',
                'map_txt': 'INDEX'
            },
            'pt': {
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

    'home-videos': [
        'deia-dub.mp4',
        'deia-mateo.mp4',
        'deia-marta.mp4',
        'es-trenc-isamu.mp4',
        'es-trenc-beluga.mp4',
        'arelluf-capas.mp4',
        'arelluf-pelotas.mp4',
        'arelluf-marta.mp4',
        'arelluf-kobarah.mp4',
        'arelluf-dub.mp4',
        'arelluf-paradise.mp4'
    ],

    'default-route': '/king/fidelius',

    'groups': {
        king: {
            color: '#4700B3',
            textures: [
                { name: 'bump', ext: 'jpg' },
                { name: 'diffuse', ext: 'jpg' },
                { name: 'roughness', ext: 'jpg' }
            ]
        },
        armour: {
            color: '#A1A5B5',
            textures: [
                { name: 'bump', ext: 'jpg' },
                { name: 'diffuse', ext: 'jpg' },
                { name: 'roughness', ext: 'jpg' }
            ]
        },
        dino: {
            color: '#CFEF33',
            textures: [
                { name: 'displacement', ext: 'png' },
                { name: 'normal', ext: 'png' },
                { name: 'specular', ext: 'png' },
                { name: 'color', ext: 'png' },
                { name: 'ao', ext: 'png' },
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
            textures: [
                { name: 'bump', ext: 'jpg' },
                { name: 'diffuse', ext: 'jpg' },
                { name: 'roughness', ext: 'jpg' }
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
