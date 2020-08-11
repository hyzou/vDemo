export default function getData() {
  return {
    legend: {},
    tooltip: {},
    dataset: {
      // Provide data.
      source: [
        ["年度", "2019", "2018", "2017"],
        // ["杭州市", ...randomize()],
        ["杭州市", "98.6", "97", "95.7"],
        ["宁波市", "94", "93.8", "92"],
        ["温州市", "95.6", "94.3", "92"],
        ["嘉兴市", "95.5", "94", "93.2"],
        ["湖州市", "92.5", "90", "85.7"],
        ["绍兴市", "91", "87", "85"],
        ["金华市", "97", "97", "95.5"],
        ["衢州市", "96", "95.8", "95.6"],
        ["舟山市", "94.3", "93", "92.7"],
        ["台州市", "93", "91.3", "89"],
        ["丽水市", "89.6", "87.5", "86"]
      ]
    },
    // Declare X axis, which is a category axis, mapping
    // to the first column by default.
    xAxis: { type: "category" },
    // Declare Y axis, which is a value axis.
    yAxis: {},
    // Declare several series, each of them mapped to a
    // column of the dataset by default.
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
  };
}

function randomize() {
  return [0, 0, 0].map(v => {
    return Math.round(800 + Math.random() * 190) / 10;
  });
}
