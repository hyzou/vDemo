<template>
  <div class="pr10 pl10 width100">
    <!--<el-col :span="6">-->
    <!--<commonTitleWithBorder title="列表信息" />-->
    <!--</el-col>-->
    <!--<el-col :span="18" class="mb10 textAlignRight">-->
    <!--<operateButtonsGroup-->
    <!--class="textAlignRight"-->
    <!--:operateButtonsSettings="operateButtonsSettings"-->
    <!--@handleOperateButton="handleOperateButton"-->
    <!--/>-->
    <!--</el-col>-->
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
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
  name: "checkTargetMng",
  data: function() {
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
    this.setTableList();
  }
};
</script>
