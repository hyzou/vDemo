<template>
  <div class="manage">
    <myheader
      :myheaderOption="headerOptionSettings"
      @myheaderRightFnc="handleMyheaderRightFnc"
    />
    <div class="positionRel">
      <span class="positionAbs text-danger symbolRequired">*</span>
      <mt-field
        label="设备名"
        placeholder="请输入设备名"
        v-model="formdata.eqpName"
      ></mt-field>
    </div>
    <div class="positionRel">
      <span class="positionAbs text-danger symbolRequired">*</span>
      <mySelect
        :mySelectOption="eqpTpyeOptionSettings"
        @myselectChange="handleGetEqpTpyeValue"
      />
    </div>
    <div class="largeBtnContainer mb10">
      <mt-button size="large" type="primary" @click.native="handleSaveEqpInfo">
        保存
      </mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addGasPoint",
  components: {
    myheader: () => import("@/components/myheader"),
    mySelect: () => import("@/components/mySelect")
  },
  data() {
    return {
      headerOptionSettings: {
        hideleft: false,
        title: "添加测气点位",
        routePath: "addEqpExt"
      },
      eqpTpyeOptionSettings: {
        cellTitle: "设备类型",
        cellIcon: "",
        cellValue: "请选择▼",
        valueKey: "label",
        slots: [
          {
            flex: 1,
            values: this.$store.getters.eqpTpyeDatas[
              this.$store.getters.mainTestInfo.testType
            ],
            className: "slot1",
            textAlign: "center",
            defaultIndex: 0
          }
        ]
      },
      formdata: {
        eqpName: "",
        eqpTpye: "",
        eqpTpye_dsc: ""
      },
      deviceId: this.$store.getters.mainTestInfo.testEqpId
        ? this.$store.getters.mainTestInfo.testEqpId
        : ""
    };
  },
  methods: {
    /**
     * 点击header右侧按钮
     */
    handleMyheaderRightFnc() {
      if (this.$store.getters.mainTestInfo.testType == "testGas") {
        this.$router.push({
          path: "addGasPoint"
        });
      } else {
        return false;
      }
    },
    handleGetEqpTpyeValue(val) {
      let that = this;
      that.$nextTick(function() {
        that.eqpTpyeOptionSettings.slots[0].values.forEach((e, i) => {
          if (e.value == that.formdata.eqpTpye) {
            that.eqpTpyeOptionSettings.slots[0].defaultIndex = i; // that.slots[0].defaultIndex设置picker的初始值
          }
        });
      });
      this.formdata.eqpTpye = val[0].value;
      this.formdata.eqpTpye_dsc = val[0].label;
      this.eqpTpyeOptionSettings.cellValue = val[0].label + "▼";
    },
    handleSaveEqpInfo() {
      this.$router.push({
        path: "addEqpExt"
      });

      // let _this = this;
      // if (!this.formdata.eqpName || !this.formdata.eqpTpye) {
      //   this.$messagebox.alert("请完善必填项", "提示");
      //   return false;
      // }
      // let newobj = {
      //   storePointId: this.$store.getters.userInfo.storePointId,
      //   deviceName: this.formdata.eqpName,
      //   deviceType: this.formdata.eqpTpye,
      //   controllerId: this.formdata.id || "",
      //   controllerType: this.$store.getters.mainTestInfo.testType
      // };

      // let postUrl = "",
      //   postData = {};
      // if (!this.$store.getters.mainTestInfo.testEqpId) {
      //   postUrl = _this.$api.saveDeviceConfig;
      //   postData = newobj;
      //   postData.controllerType = this.$store.getters.mainTestInfo.testType;
      // } else {
      //   postUrl = _this.$api.updateDeviceConfig;
      //   postData.testDeviceDto = newobj;
      //   postData.deviceId = _this.$store.getters.mainTestInfo.testEqpId;
      // }
      // _this.$postData(postUrl, postData).then(xhr => {
      //   if (xhr && xhr.data && xhr.data > 0) {
      //     this.$router.push({
      //       path: "addEqpExt"
      //     });
      //   }
      // });
    },
    getDeviceConfig(testEqpId) {
      let _this = this;
      _this
        .$postData(_this.$api.getDeviceConfig, { deviceId: testEqpId })
        .then(xhr => {
          if (xhr && xhr.data) {
            _this.deviceId = xhr.data.deviceId;
            _this.formdata = JSON.parse(xhr.data.testDeviceDto.deviceParameter);
            _this.eqpTpyeOptionSettings.slots[0].values.forEach((e, i) => {
              if (e.value == _this.formdata.eqpTpye) {
                _this.eqpTpyeOptionSettings.slots[0].defaultIndex = i;
              }
            });
          }
        });
    }
  },
  mounted() {
    this.$data.formdata.id = this.$store.getters.mainTestInfo.eqpId;
    if (this.$store.getters.mainTestInfo.testEqpId) {
      this.headerOptionSettings.title = "修改测气点位";
      this.getDeviceConfig(this.$store.getters.mainTestInfo.testEqpId);
    }
  }
};
</script>
