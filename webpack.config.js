//Require modules
var path              = require("path");
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer      = require('autoprefixer');
var lostGrid          = require('lost');



//init
//Objects
var extractThemeCSS    = new ExtractTextPlugin('design/bundle.theme.styles.min.css');
var extractVendorCSSLp = new ExtractTextPlugin('design/index.vendor.styles.min.css');
//Variables
var entryPoints  = {};
var plugins      = [];
var devtoolValue = '';
var NODE_ENV     = process.env.NODE_ENV;


//Actions
//1
plugins.push(extractThemeCSS);
plugins.push(extractVendorCSSLp);
plugins.push(
    new webpack.ProvidePlugin({
        M:         'moduleMPath'
    })
);
//2
switch(NODE_ENV) {
    case 'development':
        devtoolValue = 'source-map';
        break;
    case 'production':
        devtoolValue = 'nosources-source-map';
        break;
}
//3
entryPoints  = {
    './bundles/index.bundle.js':            ['./index.jsx'],
    './design/index.vendor.scripts.min.js':  './components/vendor/lp/index.js'
};
//4
if (NODE_ENV === 'production') {
    var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

    plugins.push(
        new UglifyJsPlugin({
            sourceMap: true
        })
    );
}
//5
if (NODE_ENV === 'development') {
    var liveReloadString = 'webpack-dev-server/client?http://localhost:9000';

    for (var prop in entryPoints) {
        typeof entryPoints[prop] ===  "object" ? entryPoints[prop].unshift(liveReloadString) : true;
    }
}



module.exports = {
    devtool: false,

    context: __dirname + '/draft',
    entry: entryPoints,
    output: {
        path: __dirname + '/build',
        filename: '[name]',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: ['env', 'react'] }
                    }
                ]
            },
            {
                test: /components\/vendor\/?(?:[^\/]+\/?)*.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: ['env'] }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            symbolId: 'svg-symbol'
                        }
                    }
                ]
            },
            {
                test: /components\/theme\/?(?:[^\/]+\/?)*.styl$/,
                use: extractThemeCSS.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    // If you are having trouble with urls not resolving add this setting.
                                    // See https://github.com/webpack-contrib/css-loader#url
                                    url: false,
                                    minimize: true,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        autoprefixer({
                                            browsers:['ie >= 10', 'last 2 version']
                                        }),
                                        lostGrid

                                    ],
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'stylus-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    }
                )
            },
            {
                test: /components\/vendor\/lp\/?(?:[^\/]+\/?)*.css$/,
                use: extractVendorCSSLp.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    // If you are having trouble with urls not resolving add this setting.
                                    // See https://github.com/webpack-contrib/css-loader#url
                                    url: false,
                                    minimize: true,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        autoprefixer({
                                            browsers:['ie >= 10', 'last 2 version']
                                        })
                                    ],
                                    sourceMap: true
                                }
                            }
                        ]
                    }
                )
            }
        ]
    },
    resolve: {
        alias: {
            moduleMPath:         path.resolve(__dirname, './draft/components/vendor/lp/materialize1/materialize.js'),
        }
    },
    plugins: plugins,

    devServer: {
        host: 'localhost',
        port: 9000,
        contentBase: __dirname + '/build/',
        publicPath: '/',
        watchContentBase: true,
    }
};