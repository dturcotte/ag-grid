const merge = require('webpack-merge');
const common = require('./common');

const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
    entry: {
        site: ['./src/_assets/ts/site', 'webpack-hot-middleware/client?path=/dist/__webpack_hmr&reload=true'],
        'vanilla-to-angular': [ './src/example-runner/vanilla-to-angular' ],
        'vanilla-to-react': [ './src/example-runner/vanilla-to-react' ]
    },
    output: {
        publicPath: '/',
        hotUpdateChunkFilename: 'dist/[hash].hot-update.js',
        hotUpdateMainFilename: 'dist/[hash].hot-update.json'
    },

    plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
});
