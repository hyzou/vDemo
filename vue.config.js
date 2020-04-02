const Timestamp = new Date().getTime();
module.exports = {
  transpileDependencies: ["vue-echarts", "resize-detector"],
  // 设置输出路径(相对路径或绝对路径，绝对路径用反斜杠\\)
  //"../oh-production"可使用相对路径打包到目的文件夹，文件夹名称支持自定义，默认为dist，本项目自定义设置为oh-production
  outputDir: "oh-production",
  assetsDir: "static",
  // webpack 配置
  configureWebpack: {
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
      filename: `static/js/[name].${Timestamp}.js`,
      chunkFilename: `static/js/[name].${Timestamp}.js`
    }
  },
  // 配置本地启动服务端口号
  devServer: {
    port: "3033", //本地服务代理端口
    open: false, //项目启动时是否自动打开浏览器，设置为false不打开，true表示打开
    proxy: {
      "/admin": {
        //代理api
        target: "http://192.168.21.13:8280/oh-shlztb/", //本地服务器api地址
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
  publicPath: process.env.NODE_ENV === "production" ? "/vue-demo/" : "/"
};
