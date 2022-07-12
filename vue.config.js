/* eslint-disable */
const path = require('path')
// gzip压缩
const CompressionPlugin = require('compression-webpack-plugin')
// webpack cdn 插件
const WebpackCdnPlugin = require('webpack-cdn-plugin')

// 处理路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

// CDN配置
const configCdn = require('./config/cdn.js')

// 判断是否是生产环境
let isProd = process.env.NODE_ENV == 'production' ? true : false

module.exports = {
  // eslint检测 默认是开启的
  lintOnSave: false,
  // 资源全局路径前缀
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  //静态资源目录(js,css,img,fonts)这些文件都可以写里面
  assetsDir: 'assets',
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 输出文件目录
  outputDir: 'dist',
  // webpack-dev-server 相关配置
  devServer: {
    // 设置主机地址
    host: '0.0.0.0',
    // 设置默认端口
    port: 8088,
    // 禁用host验证
    disableHostCheck: true,
    // 设置代理
    proxy: {
      [process.env.VUE_APP_API_PREFIX]: {
        // 目标 API 地址
        // 开发环境
        // target: "http://127.0.0.1:7001/api", // 后端测试api地址
        target: 'https://www.fastmock.site/mock/4065436981794d02775c54b5d2e22e74/common-test/api',
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点更改为目标URL(设置跨域)
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack() {
    const mergeConfig = {
      plugins: [
        // CDN导入加速
        new WebpackCdnPlugin(configCdn)
      ]
    }
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      console.log(`1.gzip压缩(需要nginx开启gzip)`)
      mergeConfig.plugins.push(
        new CompressionPlugin({
          // filename: "[path].gz[query]",
          // algorithm: "gzip",
          test: /\.js$|\.html$|\.css/,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      )
    }
    return mergeConfig
  },
  chainWebpack(config) {
    // 移除资源预加载(路由懒加载才能正常使用)
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 设置别名
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 通过 less 文件覆盖（文件路径为绝对路径
            hack: `true; @import "@/assets/css/theme-var.less";`
          }
        }
      },
      sass: {
        // 配置scss 全局样式文件 支持全局变量
        prependData: `@import "@/assets/css/common.scss";`
      }
    }
  }
}
