// const CompressionWebpackPlugin = require('compression-webpack-plugin');
// const productionGzipExtensions = ['js', 'css'];
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: "/",
    // pluginOptions: {
    //     'style-resources-loader': {
    //         preProcessor: 'less',
    //         patterns: [path.resolve(__dirname, 'src/assets/theme/index.less')] // 引入全局样式变量
    //     }
    // },
    outputDir: "dist",
    lintOnSave: false, //eslint代码检测
    assetsDir: "static", //放静态资源的目录
    devServer: {
        open: false, //设置自动打开
        host: "0.0.0.0",
        port: 8080,
        disableHostCheck: true,
        hot: true, //hot配置是否启用模块的热替换功能 实时刷新
    },
    //配置webpack选项
    configureWebpack: config => {
        if (process.env.NODE_ENV === "development") {
            config.devtool = 'source-map'
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("views", resolve("src/views"))
            .set("assets", resolve("src/assets"))
            .set("components", resolve("src/components"))
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        }
    }
}