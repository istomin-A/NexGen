export default (env = {}, argv = { mode: 'development' }) => ({
    mode: argv.mode || 'development',
    output: {
        filename: 'app.min.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devtool: argv.mode === 'development' ? 'source-map' : false
});