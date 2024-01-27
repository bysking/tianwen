import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const path = require("path");
import * as dotenv from "dotenv";

const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;
const lessRegex = /\.less$/;

const styleLoadersArray = [
  "style-loader",
  {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: "[path][name]__[local]--[hash:5]",
      },
    },
  },
  "postcss-loader",
];

// 加载配置文件
const envConfig = dotenv.config({
  path: path.resolve(__dirname, "../env/.env." + process.env.BASE_ENV),
});

const baseConfig: Configuration = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  // 打包出口文件
  output: {
    filename: "static/js/[name].js", // 每个输出js的名称
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
    assetModuleFilename: "images/[hash][ext][query]", // 这里自定义输出文件名的方式是，将某些资源发送到指定目录
  },
  // loader 配置
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: cssRegex, //匹配 css 文件
        use: styleLoadersArray,
      },
      {
        test: lessRegex,
        use: [
          ...styleLoadersArray,
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                // 如果要在less中写类型js的语法，需要加这一个配置
                javascriptEnabled: true,
                modules: true,
              },
            },
          },
        ],
      },
      {
        test: sassRegex,
        use: [...styleLoadersArray, "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 小于10kb转base64
          },
        },
        generator: {
          filename: "static/images/[hash][ext][query]", // 文件输出目录和命名
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".css"],
    // 别名需要配置两个地方，这里和 tsconfig.json
    alias: {
      "@": path.join(__dirname, "../src"),
    },
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
      title: "webpack5-react-ts",
      filename: "index.html",
      template: path.join(__dirname, "../public/index.html"),
      inject: true, // 自动注入静态资源
      hash: true,
      cache: false,
      // 压缩html资源
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true, //去空格
        removeComments: true, // 去注释
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true, // 缩小CSS样式元素和样式属性
      },
      nodeModules: path.resolve(__dirname, "../node_modules"),
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(envConfig.parsed),
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

export default baseConfig;
