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
          :formGroupSettings="searchFormItems"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="18" class="mb10 textAlignRight">
        <operateButtonsGroup
          class="textAlignRight"
          :operateButtonsSettings="operateButtonsSettings"
          @handleOperateButton="handleOperateButton"
        />
      </el-col>
    </el-row>
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
    <dialogForm
      v-if="dialogFormBlockSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormBlockSettings"
      @handleDialogForm="handleDialogFormBlock"
      @linkSelect="handleLinkSelect"
    />
    <!--新增编辑 考核方案-->
    <el-dialog
      v-if="schemeOperateDialog.dialogVisible"
      width="80%"
      :title="schemeOperateDialog.dialogName"
      :visible.sync="schemeOperateDialog.dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
      @close="handleSaveScheme({ flag: 'cancel' })"
    >
      <template>
        <formGroup
          :formGroupSettings="schemeFormOperateSettings"
          @linkSelect="handleLinkSelect"
          ref="schemeForm"
        />
      </template>
      <template v-if="addSchemeType === 'nextStep'">
        <!--<tree :treeSettings="schemeTreeOperateSettings" ref="schemeTree">-->
        <!--</tree>-->
        <tableList
          :tablelistSettings="schemeTableSettings"
          @handleTableRowButton="handleTableRowButton"
        />
      </template>
      <template v-if="addSchemeType === 'quote'">
        <tableList
          :tablelistSettings="quoteSchemeTableSettings"
          @handleTableRowButton="handleQuoteSchemeTableRowButton"
          @handleTableMutiChecked="handleQuoteSchemeSelectionChange"
        />
        <pagination
          :paginationSettings="quoteSchemePaginationSettings"
          @handlePaginationPagenumber="handleQuoteSchemePaginationPagenumber"
        />
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-for="formBtn in schemeOperateDialog.formButtonList"
          :key="formBtn.flag"
          :type="formBtn.styleType"
          :size="formBtn.size || 'small'"
          :icon="formBtn.icon"
          @click="handleSaveScheme(formBtn)"
        >
          {{ formBtn.label }}
        </el-button>
      </span>
    </el-dialog>

    <!--引用考核方案详情-->
    <el-dialog
      v-if="quoteSchemeDetailDialog.dialogVisible"
      width="70%"
      :title="quoteSchemeDetailDialog.dialogName"
      :visible.sync="quoteSchemeDetailDialog.dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      :destroy-on-close="true"
    >
      <tableList :tablelistSettings="quoteSchemeDetailTableSettings" />
      <span slot="footer" class="dialog-footer">
        <el-button
          v-for="formBtn in quoteSchemeDetailDialog.formButtonList"
          :key="formBtn.flag"
          :type="formBtn.styleType"
          :size="formBtn.size || 'small'"
          :icon="formBtn.icon"
          @click="quoteSchemeDetailDialog.dialogVisible = false"
        >
          {{ formBtn.label }}
        </el-button>
      </span>
    </el-dialog>

    <!--考核方案详情-->
    <!--<el-dialog-->
    <!--v-if="schemeDetailDialog.dialogVisible"-->
    <!--width="70%"-->
    <!--:title="schemeDetailDialog.dialogName"-->
    <!--:visible.sync="schemeDetailDialog.dialogVisible"-->
    <!--:close-on-click-modal="false"-->
    <!--append-to-body-->
    <!--:destroy-on-close="true"-->
    <!--&gt;-->
    <!--<template>-->
    <!--<formGroup-->
    <!--:formGroupSettings="schemeDetailFormSettings"-->
    <!--ref="schemeForm"-->
    <!--/>-->
    <!--</template>-->
    <!--<tableList :tablelistSettings="schemeDetailTableSettings" />-->
    <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button-->
    <!--v-for="formBtn in schemeDetailDialog.formButtonList"-->
    <!--:key="formBtn.flag"-->
    <!--:type="formBtn.styleType"-->
    <!--:size="formBtn.size || 'small'"-->
    <!--:icon="formBtn.icon"-->
    <!--@click="schemeDetailDialog.dialogVisible = false"-->
    <!--&gt;-->
    <!--{{ formBtn.label }}-->
    <!--</el-button>-->
    <!--</span>-->
    <!--</el-dialog>-->
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
    this.initPageData();
  }
};
</script>
