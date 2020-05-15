<template>
  <div class="manage">
    <myheader :myheaderOption="headerOptionSettings" />
    <mt-cell title="设备名" :value="formdata.eqpName"></mt-cell>
    <mt-cell title="状态寄存器地址" :value="formdata.statusRegister"></mt-cell>
    <mt-cell title="控制寄存器地址" :value="formdata.controlRegister"></mt-cell>
    <div class="bgfff mt10">
      <div class="pl15 mb15">
        <mt-cell :title="stepTestInfo.process[testStepId].tipsTitle"></mt-cell>
        <ul class="pl10 text-info">
          <li v-for="(tip, index) in tiplist" :key="index">
            {{ tip.tip }}
          </li>
        </ul>
      </div>
      <div class="pl15 mb15" v-if="stepTestInfo.process[testStepId].testItems">
        <mt-checklist
          class="page-part"
          title="状态寄存器"
          v-model="statusvalue"
          :options="statusItems"
        >
        </mt-checklist>
        <div class="mt5 mb10">
          已获取到的状态值:
          <span v-for="(status, index) in statusvalue" :key="index">
            {{ status }}
          </span>
        </div>
        <mt-checklist
          class="page-part"
          title="控制寄存器"
          v-model="controlvalue"
          :options="controlItems"
        >
        </mt-checklist>
        <div class="mt5 mb10">
          已获取到的控制值:
          <span v-for="(status, index) in controlvalue" :key="index">
            {{ status }}
          </span>
        </div>
      </div>
      <div class="pb10">
        <div
          class="largeBtnContainer mb10"
          v-if="$route.query.controlType != 'tank'"
        >
          <template
            v-for="optBtn in stepTestInfo.process[testStepId].operateButtons"
          >
            <mt-button
              :key="optBtn.instruction"
              size="large"
              type="primary"
              @click.native="handleOperateEqp(optBtn.instruction)"
            >
              {{ optBtn.label }}
            </mt-button>
          </template>
        </div>
        <div class="largeBtnContainer mb10 clearfix">
          <template
            v-for="optBtn in stepTestInfo.process[testStepId].stepButtons"
          >
            <div :key="optBtn.instruction" class="harfBtnContainer">
              <mt-button
                size="large"
                type="primary"
                @click.native="handleStep(optBtn)"
              >
                {{ optBtn.label }}
              </mt-button>
            </div>
          </template>
        </div>
      </div>
      <div class="positionFix countDownNumber pt5 pb5 pl10 pr10 borderR10">
        {{ countDownNumber }}&nbsp;s
      </div>
      <div v-if="showLoadingDiv" class="positionFix loadingGifBg">
        <div class="positionAbs positionCenter">
          <div class="mgAuto">
            <img src="@/assets/loading.gif" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import socket from "@/util/globalFunctions/socketJs";
export default {
  name: "preTestEqp",
  components: {
    myheader: () => import("@/components/myheader")
  },
  data() {
    return {
      // socket 客户端及主题
      stompClient: null,
      subscribeArray: [],
      // 头部header配置项
      headerOptionSettings: {
        hideleft: false,
        title:
          this.$route.query.controlType == "tank" ? "柜控测试" : "程控测试",
        routePath: "selectTest"
      },
      // 状态寄存器返回的数值
      statusvalue: [],
      // 控制寄存器返回的数值
      controlvalue: [],
      // options: [],
      // 状态寄存器预设项目（供接受数据勾选用）
      statusItems: [],
      // 控制寄存器预设项目（供接受数据勾选用）
      controlItems: [],
      // 页面表单默认值
      formdata: {
        eqpName: "",
        stateRegisterIp: "",
        controlRegisterIp: ""
      },
      // 当前测试步骤id（第几步）
      testStepId: this.$route.query.testProcessStepId,
      // 当前设备测试总流程
      stepTestInfo: this.$store.getters.chosedProcess,
      // 当前库区网关信息
      gatewayInfo: {},
      // 当前分机信息
      controllerInfo: {},
      // 控制器设值取值用到的vars参数
      propertyVars: [],
      // 延时取点动画
      showLoadingDiv: false,
      // 控制器id
      controllerId: this.$route.query.eqpId ? this.$route.query.eqpId : "",
      // 倒计时
      countDownNumber: 120,
      // 倒计时对象
      countDownProject: null,
      // 获取初始状态倒计时
      getDefaultCountDownNumber: 10,
      // 获取初始状态倒计时对象
      getDefaultCountDownProject: null,
      // 连接控制器所需对象
      connectControllerParams: {},
      // 测试结果数组
      testResultArray: []
    };
  },
  methods: {
    // 点击按钮进行程控，发送指令到后台，触发控制器
    handleOperateEqp(flag) {
      let order = "";
      this.controlItems.map(item => {
        if (item.key == flag) {
          order = item.value;
        }
      });
      this.getSetProperty(order);
    },
    // 点击最下部按钮事件，下一步、结束测试、获取结果
    handleStep(btn) {
      if (btn.instruction == "nextStep" || btn.instruction == "getResult") {
        if (btn.status && btn.status == "start") {
          this.showLoadingDiv = true;
          this.dealGetDefaultCountDown();
          this.getConnectController(this.connectControllerParams);
        } else {
          let processResult = {};
          this.getProperty().then(xhr => {
            let defaultStatusList = [],
              defaultControlList = [];
            this.statusItems.map((item, index) => {
              defaultStatusList.push(item.value);
              item.getSocketVal =
                this.statusvalue[index] || this.statusvalue[index] == 0
                  ? this.statusvalue[index] + ""
                  : "";
            });
            this.controlItems.map((item, index) => {
              defaultControlList.push(item.value);
              item.getSocketVal =
                this.controlvalue[index] || this.controlvalue[index] == 0
                  ? this.controlvalue[index] + ""
                  : "";
            });
            processResult.statusR = this.statusItems;
            processResult.controlR = this.controlItems;
            processResult.processName = this.stepTestInfo.process[
              this.testStepId
            ].tipsTitle;
            this.testResultArray.push(processResult);
            console.log(JSON.stringify(defaultStatusList));
            console.log(JSON.stringify(this.statusvalue));
            console.log(JSON.stringify(defaultControlList));
            console.log(JSON.stringify(this.controlvalue));
            console.log(JSON.stringify(xhr.data[0].value));
            console.log(
              JSON.stringify(defaultStatusList[defaultStatusList.length - 1])
            );
            if (
              JSON.stringify(defaultStatusList) ==
                JSON.stringify(this.statusvalue) &&
              JSON.stringify(defaultControlList) ==
                JSON.stringify(this.controlvalue) &&
              xhr.data[0].value ==
                defaultStatusList[defaultStatusList.length - 1]
            ) {
              if (btn.instruction == "getResult") {
                this.$store.dispatch(
                  "setPlcTestResult",
                  "true_" + this.stepTestInfo.process[this.testStepId].tipsTitle
                );
                this.getCloseController();
              } else {
                this.statusvalue = [];
                this.controlvalue = [];
                this.getProperty().then(xhr => {
                  this.testStepId = parseInt(this.testStepId) + 1;
                  this.statusvalue.push(xhr.data[0].value);
                });
              }
            } else {
              this.$messagebox({
                title: "提示",
                message: "预设值与分机返回值不符，本次测试失败",
                showCancelButton: false,
                confirmButtonText: "查看测试结果"
              }).then(() => {
                this.$store.dispatch(
                  "setPlcTestResult",
                  "false_" +
                    this.stepTestInfo.process[this.testStepId].tipsTitle
                );
                this.getCloseController();
              });
            }
          });
        }
      }
      if (btn.instruction == "stopTest") {
        let stopQuery = this.$route.query;
        delete stopQuery.testProcessId;
        this.getCloseController(stopQuery);
      }
    },
    // 获取设备信息
    getDeviceConfig(testEqpId) {
      let _this = this;
      _this
        .$postData(_this.$api.getDeviceConfig, { deviceId: testEqpId })
        .then(xhr => {
          if (xhr && xhr.data) {
            _this.formdata = JSON.parse(xhr.data.testDeviceDto.deviceParameter);
            _this.getControllerConfig(
              xhr.data.testDeviceDto.controllerId,
              xhr.data.testDeviceDto.storePointId
            );
          }
        });
    },
    // 根据分机id获取分机信息
    getControllerConfig(controllerId, storePointId) {
      this.$postData(this.$api.getControllerConfig, {
        controllerId: controllerId,
        storePointId: storePointId
      }).then(xhr => {
        this.controllerId = xhr.data.controllerId;
        this.controllerInfo = xhr.data.testControllerDto;
        this.getStoreGateWayInfo();
      });
    },
    // 获取库区网关
    getStoreGateWayInfo() {
      this.$getData(this.$api.getStoreGateWayInfo, {
        storePointId: this.controllerInfo.storePointId
      }).then(xhr => {
        let gatewaylist = xhr.data.filter(item => {
          if (!item.storehouseId) {
            return true;
          }
        });
        this.controllerInfo.gatewayInfo = gatewaylist[0];
        this.gatewayInfo = gatewaylist[0];
        this.connectControllerParams = this.controllerInfo;
        this.getSocketConnect();
      });
    },
    // 建立控制器
    getConnectController(data) {
      this.showLoadingDiv = true;
      let urlStr = "",
        sectorNameStr = "",
        varsTypeName = "";
      if (data.connectionType == "tcp") {
        urlStr = data.protocolType + "://" + data.host + ":" + data.port; // + "?";
      } else {
        urlStr = "jhrtu" + "://" + data.host + ":" + data.port; // + "?";
      }
      // for (let prop in data.protocolParameter) {
      //   if (data.protocolParameter[prop]) {
      //     let paramStr = prop + "=" + data.protocolParameter[prop] + "&";
      //     urlStr += paramStr;
      //   }
      // }
      if (data.protocolType == "s7") {
        sectorNameStr = "SMART_V";
      } else if (data.protocolType == "modbus") {
        sectorNameStr = "HOLDING_REGISTER";
      } else {
        sectorNameStr = "HostLinkSector";
      }
      this.$store.getters.eqpTpyeDatas.map(item => {
        if (item.value == this.formdata.eqpTpye) {
          varsTypeName = item.alias;
        }
      });
      this.propertyVars = [
        {
          offset: this.formdata.statusRegister,
          sectorName: sectorNameStr,
          vid: varsTypeName + "_state01",
          vtypeName: "uint16"
        },
        {
          offset: this.formdata.controlRegister,
          sectorName: sectorNameStr,
          vid: varsTypeName + "_control01",
          vtypeName: "uint16"
        }
      ];
      let controllerParam = {
        ctrDto: {
          ctrlId: this.controllerId,
          chUrl: urlStr, //.substr(0, urlStr.length - 1),
          vars: this.propertyVars,
          compactibilities: data.protocolParameter
        },
        gwDto: {
          id: data.gatewayInfo.hwSysId,
          name: data.gatewayInfo.name
        }
      };
      this.$postData(this.$api.connectController, controllerParam, true).then(
        xhr => {
          if (xhr && xhr.data) {
            setTimeout(() => {
              this.showLoadingDiv = false;
            }, 5000);
          } else {
            this.showLoadingDiv = false;
            this.$messagebox.alert("控制器建立失败");
          }
        }
      );
    },
    // 设置控制值
    getSetProperty(order) {
      this.showLoadingDiv = true;
      let vid = "";
      this.$store.getters.eqpTpyeDatas.map(item => {
        if (item.value == this.formdata.eqpTpye) {
          vid = item.alias;
        }
      });
      this.$postData(
        this.$api.setProperty,
        {
          ctrlId: this.$route.query.eqpId,
          gatewayId: this.gatewayInfo.hwSysId,
          vars: [{ vid: vid + "_control01", value: order }]
        },
        true
      ).then(xhr => {
        if (xhr && xhr.data) {
          setTimeout(() => {
            this.showLoadingDiv = false;
            // this.getProperty();
          }, 5000);
        }
      });
    },
    // 获取控制器返回控制值
    getProperty() {
      return new Promise(relsove => {
        let vidName = "";
        this.$store.getters.eqpTpyeDatas.map(item => {
          if (item.value == this.formdata.eqpTpye) {
            vidName = item.alias;
          }
        });
        this.$postData(
          this.$api.getProperty,
          {
            ctrlId: this.$route.query.eqpId,
            gatewayId: this.gatewayInfo.hwSysId,
            vids: [vidName + "_state01"]
          },
          true
        ).then(xhr => {
          this.showLoadingDiv = false;
          relsove(xhr);
        });
      });
    },
    // 关闭控制器
    getCloseController(stopQuery) {
      this.$postData(this.$api.closeController, {
        ctrlId: this.$route.query.eqpId,
        gatewayId: this.gatewayInfo.hwSysId
      }).then(xhr => {
        if (xhr && xhr.data)
          if (stopQuery) {
            this.$router.push({ path: "selectTest", query: stopQuery });
          } else {
            this.$store.dispatch("setPlcTestErrorInfo", this.testResultArray);
            this.$router.push({ path: "testResult", query: this.$route.query });
          }
      });
    },
    // 连接socket
    getSocketConnect() {
      let _this = this;
      socket.socketConnect({
        url: _this.$api.socketMain,
        username: "crk",
        callback: client => {
          _this.stompClient = client;
          let subscribe = socket.openSubscribe({
            url:
              "/_topic/test/Controller/" +
              this.gatewayInfo.hwSysId +
              "/" +
              _this.controllerId,
            stompClient: _this.stompClient,
            callback: response => {
              _this.dealSubscribeResponse(response.body);
            }
          });
          _this.subscribeArray.push(subscribe);
        }
      });
    },
    //socket数据处理
    dealSubscribeResponse(response) {
      let socketMsgInfo = JSON.parse(response);
      socketMsgInfo.map(resItem => {
        resItem.oldVal = resItem.oldVal + "";
        resItem.newVal = resItem.newVal + "";
        if (resItem.vid.split("_")[1] == "state01") {
          this.statusvalue.push(resItem.newVal);
        }
        if (
          resItem.vid.split("_")[1] == "control01" &&
          resItem.oldVal != "undefined"
        ) {
          this.controlvalue.push(resItem.newVal);
        }
        if (
          resItem.vid.split("_")[1] == "control01" &&
          resItem.oldVal == "undefined"
        ) {
          this.getProperty().then(xhr => {
            if (this.formdata.close == xhr.data[0].value) {
              this.showLoadingDiv = false;
              clearInterval(this.getDefaultCountDownProject);
              this.testStepId = parseInt(this.testStepId) + 1;
            }
          });
        }
      });
    },
    // 倒计时
    dealCountDown() {
      this.countDownProject = setInterval(() => {
        this.countDownNumber--;
        if (this.countDownNumber == 1) {
          clearInterval(this.countDownProject);
        }
      }, 1000);
    },
    // 倒计时
    dealGetDefaultCountDown() {
      this.getDefaultCountDownProject = setInterval(() => {
        this.getDefaultCountDownNumber--;
        if (this.getDefaultCountDownNumber == 1) {
          this.showLoadingDiv = false;
          clearInterval(this.getDefaultCountDownProject);
          this.$messagebox.alert(
            "未检测到设备是否处于关闭状态，请检查信息是否出错"
          );
        }
      }, 1000);
    }
  },
  mounted() {
    if (this.$route.query.testEqpId) {
      this.getDeviceConfig(this.$route.query.testEqpId);
    }
  },
  computed: {
    // 监听当前页数据，展示提示信息
    tiplist() {
      let tiplistArr = [];
      if (this.$route.query.controlType == "tank") {
        tiplistArr = this.stepTestInfo.process[this.testStepId].tankTips;
      } else {
        tiplistArr = this.stepTestInfo.process[this.testStepId].tips;
      }
      return tiplistArr;
    }
  },
  watch: {
    // 监听当前测试步骤id，切换页面显示内容
    testStepId(newVal) {
      console.log(newVal);
      if (this.countDownProject) {
        clearInterval(this.countDownProject);
        this.countDownNumber = 120;
      }
      this.dealCountDown();
      // this.options = [];
      this.statusItems = [];
      this.controlItems = [];
      let chkbox = [],
        chkarr = [];
      this.$store.getters.registers.map(register => {
        if (register.type == this.formdata.eqpTpye) {
          chkbox = register.formgroup;
        }
      });
      if (this.stepTestInfo.process[newVal].testItems) {
        this.stepTestInfo.process[newVal].testItems.split(",").map(item => {
          chkbox.map(chk => {
            if (item == chk.key) {
              chkarr.push(chk);
            }
          });
        });
      }
      chkarr.map(chkitem => {
        chkitem.value = this.formdata[chkitem.key];
        if (
          chkitem.controlType == "statusR" &&
          (chkitem.value || chkitem.value == 0)
        ) {
          this.statusItems.push(chkitem);
        }
        if (
          chkitem.controlType == "controlR" &&
          (chkitem.value || chkitem.value == 0)
        ) {
          this.controlItems.push(chkitem);
        }
      });
    }
  },
  beforeDestroy() {
    // this.getCloseController(this.$route.query);
    socket.closeSubscribe(this.subscribeArray);
    socket.socketDisconnect(this.stompClient);
  }
};
</script>
