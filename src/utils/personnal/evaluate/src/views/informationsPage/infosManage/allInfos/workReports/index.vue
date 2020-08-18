<template>
  <div class="home">
    <div>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder :title="titles.searchTitel" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          v-show="showSearchForm"
          :formGroupSettings="formGroupSettings"
          @formGroupSubmit="handleSearchSubmit"
        />
      </el-col>
      <el-col class="mb10" :span="24">
        <el-col :span="6">
          <commonTitleWithBorder :title="titles.tableTitle" />
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
    <el-dialog
      v-if="dialogShowInfoDialogSettings.dialogShowInfoVisible"
      width="70%"
      :title="dialogShowInfoDialogSettings.title"
      :visible.sync="dialogShowInfoDialogSettings.dialogShowInfoVisible"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
    >
      <showInfo
        style="min-height:500px"
        :mainData="dialogShowInfoDialogSettings.showInfoData"
      />
    </el-dialog>
    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
    />
  </div>
</template>

<script>
// 引入信息查看页面组件
import showInfo from "./components/showInfoPage";
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "workReports",
  components: {
    showInfo
  },
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.editInfoFormItems.map(item => {
      if (item.name == "editoStr") {
        item.config.toolbars = this.ueEditorToolbarSettings;
      }
    });
    this.getRouteName(this.$route.name).then(name => {
      this.getInfolist(name);
    });
  },
  watch: {
    $route: function(to) {
      this.getRouteName(to.name).then(name => {
        this.getInfolist(name);
      });
    }
  }
};
</script>
