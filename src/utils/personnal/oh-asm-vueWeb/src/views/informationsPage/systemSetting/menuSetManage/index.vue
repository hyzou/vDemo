<template>
  <div class="pr10 pl10 width100">
    <!-- <el-col class="mb20" :span="24">
      <commonTitleWithBorder title="查询条件" />
    </el-col>
    <el-col class="mb20" :span="24">
      <formGroup
        v-if="showSearchForm"
        ref="searchForm"  :formGroupSettings="searchFormItems"
        @formGroupSubmit="handleSearchFormBtn"
      />
    </el-col> -->
    <!--<el-col :span="6">-->
      <!--<commonTitleWithBorder title="列表信息" />-->
    <!--</el-col>-->
    <!--<el-col :span="18" class="mb10 textAlignRight">-->
      <!--<operateButtonsGroup-->
        <!--class="textAlignRight"-->
        <!--:operateButtonsSettings="operateButtonsSettings"-->
        <!--@handleOperateButton="handleOperateButton"-->
      <!--&gt;-->
      <!--</operateButtonsGroup>-->
    <!--</el-col>-->
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
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
  name: "menuSetManage",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.setTableList();
  }
};
</script>
