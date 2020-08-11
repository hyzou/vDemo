/*
    { label: "Modbus协议", value: "modbus" },
    { label: "贝博协议", value: "gi-beibo" },
    { label: "西城tcp协议", value: "xicheng-jx" },
    { label: "佳华tcp协议", value: "gi-jhtcp" },
    { label: "佳华rtu协议", value: "gi-jhrtu" }
*/
const switchfunctionsjson = {
  "gi-beibo": {
    hh: function(data) {
      let formatedData = parseFloat(data).toFixed(2) + "%";
      return formatedData;
    },
    ht: function(data) {
      let formatedData = parseFloat(data).toFixed(2) + "℃";
      return formatedData;
    },
    t: function(data) {
      let formatedData = parseFloat(data).toFixed(2) + "℃";
      return formatedData;
    }
  },
  "xicheng-jx": {
    hh: function(data) {
      let formatedData = (parseFloat(data) / 10).toFixed(2) + "%";
      return formatedData;
    },
    ht: function(data) {
      let formatedData = (parseFloat(data) / 10).toFixed(2) + "℃";
      return formatedData;
    },
    t: function(data) {
      let formatedData = (parseFloat(data) / 10).toFixed(2) + "℃";
      return formatedData;
    }
  },
  "gi-jhtcp": {
    hh: function(data) {
      let formatedData = (parseFloat(data) / 10).toFixed(2) + "%";
      return formatedData;
    },
    ht: function(data) {
      let formatedData = (parseFloat(data) / 256).toFixed(2) + "℃";
      return formatedData;
    },
    t: function(data) {
      let formatedData = (((parseFloat(data) - 232) * 5) / 90).toFixed(2) + "℃";
      return formatedData;
    }
  },
  "gi-jhrtu": {
    hh: function(data) {
      let formatedData = (parseFloat(data) / 2560).toFixed(2) + "%";
      return formatedData;
    },
    ht: function(data) {
      let formatedData = (parseFloat(data) / 2560).toFixed(2) + "℃";
      return formatedData;
    },
    t: function(data) {
      let formatedData =
        (((parseFloat(data) * 50) / 10 - 50 * 232) / 90).toFixed(2) + "℃";
      return formatedData;
    }
  }
};
export default switchfunctionsjson;
