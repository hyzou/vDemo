<template>
  <div ref="mainPage" class="mainPage">
    <div ref="headerInfos">
      <el-row>
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
      </el-row>
    </div>
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    >
      <pagination
        slot="pager"
        :paginationSettings="paginationSettings"
        @handlePaginationPagenumber="handlePaginationPagenumber"
      />
    </tableList>

    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
      @linkSelect="handleChangeSelect"
    >
      <div>
        <p class="fontSize16 mt15 mb10">入库执行单明细</p>
        <operateButtonsGroup
          v-show="dialogInputTableSettings.selection"
          class="textAlignLeft mb10"
          :operateButtonsSettings="dialogOperateButtonsSettings"
          @handleOperateButton="handleOperateButton"
        />
        <inputTable
          class="table-list mb20"
          :defaultSettings="dialogInputTableSettings"
          :defaultdatas="tableChosedSettings.tableDatas"
          v-model="dialogInputTableValue"
          @handleTableMutiChecked="handleTableMutiChecked"
          @tableSelectChange="handleTableSelectChange"
        />
      </div>
    </dialogForm>
    <dialogForm
      v-if="dialogTableSettings.dialogFormVisible"
      :dialogFormSettings="dialogTableSettings"
      @handleDialogForm="handleDialogForm"
    >
      <div slot="other">
        <div
          class="displayFlex"
          v-if="
            dialogFormSettings.dialogFormItems.formGroupValues.sourceType ==
              'NON'
          "
        >
          <div style="width:350px">
            <tree
              :treeSettings="treeSettings"
              @handleTreeNodeClick="handleTreeNodeClick"
            ></tree>
          </div>
          <div style="flex:1;">
            <formGroup
              ref="detailSearchForm"
              @linkSelect="handleChangeSelect"
              :formGroupSettings="detailSearchFormSettings"
              @formGroupSubmit="handleDetailSearchFormBtn"
            />
            <tableList
              ref="chosedTab"
              :tablelistSettings="tableToBeChosedSettings"
              @handleCurrentChange="handleCurrentChange"
            />
            <pagination
              class="textAlignRight"
              :paginationSettings="beChosedPaginationSettings"
              @handlePaginationPagenumber="handleBeChosedPaginationPagenumber"
            />
            <operateButtonsGroup
              class="textAlignCenter mt10 mb10"
              :operateButtonsSettings="dialogChoseMetrialSettings"
              @handleOperateButton="handleOperateButton"
            />
            <tableList
              :tablelistSettings="tableChosedSettings"
              @handleCurrentChange="handleChosedCurrentChange"
            />
            <operateButtonsGroup
              class="textAlignCenter mt10 mb10"
              :operateButtonsSettings="dialogSaveMetrialSettings"
              @handleOperateButton="handleOperateButton"
            />
          </div>
        </div>
        <div v-else>
          <formGroup
            ref="detailSearchForm"
            @linkSelect="handleChangeSelect"
            :formGroupSettings="detailSearchFormSettings"
            @formGroupSubmit="handleDetailSearchFormBtn"
          />
          <tableList
            ref="chosedTab"
            :tablelistSettings="tableToBeChosedReferSettings"
            @handleTableMutiChecked="handleMetrialTableMutiChecked"
          />
          <pagination
            class="textAlignRight"
            :paginationSettings="beChosedPaginationReferSettings"
            @handlePaginationPagenumber="handleBeChosedReferPagenumber"
          />
          <operateButtonsGroup
            class="textAlignCenter mt10 mb10"
            :operateButtonsSettings="dialogSaveMetrialReferSettings"
            @handleOperateButton="handleOperateButton"
          />
        </div>
      </div>
    </dialogForm>
  </div>
</template>
<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "incomeCertify",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    //页面加载完毕计算高度
    this.$nextTick(() => {
      this._getTableHeight();
    });
    let _this = this;
    window.onresize = () => {
      _this._getTableHeight();
    };
    this.contentItems.map(dialogItem => {
      if (dialogItem.name == "storeOrgId") {
        dialogItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
      if (dialogItem.name == "emmsBasSupplierId") {
        dialogItem.data = this.$store.getters["user/baseInfos"].supplierList;
      }
      if (dialogItem.name == "sourceType") {
        dialogItem.data = this.$store.getters["user/baseInfos"].sourceTypeList;
      }
    });
    this.searchFormSettings.formGroupList.map(searchItem => {
      if (searchItem.name == "storeOrgId") {
        searchItem.data = this.$store.getters["user/baseInfos"].orgList;
      }
      if (searchItem.name == "sourceType") {
        searchItem.data = this.$store.getters["user/baseInfos"].sourceTypeList;
      }
    });
    this.dialogInputTableSettings.headers.map(head => {
      if (head.key == "reserveType") {
        head.data = this.$store.getters["user/baseInfos"].grainpropertyList;
      }
    });
    this.$setStorePointAndOrgInput(this, {
      method: "getStorePointList",
      searchlist: this.searchFormSettings.formGroupList,
      searchOrg: "storeOrgId",
      searchPoint: "storepointId",
      dialoglist: this.contentItems,
      dialogOrg: "storeOrgId",
      dialogPoint: "storepointId"
    }).then(res => {
      this.getStoreHouseList().then(houseList => {
        this.dialogInputTableSettings.headers.map(head => {
          if (head.key == "storehouseId") {
            head.data = houseList;
          }
        });
      });
    });
    this.initPageData();
  }
};
</script>
