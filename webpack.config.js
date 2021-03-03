var path = require('path')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var webpack = require('webpack')

const publicPath = process.env.NODE_ENV === 'production' ? '/doctor/' : '/'

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: publicPath,
        filename: 'build.js'
    },
    module: {
        rules: [
            { 
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png)$/i,
                use: {
                    loader: 'url-loader'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.join(__dirname, './src/')
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'API_URL_AUTHENTICATION': JSON.stringify('https://emeci.com/doctorapi'),
            'API_URL': JSON.stringify('https://emeci.com/doctorapi/api'),
            'BASE_URL': JSON.stringify('/doctor')
        })
    ])
} else {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'API_URL_AUTHENTICATION': JSON.stringify('https://localhost:44323'),
            'API_URL': JSON.stringify('https://localhost:44323/api'),
            'BASE_URL': JSON.stringify('/')
        })
    ])
}