<template>
  <div class="mainPage">
    <el-col class="mainPage-searchTitle mb20" :span="24">
      <commonTitleWithBorder title="月结" />
    </el-col>
    <el-col class="mainPage-searchForm" :span="24">
      <formGroup
        :formGroupSettings="monthBalanceFormSettings"
        @formGroupSubmit="handleMonthBalanceFormBtn"
        @linkSelect="handleChangeSelect"
      />
    </el-col>
    <el-col class="mainPage-TableTitle" :span="6">
      <commonTitleWithBorder title="月结记录" />
    </el-col>
    <tableList :tablelistSettings="tableSettings" />
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
    />
  </div>
</template>
<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "taskSetManage",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.monthBalanceFormSettings.formGroupList.map(monthBalanceItem => {
      if (monthBalanceItem.name === "storeOrgId") {
        monthBalanceItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
    });
    this.initPageData();
  }
};
</script>
