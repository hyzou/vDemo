module.exports = {
  // 设置icon路径
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico"
    }
  },
  // 设置输出路径
  outputDir: "testProduction",
  // 配置本地启动服务端口号
  devServer: {
    port: 3030,
    proxy: {
      "/admin": {
        //代理api
        target: "http://10.10.7.22:8091/oh-scada/", //本地服务器api地址
        // target: "http://10.10.7.5:8080/oh-scada/", //本地服务器api地址
        changeOrigin: true, //是否跨域
        ws: true, // proxy websockets
        pathRewrite: {
          //重写路径
          "^/admin": ""
        }
      }
    }
  },
  productionSourceMap: false, // 设置上线后是否加载webpack文件
  lintOnSave: true, //保存即用eslint格式化代码
  // 配置线上生产环境打包项目地址
  publicPath: process.env.NODE_ENV === "production" ? "././" : "/"
};
