module.exports = {
    chainWebpack: config => {
        config.performance
            .maxEntrypointSize(7000000000)
            .maxAssetSize(7000000000)
    },
}