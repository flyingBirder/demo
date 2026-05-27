const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

const config = {
    // 模式
    // mode: 'development', // 开发模式
    // 入口文件
    // entry: path.resolve(__dirname, 'src/login/index.js'),
    entry: {
        login: path.resolve(__dirname, 'src/login/index.js'),
        content: path.resolve(__dirname, 'src/content/index.js'),
        publish: path.resolve(__dirname, 'src/publish/index.js'),
    },
    // 出口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './[name]/index.js',
        clean: true, // 生成打包后的内容之前，清理dist目录
    },
    // 插件 配置html-webpack-plugin插件: 为ebpack提供更多的功能
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/login.html'),// 模版文件路径
            filename: path.resolve(__dirname, 'dist/login/index.html'),// 输出文件路径
            useCdn: process.env.NODE_ENV === 'production', // 生产模式 下使用CDN引入的地址 
            chunks: ['login'], // 引入login入口文件 ，打包后，会自动引入login/index.js文件
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/content.html'),// 模版文件路径
            filename: path.resolve(__dirname, 'dist/content/index.html'),// 输出文件路径
            useCdn: process.env.NODE_ENV === 'production', // 生产模式下使用CDN引入的地址 
            chunks: ['content'], // 引入content入口文件 ，打包后，会自动引入content/index.js文件
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/publish.html'),// 模版文件路径
            filename: path.resolve(__dirname, 'dist/publish/index.html'),// 输出文件路径
            useCdn: process.env.NODE_ENV === 'production', // 生产模式下使用CDN引入的地址 
            chunks: ['publish'], // 引入publish入口文件 ，打包后，会自动引入publish/index.js文件
        }),
        // new MiniCssExtractPlugin({ filename: 'login/index.css' })  // 提取css代码到独立的文件中
        new MiniCssExtractPlugin({
            filename: './[name]/index.css',
        }),  // 提取css代码到独立的文件中
        new CssMinimizerPlugin(), // css代码压缩
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), // 定义NODE_ENV环境变量
        }),
    ],
    // 加载器 配置css-loader 和 style-loader 本地软件包, 让webpack拥有处理css文件的能力
    module: {
        rules: [
            {
                test: /\.css$/i,
                // use: ['style-loader', 'css-loader'],
                // use: [MiniCssExtractPlugin.loader, "css-loader"],  // 提取css代码到独立的文件中
                // 开发模式下，使用style-loader，生产模式下，使用MiniCssExtractPlugin.loader
                use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    // MiniCssExtractPlugin.loader,
                    // 开发模式下，使用style-loader，生产模式下，使用MiniCssExtractPlugin.loader
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'assets/[hash][ext][query]',
                },
            },
        ],
    },
    // 优化 配置css-minimizer-webpack-plugin插件，开启css代码压缩功能。
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释(保证js代码压缩不被禁用)
            `...`,
            new CssMinimizerPlugin(),
        ],
        splitChunks: {
            chunks: 'all', // 所有模块都进行代码分割
            cacheGroups: { // 分隔组
                commons: {// 抽取公共模块
                    minSize: 0, // 最小模块大小，单位字节
                    minChunks: 2,// 最小模块引用次数
                    reuseExistingChunk: true, // 重复使用已存在的模块
                    name(module, chunks, cacheGroupKey) {// 分离出公共模块的名称
                        const allChunksNames = chunks.map(item => item.name).join('~');// 
                        return `./js/${allChunksNames}`;// 输出到js目录下
                    }
                }

            },

        }
    },
    // 解析 配置resolve选项，指定模块的查找路径
    resolve: {
        //别名 配置resolve.alias选项，指定模块的查找路径
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

};
// 开发模式下，使用source-map 资源地图功能(使用webpack的source map功能用于代码调试)
if (process.env.NODE_ENV === 'development') {
    config.devtool = 'inline-source-map';
}
// 生产环境下，使用相关配置
if (process.env.NODE_ENV === 'production') {
    // 外部扩展 （webpack防止将import包被打包，直接从cdn引入）
    config.externals = {
        // key: import from 后面的字符串； value: 留在原地的环境变量（最好和cdn在全局暴露的变量名一致）
        'bootstrap/dist/css/bootstrap.min.css': 'bootstrap',
        'axios': 'axios',
        'form-serialize': 'serialize',
        '@wangeditor/editor': 'wangEditor',

    };
}
// 导出配置对象
module.exports = config;