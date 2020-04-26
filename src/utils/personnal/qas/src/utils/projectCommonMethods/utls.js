const dateUtl = {
  add0(m) {
    return m < 10 ? "0" + m : m;
  },
  //根据毫秒数获取日期字符串
  getTime(value, type) {
    if (!value) {
      return "";
    }
    var dd;
    if (typeof value == "number") {
      if ((value + "").length == 10) {
        dd = value * 1000;
      } else {
        dd = value;
      }
    }
    if (typeof value == "string") {
      if (value.indexOf("T") > -1) {
        var arr = value.split("T");
        var dat = arr[0];
        var darr = dat.split("-");
        var t = arr[1];
        var tarr = t.split(".000");
        var marr = tarr[0].split(":");
        dd =
          parseInt(darr[0]) +
          "/" +
          parseInt(darr[1]) +
          "/" +
          parseInt(darr[2]) +
          " " +
          parseInt(marr[0]) +
          ":" +
          parseInt(marr[1]) +
          ":" +
          parseInt(marr[2]);
      } else {
        if (value.indexOf("-") > -1) {
          dd = value.replace(new RegExp("-", "gm"), "/");
        } else {
          dd = value;
        }
      }
    }
    var date = new Date(dd);
    var y = date.getFullYear();
    var MM = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    var d = date.getDate();
    d = d < 10 ? "0" + d : d;
    var h = date.getHours();
    h = h < 10 ? "0" + h : h;
    var m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    var s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    if ("sec" == type) {
      //精确到秒

      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    } else if ("min" == type) {
      //精确到分
      return y + "-" + MM + "-" + d + " " + h + ":" + m;
    } else {
      return y + "-" + MM + "-" + d;
    }
  },
  //获取当前时间
  getNowTime(type) {
    let time = new Date();
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    if ("sec" == type) {
      //精确到秒
      return (
        y +
        "-" +
        this.add0(m) +
        "-" +
        this.add0(d) +
        " " +
        this.add0(h) +
        ":" +
        this.add0(mm) +
        ":" +
        this.add0(s)
      );
    } else if ("min" == type) {
      //精确到分
      return (
        y +
        "-" +
        this.add0(m) +
        "-" +
        this.add0(d) +
        " " +
        this.add0(h) +
        ":" +
        this.add0(mm)
      );
    } else {
      //精确到天
      return y + "-" + this.add0(m) + "-" + this.add0(d);
    }
  },
  getYear() {
    let time = new Date();
    let y = time.getFullYear();
    return y + "-";
  },
  getFullYear() {
    let time = new Date();
    return time.getFullYear();
  },
  //hash路由模式下刷新页面返回当前目录方法 保留参数
  refresh(vm) {
    //vm参数为当前vue实例
    let path = window.location.href.split("#");
    if (path[1]) {
      let names = path[1].split("/");
      let name = "";
      let id = "";
      vm.current_active = "";
      for (let i = 0; i < names.length; i++) {
        if (1 == i) {
          vm.current_active += names[i];
        } else if (2 == i) {
          vm.current_active += "/" + names[i];
          name = names[i];
        } else if (3 == i) {
          vm.current_active += "_" + names[i];
          id = names[i];
        }
      }
      vm.activeIndex = vm.current_active;
      vm.$router.push({
        name: name,
        params: {
          id: id
        }
      });
    }
  },
  //获取面包屑导航名称
  getBreadcrumbNameArray(thisRoute, childrenName) {
    let breadcrumbNameArray = [];
    if (!thisRoute || !thisRoute.matched || thisRoute.matched.length == 0) {
      return breadcrumbNameArray;
    }
    for (let index in thisRoute.matched) {
      let object = thisRoute.matched[index];
      if (!object.meta.title) {
        continue;
      }
      breadcrumbNameArray.push(object.meta.title);
      if (object.meta.title2) {
        breadcrumbNameArray.push(object.meta.title2);
      }
    }
    if (childrenName) {
      breadcrumbNameArray.push(childrenName);
    }
    return breadcrumbNameArray;
  },
  /**
     * 为数据循环添加属性
     * @param {*} metadata 源数组
     * @param {*} options = {
          propName: "operateBtns", //必填
          propFlag: "type",
          propFlagValue: "ITEMTYPE",
          propNode: "children",  //树数据时需要用到下级属性，非树可直接使用必填项
          propParent: [
            {
              type: "remove",
              styleType: "danger",
              text: "删除"
            }
          ], //必填
          propChild: [
            {
              type: "edit",
              styleType: "warning",
              text: "编辑"
            },
            {
              type: "remove",
              styleType: "danger",
              text: "删除"
            }
          ]
        };
     */
  addPropInTreedata(metadata, options) {
    metadata.map(item => {
      if (options.propFlag && options.propFlagValue) {
        if (item[options.propFlag] == options.propFlagValue) {
          item[options.propName] = options.propParent;
        } else {
          item[options.propName] = options.propChild;
        }
        if (item[options.propNode]) {
          this.addPropInTreedata(item[options.propNode], options);
        }
      } else {
        item[options.propName] = options.propParent;
      }
    });
  },
  //获取字典信息后统一格式化为可用下拉字段（字段名称转换）
  dealDicData(arr, label, value) {
    arr.map(item => {
      item.label = item[label];
      item.value = item[value];
    });
    return arr;
  },
  //帆软报表传参中文参数
  cjkEncode(text) {
    if (text == null) return "";
    var newText = "";
    for (var i = 0; i < text.length; i++) {
      var code = text.charCodeAt(i);
      if (code >= 128 || code == 91 || code == 93) {
        /*91 is "[", 93 is "]".*/
        newText += "[" + code.toString(16) + "]";
      } else {
        newText += text.charAt(i);
      }
    }
    return newText;
  }
};

export default dateUtl;
