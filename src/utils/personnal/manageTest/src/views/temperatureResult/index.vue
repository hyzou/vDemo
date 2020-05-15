<template>
  <div class="manage">
    <myheader
      :myheaderOption="headerOptionSettings"
      @myheaderLeftFnc="handleLeftHeaderBtn"
    />
    <div class="bgfff">
      <mt-cell title="分机名" :value="formdata.controllerName"> </mt-cell>
      <div v-if="temPointArr.length > 0">
        <mt-cell
          v-for="tem in temPointArr"
          :key="tem.vid"
          :title="tem.namestr"
          :value="tem.showValue"
        >
        </mt-cell>
      </div>

      <mt-radio
        title="您认为本次测温是否成功"
        v-model="result"
        :options="resultItems"
      >
      </mt-radio>
    </div>

    <div class="largeBtnContainer mt10 mb10">
      <mt-button
        size="large"
        type="primary"
        @click.native="handleSaveEqpInfo()"
      >
        保存并返回首页
      </mt-button>
    </div>
    <div v-if="showLoadingDiv" class="positionFix loadingGifBg">
      <div class="positionAbs positionCenter">
        <div class="mgAuto">
          <img src="@/assets/loading.gif" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "temperatureResult",
  components: {
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      // 延时取点动画
      showLoadingDiv: true,
      // 头部状态栏配置
      headerOptionSettings: {
        hideleft: false,
        title: "测温结果",
        routePath: "backToHome"
      },
      // 页面表单数据
      formdata: {
        controllerId: this.$route.query.eqpId ? this.$route.query.eqpId : "",
        controllerName: ""
      },
      // 测温点温度列表
      temPointArr: [],
      // 测试结果
      result: "success",
      // 测试结果项目列表
      resultItems: [
        {
          label: "成功",
          value: "success"
        },
        {
          label: "失败",
          value: "fail"
        }
      ],
      // 控制器id
      controllerId: this.$route.query.eqpId ? this.$route.query.eqpId : ""
    };
  },
  methods: {
    // 头部左侧按钮点击事件
    handleLeftHeaderBtn() {
      this.$messagebox({
        title: "提示",
        message: "您认为本次测温是否成功?",
        showCancelButton: true,
        cancelButtonText: "失败",
        confirmButtonText: "成功"
      }).then(action => {
        let flag = "0";
        if (action == "confirm") {
          flag = "1";
        } else {
          flag = "0";
        }
        this.handleSaveEqpInfo(flag);
      });
    },
    // 底部操作按钮事件绑定
    handleSaveEqpInfo(flag) {
      let testresult = "0";
      if (this.result == "success") {
        testresult = "1";
      } else {
        testresult = "0";
      }
      let historyParam = this.$vueCopy(this.formdata);
      historyParam.disableFlag = "0";
      historyParam.testResult = flag ? flag : testresult;
      historyParam.testData = this.temPointArr;
      historyParam.controllerId = this.$route.query.eqpId;
      if (historyParam.controllerType === "testTemperature") {
        historyParam.deviceId = "";
        historyParam.deviceName = "";
        historyParam.controlMode = "";
      }
      this.getsaveHistory(historyParam);
    },
    // 根据分机id获取分机信息
    getControllerConfig() {
      this.$postData(this.$api.getControllerConfig, {
        controllerId: this.$route.query.eqpId,
        storePointId: this.$store.getters.userInfo.storePointId
      }).then(xhr => {
        xhr.data.controllerId = this.$route.query.eqpId
          ? this.$route.query.eqpId
          : "";
        this.formdata = xhr.data.testControllerDto;
        this.controllerId = xhr.data.controllerId;
        setTimeout(() => {
          this.getProperty();
        }, 5000);
      });
    },
    // 获取控制器返回控制值
    getProperty() {
      let vidsArr = [];
      for (let i = 0; i < this.formdata.customParameters.lineNumbers; i++) {
        for (
          let j = 1;
          j <= this.formdata.customParameters.pointNumPerLine;
          j++
        ) {
          let obj =
            "t_l" +
            (parseInt(this.formdata.customParameters.startLineNo) + i) +
            "p" +
            (j + 1);
          vidsArr.push(obj);
        }
      }
      if (this.formdata.customParameters.temHumlineNo1) {
        vidsArr.push(
          "ht_l" + this.formdata.customParameters.temHumlineNo1 + "p1"
        );
        vidsArr.push(
          "hh_l" + this.formdata.customParameters.temHumlineNo1 + "p1"
        );
      }
      if (this.formdata.customParameters.temHumlineNo2) {
        vidsArr.push(
          "ht_l" + this.formdata.customParameters.temHumlineNo2 + "p1"
        );
        vidsArr.push(
          "hh_l" + this.formdata.customParameters.temHumlineNo2 + "p1"
        );
      }
      this.$postData(
        this.$api.getProperty,
        {
          ctrlId: this.controllerId,
          gatewayId: this.$route.query.gwDto.id,
          vids: vidsArr
        },
        true
      ).then(xhr => {
        this.showLoadingDiv = false;
        xhr.data.map(item => {
          item.funtionType = item.vid.split("_l")[0];
          item.showValue = this.$store.getters.switchTempratureFunctions[
            this.formdata.protocolType
          ][item.funtionType](item.value);
          item.namestr =
            item.vid.split("_l")[1].split("p")[0] +
            "号缆" +
            item.vid.split("_l")[1].split("p")[1] +
            "号点";
          if (item.funtionType == "ht") {
            item.namestr += "(仓温)";
          } else if (item.funtionType == "hh") {
            item.namestr += "(仓湿)";
          }
          if (item.vid.indexOf("h") > -1) {
            item.sortlineNumber = 0;
          } else {
            item.sortlineNumber =
              parseInt(item.vid.split("_l")[1]) * 100 +
              parseInt(item.vid.split("p")[1]);
          }
        });
        xhr.data.sort(function(a, b) {
          return a.sortlineNumber - b.sortlineNumber;
        });
        this.temPointArr = xhr.data;
        this.getCloseController();
      });
    },
    // 关闭控制器
    getCloseController() {
      this.$postData(this.$api.closeController, {
        ctrlId: this.controllerId,
        gatewayId: this.$route.query.gwDto.id
      }).then(xhr => {
        console.log(xhr);
      });
    },
    // 保存测试结果
    getsaveHistory(data) {
      this.$postData(this.$api.saveHistory, data, true).then(xhr => {
        if (xhr && xhr.data) {
          this.$router.push({
            path: "/"
          });
        }
      });
    }
  },
  mounted() {
    if (this.$route.query.eqpId) {
      this.getControllerConfig();
    }
  }
};
</script>
