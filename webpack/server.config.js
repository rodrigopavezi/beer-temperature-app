const { NODE_ENV = 'production' } = process.env;

module.exports = {
    entry: './src/server/index.ts',
    mode: NODE_ENV,
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
        ],
    },
    output: {
        filename: './index.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
};
