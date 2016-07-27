const rucksack = require('rucksack-css')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require('path')
const remove = require('remove')
const env = process.env.NODE_ENV

// Remove directories and files from old builds
try { remove.removeSync('./www/css') } catch (err) { console.error(err) }
try { remove.removeSync('./www/js') } catch (err) { console.error(err) }

const plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', './js/vendor.bundle.js'),
    new ExtractTextPlugin("css/style.css", {
        allChunks: true
    }),
    new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
]
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
module.exports = {
    context: path.join(__dirname, './src'),
    entry: {
        jsx: './js/index.js',
        vendor: [
            'gsap'
        ]
    },
    output: {
        path: ('./www'),
        filename: './js/bundle.js'
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
