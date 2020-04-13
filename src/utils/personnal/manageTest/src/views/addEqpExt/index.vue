<template>
  <div class="manage">
    <myheader :myheaderOption="headerOptionSettings" />
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
    <div class="positionRel" v-for="field in fieldlist" :key="field.key">
      <span
        v-if="field.required"
        class="positionAbs text-danger symbolRequired"
      >
        *
      </span>
      <mt-field
        :label="field.label"
        :placeholder="'请输入' + field.label"
        v-model="formdata[field.key]"
      ></mt-field>
    </div>
    <div class="largeBtnContainer mb10">
      <mt-button
        size="large"
        type="primary"
        @click.native="handleSaveEqpInfo('save')"
      >
        保存
      </mt-button>
    </div>
    <div class="largeBtnContainer">
      <mt-button
        size="large"
        type="primary"
        @click.native="handleSaveEqpInfo('tank')"
      >
        柜控测试
      </mt-button>
    </div>
    <div class="largeBtnContainer mt10">
      <mt-button
        size="large"
        type="primary"
        @click.native="handleSaveEqpInfo('program')"
      >
        程控测试
      </mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "addEqpExt",
  components: {
    myheader: () => import("@/components/myheader"),
    mySelect: () => import("@/components/mySelect")
  },
  data() {
    return {
      headerOptionSettings: {
        hideleft: false,
        title: "添加测试设备",
        routePath: "equipmentList"
      },
      eqpTpyeOptionSettings: {
        cellTitle: "设备类型",
        cellIcon: "",
        cellValue: "请选择▼",
        valueKey: "label",
        slots: [
          {
            flex: 1,
            values: this.$store.getters.eqpTpyeDatas,
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
      }
    };
  },
  methods: {
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
    handleSaveEqpInfo(type) {
      if (!this.formdata.eqpName || !this.formdata.eqpTpye) {
        this.$messagebox.alert("请完善必填项", "提示");
        return false;
      }
      for (let item of this.fieldlist) {
        if (!this.formdata[item.key] && item.required) {
          this.$messagebox.alert("请完善必填项", "提示");
          return false;
        }
      }
      let obj = JSON.parse(JSON.stringify(this.formdata));
      let newobj = {
        eqpName: this.formdata.eqpName,
        eqpTpye: this.formdata.eqpTpye,
        id: this.formdata.id || ""
      };
      this.fieldlist.map(fItem => {
        newobj[fItem.key] = obj[fItem.key];
      });
      this.$store.dispatch("setTestInfos", newobj);
      if (type == "save") {
        this.$router.push({ path: "equipmentList", query: this.$route.query });
      } else {
        let testQuery = this.$route.query;
        testQuery.controlType = type;
        this.$router.push({
          path: "selectTest",
          query: testQuery
        });
      }
    }
  },
  mounted() {
    if (this.$route.query.testEqpId || this.$route.query.testEqpId == 0) {
      this.formdata = JSON.parse(
        JSON.stringify(
          this.$store.getters.testInfo[this.$route.query.testEqpId]
        )
      );
    }
  },
  computed: {
    fieldlist() {
      let flist = [];
      this.$store.getters.registers.map(item => {
        if (item.type == this.formdata.eqpTpye) {
          flist = [...item.formgroup];
        }
      });
      // for (let props in this.formdata) {
      //   let flag = false;
      //   flist.map(fItem => {
      //     if (fItem.key == props) {
      //       flag = true;
      //     }
      //   });
      //   if (!flag) {
      //     delete this.formdata[props];
      //   }
      // }
      return flist;
    }
  }
};
</script>
