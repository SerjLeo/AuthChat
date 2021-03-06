const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './script/app.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Webpack',
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test:/\.(png|jpg|svg|jpeg)$/,
                use: ['file-loader']
            },
            {
                test:/\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test:/\.csv$/,
                use: ['csv-loader']
            }
        ]
    }
}