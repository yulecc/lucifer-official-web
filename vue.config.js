/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath:
        process.env.NODE_ENV === 'production' ? '/lucifer-official-web/' : '/',
    outputDir: 'docs',
    css: {
        loaderOptions: {
            less: { javascriptEnabled: true }
        }
    },
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'));
        config.devServer.disableHostCheck(true);
    }
};
