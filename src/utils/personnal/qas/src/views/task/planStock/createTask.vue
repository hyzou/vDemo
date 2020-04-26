<template>
  <el-tabs
    v-model="tabActiveName"
    type="card"
    @tab-remove="removeTab"
    ref="pointLayoutTaskTab"
  >
    <el-tab-pane label="库点信息" name="storePoint">
      <storePointInfo
        @pointLayOutShowTab="pointLayOutShowTab"
        @pointLayOutSureData="pointLayOutSureData"
        :selectGrainBreeds="selectGrainBreeds"
        class="height600"
      ></storePointInfo>
    </el-tab-pane>
    <el-tab-pane
      :label="storeHouseTabTitle"
      name="storeHouse"
      v-if="tabSecondShow"
      :closable="closableSecond"
    >
      <!-- 根据库点id获取仓房/油罐信息 -->
      <storeHouseInfo
        :storePointId="storePointId"
        :storePointName="storePointName"
        @pointLayOutShowTab="pointLayOutShowTab"
        @pointLayOutSureData="pointLayOutSureData"
        :selectGrainBreeds="selectGrainBreeds"
        class="height600"
      ></storeHouseInfo>
    </el-tab-pane>
    <el-tab-pane
      :label="cargoTabTitle"
      name="cargo"
      v-if="tabThirdShow"
      :closable="closableThird"
    >
      <cargoInfo
        :storeHouseId="storeHouseId"
        :storeHouseName="storeHouseName"
        :storeHouseCode="storeHouseCode"
        @pointLayOutSureData="pointLayOutSureData"
        :selectGrainBreeds="selectGrainBreeds"
        class="height600"
      ></cargoInfo>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import storePointInfo from "./storePointInfo";
import storeHouseInfo from "./storeHouseInfo";
import cargoInfo from "./cargoInfo";

export default {
  name: "createTask",
  data() {
    return {
      tabActiveName: "storePoint",
      tabSecondShow: false,
      closableSecond: false,
      tabThirdShow: false,
      closableThird: false,
      storePointId: "", //库点id
      storePointName: "", //库点名称
      storeHouseId: "", //仓房id
      storeHouseName: "", //仓房名称
      storeHouseCode: "", //仓房编号
      district: "", //库点区域编码
      districtName: "", //库点区域名称
      orgId: "", //存储企业id
      orgName: "", //存储企业name
      tabSecondTitle: "仓房/油罐信息",
      tabThirdTitle: "货位信息",
      tabSecondTitleShow: "",
      tabThirdTitleShow: ""
    };
  },
  components: {
    storePointInfo: storePointInfo,
    storeHouseInfo: storeHouseInfo,
    cargoInfo: cargoInfo
  },
  methods: {
    pointLayOutShowTab(param) {
      let rowData = param.scopeRow;
      if (!rowData) {
        return false;
      }

      this.tabActiveName = param.type.type;
      if (this.tabActiveName == "storeHouse") {
        this.storePointId = rowData.sysId;
        this.storePointName = rowData.name;
        this.district = rowData.district;
        this.districtName = rowData.districtName;
        this.orgId = rowData.orgId;
        this.orgName = rowData.orgname;
        this.tabSecondTitleShow = rowData.name;
        this.tabSecondShow = true;
        this.closableSecond = true;
        this.tabThirdShow = false;
        this.closableThird = false;
      } else if (this.tabActiveName == "cargo") {
        this.storeHouseId = rowData.sysId;
        this.storeHouseName = rowData.name;
        this.storeHouseCode = rowData.code;
        this.tabThirdTitleShow = rowData.name;
        this.closableSecond = false;
        this.tabThirdShow = true;
        this.closableThird = true;
      }
    },
    removeTab(tabName) {
      if (tabName == "storeHouse") {
        this.storePointId = "";
        this.storePointName = "";
        this.district = "";
        this.districtName = "";
        this.orgId = "";
        this.orgName = "";
        this.tabSecondShow = false;
        this.tabThirdShow = false;
        this.closableSecond = false;
        this.closableThird = false;
      } else if (tabName == "cargo") {
        this.storeHouseId = "";
        this.storeHouseName = "";
        this.tabThirdShow = false;
        this.closableSecond = true;
        this.closableThird = false;
      }

      let panels = this.$refs.pointLayoutTaskTab.panes;
      let pTab = panels[panels.length - 2];
      this.tabActiveName = pTab.paneName;
    },
    pointLayOutSureData(data) {
      const $this = this;
      data.map(function(arg) {
        arg.district = arg.district ? arg.district : $this.district;
        arg.districtName = arg.districtName
          ? arg.districtName
          : $this.districtName;
        //存储企业
        arg.storeOrgId = arg.storeOrgId ? arg.storeOrgId : $this.orgId;
        arg.storeOrgName = arg.storeOrgName ? arg.storeOrgName : $this.orgName;
        //库点
        arg.storePointId = arg.storePointId
          ? arg.storePointId
          : $this.storePointId;
        arg.storePointName = arg.storePointName
          ? arg.storePointName
          : $this.storePointName;
      });
      this.$emit(this.$constants.EMIT_POINTLAYOUT_TRANSSUREDATA, data);
    }
  },
  computed: {
    storeHouseTabTitle() {
      return (
        (!this.tabSecondTitleShow ? "" : this.tabSecondTitleShow + "-") +
        this.tabSecondTitle
      );
    },
    cargoTabTitle() {
      return (
        (!this.tabThirdTitleShow ? "" : this.tabThirdTitleShow + "-") +
        this.tabThirdTitle
      );
    }
  },
  props: {
    selectGrainBreeds: {
      type: Array
    }
  }
};
</script>

<style scoped></style>
