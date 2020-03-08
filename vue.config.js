/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'docs',
  css: {
    loaderOptions: {
      less: { javascriptEnabled: true }
    }
  },
  devServer: {
    proxy: {
      '/list': {
        target: 'http://api.bilibili.cn/',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/list': ''
        }
      },
      '/userVideo': {
        target: 'https://space.bilibili.com/ajax/member/',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/userVideo': ''
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.devServer.disableHostCheck(true)
  }
}
