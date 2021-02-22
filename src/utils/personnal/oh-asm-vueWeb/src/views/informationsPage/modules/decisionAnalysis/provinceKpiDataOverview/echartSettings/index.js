export default function getData() {
  return {
    legend: {
      // orient: "vertical"
      // left: "left"
    },
    tooltip: {},
    series: [
      {
        name: "指标数据项",
        type: "pie", // 设置图表类型为饼图
        radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
        data: [
          // 数据数组，name 为数据项名称，value 为数据项值
          { value: 235, name: "杭州市", id: "1" },
          { value: 274, name: "宁波市", id: "2" },
          { value: 310, name: "温州市", id: "3" },
          { value: 335, name: "嘉兴市", id: "4" },
          { value: 235, name: "湖州市", id: "5" },
          { value: 274, name: "绍兴市", id: "6" },
          { value: 310, name: "金华市", id: "7" },
          { value: 335, name: "衢州市", id: "8" },
          { value: 310, name: "舟山市", id: "9" },
          { value: 335, name: "台州市", id: "10" },
          { value: 400, name: "丽水市", id: "11" }
        ]
      }
    ]
  };
}
