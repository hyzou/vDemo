export default function getData(vm) {
  return {
    legend: { show: true },
    tooltip: {
      // axisPointer: {
      //   type: "cross"
      // },
      trigger: "item",
      formatter: function(params) {
        let str = `${params.name}年年度考核排名<br>`;
        vm.mainRankData[params.name].map(rank => {
          if (rank.assessedOrgDistrictCode__dsp == params.seriesName) {
            str += `<span style="color:#6AFFDE;">${
              rank.assessedOrgDistrictCode__dsp
            } : ${rank.assessedOrgSort || 0}</span>
            <br>`;
          } else {
            str += `<span>
              ${rank.assessedOrgDistrictCode__dsp}
              :
              ${rank.assessedOrgSort || 0}</span>
              <br>`;
          }
        });
        return str;
      },
      borderWidth: 1
    },
    xAxis: { type: "category" },
    yAxis: {
      // type: "value",
      // splitNumber: 1,
      axisLabel: {
        showMinLabel: false
        //   formatter: function(value) {
        //     return value;
        //   }
      },
      // splitLine: {
      //   show: true
      // }
      minInterval: 1
    },
    series: [
      // { 模拟数据
      //   name: "排名情况",
      //   type: "line",
      //   data: [
      //     ["2016", "3"],
      //     ["2017", "2"],
      //     ["2018", "5"],
      //     ["2019", "1"],
      //     ["2020", "2"]
      //   ],
      //   smooth: true
      // },
      // {
      //   name: "排名情况",
      //   type: "line",
      //   data: [
      //     ["2016", "3"],
      //     ["2017", "2"],
      //     ["2018", "5"],
      //     ["2019", "1"],
      //     ["2020", "2"]
      //   ],
      //   smooth: true
      // }
    ]
  };
}
