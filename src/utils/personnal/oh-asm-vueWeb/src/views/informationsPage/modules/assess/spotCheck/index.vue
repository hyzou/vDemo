<template>
  <div class="pr10 pl10 width100">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          v-if="showSearchForm"
          ref="searchForm"
          :formGroupSettings="searchSettings"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="20" class="mb10 textAlignRight">
        <operateButtonsGroup
          class="textAlignRight"
          :operateButtonsSettings="operateButtonsSettings"
          @handleOperateButton="handleOperateButton"
        />
      </el-col>
    </el-row>
    <el-row>
      <tabCard
        class="tab-container"
        :tabSettings="tabSettings"
        @handleTabChange="handleTabChange"
      />
    </el-row>
    <el-row>
      <el-col :span="24" class="tips pd10 mb15">
        重点事项：{{ attention }}
      </el-col>
      <el-col :span="24" class="tips pd10 mb15"> 注意事项：{{ focus }} </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
    </el-row>
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <pagination :paginationSettings="paginationSettings" />
    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
      @linkSelect="handleLinkSelect"
    />
  </div>
</template>
<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "index",
  data() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  created() {
    let routeArr = this.$route.fullPath.split("/");
    switch (routeArr[routeArr.length - 1]) {
      case "normal":
        this.pageType = this.$global.SCHME_TYPE_YEAR;
        break;
      case "special":
        this.pageType = this.$global.SCHME_TYPE_SPECIAL;
        break;
      default:
        this.pageType = this.$global.SCHME_TYPE_OTHER;
        break;
    }
  },
  mounted() {
    // 搜索
    this.setDictList(this.searchFormItems);

    setTimeout(() => {
      this.initCityTabData({
        asmSchemeId: this.searchSettings.formGroupValues.asmSchemeId
      });
    }, 200);
  }
};
</script>

<style scoped></style>
