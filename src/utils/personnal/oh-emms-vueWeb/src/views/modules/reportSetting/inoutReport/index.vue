<template>
  <div class="mainPage">
    <el-col class="mainPage-searchTitle mb20" :span="24">
      <commonTitleWithBorder title="查询条件" />
    </el-col>
    <el-col class="mainPage-searchForm" :span="24">
      <formGroup
        v-if="showSearchForm"
        ref="searchForm"
        @linkSelect="handleChangeSelect"
        :formGroupSettings="searchFormSettings"
        @formGroupSubmit="handleSearchFormBtn"
      />
    </el-col>
    <el-col class="mainPage-TableTitle" :span="6">
      <commonTitleWithBorder title="列表信息" />
    </el-col>
    <el-col :span="18" class="mainPage-tableAboveBtns textAlignRight">
      <operateButtonsGroup
        class="textAlignRight"
        :operateButtonsSettings="operateButtonsSettings"
        @handleOperateButton="handleOperateButton"
      />
    </el-col>
    <iframe
      scrolling="auto"
      frameborder="0"
      :src="url"
      style="width:100%;height:500px;"
      id="report"
    ></iframe>
  </div>
</template>
<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "inoutReport",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.searchFormSettings.formGroupList.map(searchItem => {
      if (searchItem.name === "storeOrgId") {
        searchItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
    });
    this.initReport();
  }
};
</script>
