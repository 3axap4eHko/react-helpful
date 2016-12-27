
const {optimize, DefinePlugin} = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    captureTimeout: 60000,
    browserNoActivityTimeout: 30000,
    module: {
        preLoaders: [
            { test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ }
        ],
        loaders: [
            {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new optimize.DedupePlugin(),
        new optimize.OccurenceOrderPlugin(),
        new DefinePlugin({
            '__DEV__': true,
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
    ]
};
