module.exports = {
  // 设置输出路径
  outputDir: "dist",
  // 配置本地启动服务端口号
  devServer: {
    port: 3000,
    proxy: {
      "/admin": {
        //代理api
        // target: "http://192.168.2.142:8080/oh-scada/",//fxg服务器api地址
        target: "http://192.168.21.165:8080", //本地服务器api地址
        changeOrigin: true, //是否跨域
        ws: true, // proxy websockets
        pathRewrite: {
          //重写路径
          "^/admin": ""
        }
      }
    }
  },
  // 配置线上生产环境打包项目地址
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/_rc/mobilePage/phonePage/managecontrol/"
      : "/"
};
