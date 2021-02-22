<template>
  <div class="width100">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          v-if="showSearchForm"
          ref="searchForm"
          :formGroupSettings="searchFormGroupSettings"
          @formGroupSubmit="handleSearchButtons"
        />
      </el-col>
    </el-row>
    <el-row class="progressAccount-title mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="18" class="textAlignRight">
        <operateButtonsGroup
          class="textAlignRight"
          :operateButtonsSettings="operateButtonsSettings"
          @handleOperateButton="handleOperateButton"
        />
      </el-col>
      <!-- <el-col :span="18" class="textAlignRight">
        <el-button size="small" type="primary" @click="handlePreviewAllData">
          任务完成情况总览
        </el-button>
      </el-col> -->
    </el-row>
    <tableList
      :tablelistSettings="tablelistSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
    />
    <!--牵头部门落实进展台账-->
    <dialogForm
      v-if="standDialogFormSettings.dialogFormVisible"
      :dialogFormSettings="standDialogFormSettings"
    />
  </div>
</template>

<script>
import dataFnc from "./data";
import methods from "./methods";

export default {
  name: "ledgerCheck",
  data() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.getSchemList().then(() => {
      this.getOrgslist();
      this.initPageData();
    });
  }
};
</script>
