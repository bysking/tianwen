import { Configuration } from "webpack";
const prodConfig = require("./webpack.prod.ts").default; // 引入打包配置
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 引入webpack打包速度分析插件
const smp = new SpeedMeasurePlugin(); // 实例化分析插件
const { merge } = require("webpack-merge"); // 引入合并webpack配置方法
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const cfg: Configuration = smp.wrap(
  merge(prodConfig, {
    plugins: [
      new BundleAnalyzerPlugin({
        // analyzerPort: 9999,
        // analyzerHost: "http://127.0.0.1",
        // analyzerMode: "server",
        analyzerMode: "static", // 生成静态分析页面
        openAnalyzer: true, // 是否打开分析页面
      }), // 配置分析打包结果插件
    ],
  })
);

module.exports = cfg;
