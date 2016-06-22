const rucksack = require('rucksack-css')
const webpack = require('webpack')
const path = require('path')
const env = process.env.NODE_ENV
const plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
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
    context: path.join(__dirname, './client'),
    entry: {
        jsx: './index.js',
        html: './index.html',
        vendor: [
            'dom-hand',
            'crossroads',
            'eventemitter2',
            'flux',
            'hasher',
            'img',
            'is-retina',
            'mobile-detect',
            'object-assign',
            'to-slug-case',
            'gsap',
            'raf',
            'page'
        ]
    },
    output: {
        path: path.join(__dirname, './static'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.css$/,
                include: /client/,
                loaders: [
                    'style-loader',
                    'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'postcss-loader'
                ]
            },
            {
                test: /\.css$/,
                exclude: /client/,
                loader: 'style!css'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader'
                ]
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
        contentBase: './client',
        hot: true
    }
}
