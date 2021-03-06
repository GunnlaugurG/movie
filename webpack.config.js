
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const path = require('path'); // to get the current path

module.exports = (env) => {

    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.join(__dirname);

    // Create the fallback path (the production .env)
    const basePath = currentPath + '/.env';

    // We're concatenating the environment name to our filename to specify the correct env file!
    const envPath = basePath + '.' + env.ENVIRONMENT;

    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    // Set the path parameter in the dotenv config
    const fileEnv = dotenv.config({ path: finalPath }).parsed;

    // reduce it to a nice object, the same as before (but with the variables from the file)
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});
    return {

        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        module: {
            rules: [
                { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
                {
                    test: /\.less$/,
                    use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }]
                },
                {
                    test: /\.css$/,
                    use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }]
                },
                {
                  test: /\.(png|svg|jpg|gif)$/,
                  use: [
                    'file-loader',
                  ],
                },
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.less', '.css', 'png']
        },
        plugins: [
            new HtmlWebpackPlugin({ title: 'IceMovies', template: './index.html', inject: 'body', favicon: "./src/icons/favi.png" }),
            new webpack.DefinePlugin(envKeys)
        ],
        devServer: {
            open: true,
            compress: true,
            historyApiFallback: true,
            port: 3000
        }
    }
};
