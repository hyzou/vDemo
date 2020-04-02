const common = {};

/* 判断数据是否有值 */
common.hasValue = function (value) {
  if (!value && value !== 0) {
    return false;
  } else {
    return true;
  }
}
/* 使页面强制横屏 */
common.orientation = function (dom) {
  // var evt = "onorientationchange" in window ? "orientationchange" : "resize";
  // //改变dom中的图表大小
  // var echartsResize = function () {
  //   let echartsDom = document.getElementById("echarts-scatter-3d");
  //   document.querySelector('.charts').style.height = parseFloat(dom.style.height) - 64 + 'px';
  //   echartsDom.style.width = parseFloat(dom.style.width) - 64 + 'px';
  //   echartsDom.style.height = parseFloat(dom.style.height) - 64 + 'px';
  //   //echartsDom.style['z-index'] = -10;
  //   let myCharts = echarts.getInstanceByDom(echartsDom);
  //   if (myCharts) {
  //     myCharts.resize()
  //   }
  // }
  // var func = function () {
  //   console.log("onorientationchange");
  //   var width = document.documentElement.clientWidth;
  //   var height = document.documentElement.clientHeight;
  //   if (width > height) {
  //     dom.style.width = width + 'px';
  //     dom.style.height = height + 'px';
  //     dom.style['margin-top'] = 0;
  //     dom.style['margin-left'] = 0;
  //     dom.style.transform = 'none';
  //     dom.style['transform-origin'] = '50% 50%';
  //     console.log("width > height");
  //   }
  //   else {
  //     dom.style.width = height + 'px';
  //     dom.style.height = width + 'px';
  //     dom.style['margin-top'] = (height - width) / 2 + 'px';
  //     dom.style['margin-left'] = 0 - (height - width) / 2 + 'px';
  //     dom.style.transform = 'rotate(90deg)';
  //     dom.style['transform-origin'] = '50% 50%';
  //     console.log("width < height");
  //   }

  //   echartsResize();
  // };
  // var width = document.documentElement.clientWidth;
  // var height = document.documentElement.clientHeight;
  // if (width < height) {
  //   dom.style.width = height + 'px';
  //   dom.style.height = width + 'px';
  //   dom.style['margin-top'] = (height - width) / 2 + 'px';
  //   dom.style['margin-left'] = 0 - (height - width) / 2 + 'px';
  //   dom.style.transform = 'rotate(90deg)';
  //   dom.style['transform-origin'] = '50% 50%';
  //  // dom.style['overflow'] = 'auto';
  //   echartsResize();
  // }
  // window.removeEventListener(evt, func);
  // window.addEventListener(evt, func);

  // window.removeEventListener(evt, function(){
  //   let echartsDom = document.getElementById("echarts-scatter-3d");
  //   echartsDom.style.width = '100%';
  //   echartsDom.style.height = '100%';
  //   let myCharts = echarts.getInstanceByDom(echartsDom);
  //   if (myCharts) {
  //     myCharts.resize()
  //   }
  // });
  // window.addEventListener(evt,  function(){
  //   let echartsDom = document.getElementById("echarts-scatter-3d");
  //   echartsDom.style.width = '100%';
  //   echartsDom.style.height = '100%';
  //   let myCharts = echarts.getInstanceByDom(echartsDom);
  //   if (myCharts) {
  //     myCharts.resize()
  //   }
  // });
}

export default common;