const Timestamp = new Date().getTime();
module.exports = {
  // 设置输出路径
  // outputDir: "../oh-qas-web/src/main/resources/static",
  outputDir: "oh-production",
  // webpack 配置
  chainWebpack: config => {
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
      chunks: "all"
    });
    //   output: {
    //     // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
    //     filename: `js/[name].${Timestamp}.js`,
    //     chunkFilename: `js/[name].${Timestamp}.js`
    //   }
    // 用cdn方式引入
    // config.externals({
    //   T: "T", // 天地图
    //   vue: "Vue",
    //   vuex: "Vuex",
    //   "vue-router": "VueRouter",
    //   axios: "axios",
    //   "element-ui": "ELEMENT",
    //   echarts: "echarts"
    // });
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // configureWebpack: {
  //   externals: {
  //     T: "T",
  //     jquery: "jquery"
  //   },
  //   output: {
  //     // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
  //     filename: `js/[name].${Timestamp}.js`,
  //     chunkFilename: `js/[name].${Timestamp}.js`
  //   }
  // },
  // 配置本地启动服务端口号
  // http://10.10.7.22:8081/oh-qas/_data/base/operator/getUserSeesion
  devServer: {
    port: "3333", //本地服务代理端口
    open: false, //项目启动时是否自动打开浏览器，设置为false不打开，true表示打开
    proxy: {
      "/admin": {
        //代理api
        target: "http://10.10.7.22:8081/oh-qas", //本地服务器api地址
        changeOrigin: true, //是否跨域
        ws: false, // proxy websockets
        pathRewrite: {
          //重写路径,本地代理地址替代服务端地址
          "^/admin": ""
        }
      }
    }
  },
  productionSourceMap: false, // 设置上线后是否加载webpack文件
  lintOnSave: true, //保存即用eslint格式化代码
  // 配置线上生产环境打包项目地址
  publicPath: process.env.NODE_ENV === "production" ? "/oh-qas/" : "/"
};
