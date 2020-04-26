// const path = require("path");
// const UglifyPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/oh-qas/" : "/", // 基本路径
  outputDir: "oh-production", // 输出文件目录
  // lintOnSave: false, // eslint-loader 是否在保存的时候检查
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // webpack配置
  // chainWebpack: config => {
  //   // 压缩代码
  //   config.optimization.minimize(true);
  //   // 分割代码
  //   config.optimization.splitChunks({
  //     chunks: "all"
  //   });
  //   //   output: {
  //   //     // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
  //   //     filename: `js/[name].${Timestamp}.js`,
  //   //     chunkFilename: `js/[name].${Timestamp}.js`
  //   //   }
  //   // 用cdn方式引入
  //   config.externals({
  //     T: "T" // 天地图
  //     // vue: "Vue",
  //     // vuex: "Vuex",
  //     // "vue-router": "VueRouter",
  //     // axios: "axios",
  //     // "element-ui": "ELEMENT",
  //     // echarts: "echarts"
  //   });
  // },
  configureWebpack: config => {
    config["externals"] = {
      T: "T"
    };
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace("@", "")}`;
              }
            }
          }
        }
        // minimizer: [
        //   new UglifyPlugin({
        //     uglifyOptions: {
        //       compress: {
        //         warnings: false,
        //         drop_console: true, // console
        //         drop_debugger: false,
        //         pure_funcs: ["console.log"] // 移除console
        //       }
        //     }
        //   })
        // ]
      };
      Object.assign(config, {
        optimization
      });
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
    // Object.assign(config, {
    // 开发生产共同配置
    // resolve: {
    // alias: {
    // "@": path.resolve(__dirname, "./src")
    // "@c": path.resolve(__dirname, "./src/components"),
    // "@p": path.resolve(__dirname, "./src/pages")
    // } // 别名配置
    // }
    // });
    // 用cdn方式引入
    // config.externals({
    //   T: "T" // 天地图
    //   // vue: "Vue",
    //   // vuex: "Vuex",
    //   // "vue-router": "VueRouter",
    //   // axios: "axios",
    //   // "element-ui": "ELEMENT",
    //   // echarts: "echarts"
    // });
    const plugins = [];

    // Begin 生成 gzip 压缩文件
    plugins.push(
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8
      })
    );
    // End 生成 gzip 压缩文件

    config.plugins = [...config.plugins, ...plugins];
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      css: {}, // 这里的选项会传递给 css-loader
      postcss: {} // 这里的选项会传递给 postcss-loader
    }, // css预设器配置项
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0", // 允许外部ip访问
    port: 3333, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    proxy: {
      "/api": {
        target: "http://www.baidu.com/api",
        changeOrigin: true, // 允许websockets跨域
        // ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    } // 代理转发配置，用于调试环境
  },
  // 第三方插件配置
  pluginOptions: {}
};
