const touch = {
  pageX: null,
  pageY: null,
  initX: null,
  initY: null,
  isTouch: false,
  start: []
};
/* 绑定移动端单指点和双指点事件 */
touch.onFunc = json => {
  let obj = json.obj, //手指触碰对象
    tranlateFunc = json.tranlateFunc,
    scaleFunc = json.scaleFunc; //双指放大方法
  obj.addEventListener("touchstart", e => {
    e.preventDefault();
    //手指按下时的手指所在的X，Y坐标
    touch.pageX = e.touches[0].pageX;
    touch.pageY = e.touches[0].pageY;
    //初始位置的X，Y 坐标
    touch.initX = e.target.offsetLeft;
    touch.initY = e.target.offsetTop;
    //记录初始 一组数据 作为缩放使用
    if (e.touches.length >= 2) {
      //判断是否有两个点在屏幕上
      touch.start = e.touches; //得到第一组两个点
    }
    //表示手指已按下
    touch.isTouch = true;
  });

  obj.addEventListener("touchmove", e => {
    e.preventDefault();
    // 一根 手指 执行 目标元素移动 操作
    if (e.touches.length == 1 && touch.isTouch) {
      if (typeof tranlateFunc === "function") {
        let xOffset, yOffset;
        xOffset = e.touches[0].pageX - touch.pageX;
        yOffset = e.touches[0].pageY - touch.pageY;
        tranlateFunc(xOffset, yOffset);
      }
    }

    // 2 根 手指执行 目标元素放大操作
    if (e.touches.length >= 2 && touch.isTouch) {
      //得到第二组两个点
      let now = e.touches;
      Math.abs(e.touches[0].pageX - e.touches[1].pageX);
      //当前距离变小， getDistance 是勾股定理的一个方法
      if (
        getDistance(now[0], now[1]) <
        getDistance(touch.start[0], touch.start[1])
      ) {
        if (typeof scaleFunc === "function") {
          scaleFunc(0);
        }
      } else if (
        getDistance(now[0], now[1]) >
        getDistance(touch.start[0], touch.start[1])
      ) {
        if (typeof scaleFunc === "function") {
          scaleFunc(1);
        }
      }
    }
  });

  obj.addEventListener("touchend", e => {
    e.preventDefault();
    //将 isTouch 修改为false  表示 手指已经离开屏幕
    if (touch.isTouch) {
      touch.isTouch = false;
    }
  });
};
/* 更改图标移动旋转模式 */
touch.changeMoveType = type => {
  touch.transOrRota = type;
};
//缩放 勾股定理方法-求两点之间的距离
function getDistance(p1, p2) {
  var x = p2.pageX - p1.pageX,
    y = p2.pageY - p1.pageY;
  return Math.sqrt(x * x + y * y);
}
export default touch;
