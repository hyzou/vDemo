<template>
  <div class="width100">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          v-show="showSearchForm"
          ref="searchForm"
          :formGroupSettings="searchFormGroupSettings"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>
    <el-row class="reviewProgress-title mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="永久基础农田划定情况" />
      </el-col>
      <!-- <a
        :href="$global.fileDownloadUrl"
        download="全省年永久基本农田划定情况.xlsx"
      >
        全省年永久基本农田划定情况
      </a> -->
      <el-col :span="18" class="textAlignRight">
        <operateButtonsGroup
          class="textAlignRight"
          :operateButtonsSettings="operateButtonsSettings"
          @handleOperateButton="handleOperateButton"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <iframe
          title="报表"
          style="display:block;width:100%;height:600px;border:1px solid #ccc;"
          :src="url"
        ></iframe>
      </el-col>
    </el-row>
    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
    />
  </div>
</template>

<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "randomDistrictMng",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.initPageData();
  }
};
</script>
