<template>
  <div class="pr10 pl10 width100">
    <el-row>
      <!--<el-col class="mb20" :span="24">-->
      <!--<commonTitleWithBorder title="查询条件" />-->
      <!--</el-col>-->
      <el-col class="mb20" :span="24">
        <formGroup
          v-if="showSearchForm"
          ref="searchForm"
          :formGroupSettings="searchSettings"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>
    <!--<el-row>-->
    <!--<el-col :span="4" :offset="20" class="mb10 textAlignRight">-->
    <!--<operateButtonsGroup-->
    <!--class="textAlignRight"-->
    <!--:operateButtonsSettings="operateButtonsSettings"-->
    <!--@handleOperateButton="handleOperateButton"-->
    <!--/>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <el-row>
      <tabCard
        class="tab-container"
        :tabSettings="tabSettings"
        @handleTabChange="handleTabChange"
      />
    </el-row>
    <el-row>
      <el-col :span="24" class="tips pd10 mb15">
        重点事项：<span
          style="color: #666666;font-size: 14px;letter-spacing: 1.5px;line-height: 20px;"
          >{{ attention }}</span
        >
      </el-col>
      <el-col :span="24" class="tips pd10 mb15">
        注意事项：<span
          style="color: #666666;font-size: 14px;letter-spacing: 1.5px;line-height: 20px;"
          >{{ focus }}</span
        >
      </el-col>
    </el-row>
    <!--<el-row>-->
    <!--<el-col :span="6">-->
    <!--<commonTitleWithBorder title="列表信息" />-->
    <!--</el-col>-->
    <!--</el-row>-->
    <el-row>
      <el-col :span="24" class="lheight40">
        抽查评分状态：<Status status="incomplete" />未完成
        <Status class="ml10" status="complete" />已完成
        <Status class="ml10" status="reported" />已上报
      </el-col>
    </el-row>
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
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
import Status from "@/components/circleDot";
export default {
  name: "index",
  data() {
    return dataFnc(this);
  },
  components: {
    Status
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
    this.setSearchFormData();
  }
};
</script>

<style scoped></style>
