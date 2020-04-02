import parameter from "@/config/parameter.js";

const updateVisualMap = {};

/* hex格式转rgb格式 */
function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ]
    : null;
}

/* 字符串格式转rgb格式 */
function strToRgb(rgb) {
  let reg = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  rgb = rgb.match(reg);
  return rgb ? [parseInt(rgb[1]), parseInt(rgb[2]), parseInt(rgb[3])] : null;
}

/* 颜色对比  */
function colorContrast(lowColor, highColor) {
  if (highColor[0] == 255) {
    if (lowColor[0] != 255) {
      return true;
    } else {
      if (lowColor[1] > highColor[1]) {
        return true;
      } else if (lowColor[1] == highColor[1]) {
        if (lowColor[2] >= highColor[2]) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  } else {
    if (highColor[1] == 255) {
      if (lowColor[0] == 255) {
        return false;
      } else if (lowColor[2] == 255) {
        return true;
      } else {
        if (highColor[0] > lowColor[0]) {
          return true;
        } else if (highColor[0] == lowColor[0]) {
          if (highColor[2] <= lowColor[2]) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      if (lowColor[0] == 255) {
        return false;
      } else if (lowColor[1] == 255) {
        return false;
      } else {
        if (highColor[1] > lowColor[1]) {
          return true;
        } else if (highColor[1] == lowColor[1]) {
          if (highColor[0] <= lowColor[0]) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
  }
}

/* 初始化颜色范围数据 */
function initMapData(mapData = {}) {
  return {
    highValue: mapData.highValue || 40,
    lowValue: mapData.lowValue || 0,
    highColor: mapData.highColor || "rgb(255, 10, 0)",
    lowColor: mapData.lowColor || "rgb(0, 10, 255)"
  };
}

/*更新echarts颜色映射组件*/
updateVisualMap.updateVisualMapData = function(mapData) {
  let data = initMapData(mapData);
  let color = parameter.visualMapColor;
  let start, end;

  for (var i = 0; i < color.length; i++) {
    var hex = hexToRgb(color[i]);
    if (colorContrast(strToRgb(data.highColor), hex)) {
      start = i - 1 < 0 ? 0 : i - 1;
    }
    if (colorContrast(hex, strToRgb(data.lowColor))) {
      end = i + 1 > 63 ? 63 : i + 1;
      break;
    }
  }
  var visualMap = {
    //温度条
    min: parseFloat(data.lowValue + ""),
    max: parseFloat(data.highValue + ""),
    color: color.slice(start, end),
    range: [parseFloat(data.lowValue + ""), parseFloat(data.highValue + "")],
    outOfRange: {
      color: ["#cccfd1"]
    },
    calculable: true
  };
  return visualMap;
};

export default updateVisualMap;
