const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
const ProgressPlugin = require('webpack').ProgressPlugin;
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, './'),
    entry: {
        app: './main',
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, './dist/assets'),
    },

    devServer: {
        port: 3330,
        host: 'localhost',
        hotOnly: true,
        historyApiFallback: false,
    },

    devtool: "inline-source-map",

    resolve: {
        extensions: [".tsx", ".ts", ".json", ".js"],
        modules: [
            path.resolve(__dirname, './example'),
            'node_modules'
        ]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.(css|scss)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 25000,
                    },
                },
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html.ejs',
            inject: 'body',
        }),
        new HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {
                from: './assets',
                to: '../'
            }
        ]),
        new WebpackNotifierPlugin(),
        new ProgressPlugin()
    ],
};
