
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path'); // to get the current path

module.exports = () => {

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
                    test: /\.(png|jp(e*)g|svg)$/,  
                    use: [{
                        loader: 'url-loader',
                        options: { 
                            limit: 8000, // Convert images < 8kb to base64 strings
                            name: 'images/[hash]-[name].[ext]'
                        } 
                    }]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.less', '.css']
        },
        plugins: [
            new HtmlWebpackPlugin({ title: 'MovieShiz', template: './index.html', inject: 'body', favicon: "./public/locales/icons/favi.png" })
        ],
        devServer: {
            open: true,
            compress: true,
            historyApiFallback: true,
            port: 3000
        }
    }
};
