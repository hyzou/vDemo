<template>
  <div class="home">
    <div>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder :title="titles.searchTitel" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          v-show="showSearchForm"
          ref="searchForm"
          :formGroupSettings="formGroupSettings"
          @formGroupSubmit="handleSearchSubmit"
        />
      </el-col>
      <el-col class="mb10" :span="24">
        <el-col :span="6">
          <commonTitleWithBorder title="列表信息" />
        </el-col>
        <el-col :span="18">
          <operateButtonsGroup
            class="textAlignRight"
            :operateButtonsSettings="operateButtonsSettings"
            @handleOperateButton="handleOperateButton"
          />
        </el-col>
      </el-col>
      <tableList
        :tablelistSettings="tablelistSettings"
        @handleTableRowButton="handleTableRowButton"
        @handleTableItem="handleTableItem"
      />
      <pagination
        :paginationSettings="paginationSettings"
        @handlePaginationPagenumber="handlePaginationPagenumber"
      />
    </div>
    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
      @handleRemoveFiles="handleRemoveFiles"
    />
  </div>
</template>

<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "workReports",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.editInfoFormItems.map(item => {
      if (item.name == "contentText") {
        item.config.toolbars = this.ueEditorToolbarSettings;
      }
    });
    this.routeName = this.$route.name;
    this.getChannelAndLevelList();
    this.getRouteName(this.routeName).then(name => {
      this.getTableData();
    });
  }
};
</script>
