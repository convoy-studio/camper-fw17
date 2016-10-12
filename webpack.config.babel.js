const rucksack = require('rucksack-css')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require('path')
const remove = require('remove')
const env = process.env.NODE_ENV

// Remove directories and files from old builds
// try { remove.removeSync('./www/css') } catch (err) { console.error(err) }
// try { remove.removeSync('./www/js') } catch (err) { console.error(err) }

const plugins = [
    new webpack.ProvidePlugin({
      THREE: "three"
    }),
    new ExtractTextPlugin("style.css", {
        allChunks: true
    }),
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
]

if (env === 'development') {
    plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', './vendor.bundle.js', Infinity))
}

if (env === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            output: {
                comments: false
            }
        })
    )
} 

let entry = undefined
if (env === 'production') {
    entry = {
        jsx: [
            'gsap',
            '../www/lib/easeljs-0.8.2.min.js',
            '../www/lib/preloadjs-0.6.2.min.js',
            '../www/lib/SplitText.min.js',
            './js/index.js'
        ]
    }
} else {
    entry = {
        jsx: ['./js/index.js'],
        vendor: [
            'gsap',
            '../www/lib/easeljs-0.8.2.min.js',
            '../www/lib/preloadjs-0.6.2.min.js',
            '../www/lib/SplitText.min.js'
        ]
    }
}
module.exports = {
    context: path.join(__dirname, './src'),
    externals: {
      'TweenLite': 'TweenLite',
      'createjs': 'createjs'
    },
    entry: entry,
    output: {
        path: ('./www'),
        filename: './bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader'])
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=font/[name].[ext]'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader'
                ]
            },
            {
                test: /\.glsl$/,
                loader: 'shader'
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-template-loader'
            }
        ]
    },
    node: {
        fs: 'empty' // avoids error messages
    },
    eslint: {
        configFile: '.eslintrc'
    },
    glsl: {
        chunkPath: __dirname + '/glsl'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    postcss: [
        rucksack({
            autoprefixer: true
        })
    ],
    plugins: plugins,
    devServer: {
        contentBase: './www',
        hot: true
    }
}
