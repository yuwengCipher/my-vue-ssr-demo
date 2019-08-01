const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeEnvTag = process.env.WEBPACK_TARGET === 'node'
const isDev = process.env.NODE_ENV === 'development'
const target = nodeEnvTag ? 'server' : 'client'

module.exports = {
    publicPath: isDev ? './' : 'http://127.0.0.1:3001',
    productionSourceMap: false,
    configureWebpack: () => ({
        entry: `@/entry-${target}.js`,
        target: nodeEnvTag ? "node" : "web",
        devtool: 'source-map',
        output: {
            libraryTarget: nodeEnvTag ? "commonjs2" : undefined
        },
        externals: nodeEnvTag ? nodeExternals({
            whitelist: /\.css$/
        }) : undefined,

        optimization: {
            splitChunks: {
                chunks: "async",
                minSize: 30000,
                minChunks: 2,
                maxAsyncRequests: 5,
                maxInitialRequests: 3
            }
        },
        plugins: [
            nodeEnvTag ? new VueSSRServerPlugin() : new VueSSRClientPlugin()
        ]
    }),
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                return merge(options, {
                    optimizeSSR: false
                })
            })

        if (nodeEnvTag) {
            config.plugins.delete("hmr");
        }
    }
}