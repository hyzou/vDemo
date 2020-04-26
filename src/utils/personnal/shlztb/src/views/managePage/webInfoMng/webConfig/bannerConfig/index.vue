<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
          <!-- <el-col class="mb20" :span="24">
            <commonTitleWithBorder :title="titles.searchTitel" />
          </el-col> -->
          <!-- <el-col class="mb20" :span="24">
            <formGroup
              :formGroupSettings="formGroupSettings"
              @formGroupSubmit="handleSearchSubmit"
            />
          </el-col> -->
          <el-col class="mb20" :span="24">
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
      </el-col>
    </el-row>
    <dialogForm
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
    />
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
// import formGroup from "@/components/formGroup";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
// import searchFormBtnList from "@/utils/formSettingsJson/bannerConfig/searchFormBtns.json";
// import searchFormItemslist from "@/utils/formSettingsJson/bannerConfig/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/bannerConfig/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/bannerConfig/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/bannerConfig/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/bannerConfig/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/bannerConfig/dialogEditFormBtns.json";
import dialogFormRules from "@/utils/formRulesJson/bannerConfig/dialogRule";
import dialogViewFormItems from "@/utils/formSettingsJson/bannerConfig/dialogViewFormItems.json";

export default {
  name: "bannerConfig",
  components: {
    commonTitleWithBorder,
    // formGroup,
    operateButtonsGroup,
    tableList,
    pagination,
    dialogForm
  },
  data() {
    return {
      /**
       * titles 标题管理
       */
      titles: {
        searchTitel: "查询条件",
        tableTitle: "轮播图列表"
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      // formGroupSettings: {
      //   formItemSpan: 12,
      //   formGroupList: searchFormItemslist,
      //   formGroupValues: {},
      //   formButtonList: searchFormBtnList
      // },
      /**
       * operateButtons 按钮组配置
       */
      operateButtonsSettings: {
        moduleName: "tableList",
        buttonListData: tableOperationsBtnList
      },
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "dark",
          rowKey: "sysId",
          border: true,
          headerOptions: tableHeaderOpts
        }
      },
      /**
       * pagination 分页器基本数据配置
       */
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
      /**
       * dialog 内置form表单对话框基本数据配置
       */
      dialogFormSettings: {
        dialogFormTitle: "",
        dialogFormVisible: false,
        dialogFormItems: {
          formGroupTypeUpload: "true",
          formGroupTypeUploadName: "file",
          formItemSpan: 12,
          formGroupList: [],
          formGroupValues: {},
          formButtonList: [],
          rules: dialogFormRules.rule
        }
      },
      /**
       * searchbar 记录搜索栏搜索记录
       */
      searchInfo: {
        filterRules: []
      },
      filterRules: [
        {
          field: "type",
          value: "01",
          op: "equal"
        }
      ],
      page: 1
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["name"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      let that = this;
      that.dialogFormSettings.dialogFormVisible = true;
      that.dialogFormSettings.dialogType = "form";
      that.dialogFormSettings.dialogFormTitle = "新增轮播图";
      that.dialogFormSettings.dialogFormItems.formGroupValues = {
        type: "01"
      };
      that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        //console.log(tabledata);
        //console.log(id);
        if (tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "轮播图详情";
          that.dialogFormSettings.dialogFormItems.formGroupList = dialogViewFormItems;
          that.dialogFormSettings.dialogFormItems.formButtonList = [];
          that.dialogFormSettings.dialogFormItems.formGroupValues = tabledata;
          that.dialogFormSettings.dialogFormVisible = true;
          that.dialogFormSettings.dialogType = "form";
        }
      });
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      let that = this,
        postdata;
      if (type == "edit") {
        let dialogEditData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == id) {
            dialogEditData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        delete dialogEditData.operateBtns;
        that.dialogFormSettings.dialogFormTitle = "编辑轮播图";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogEditData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      } else {
        postdata = {
          sysId: id
        };
        that.$http(that.$api.removeBanner(), postdata).then(xhr => {
          if (xhr.success) {
            that.$message({
              message: "操作成功！",
              type: "success"
            });
            that.handleSearchSubmit();
          }
        });
      }
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data, postDatas) {
      let options = {
        doActionFncName: "handleSearchSubmit"
      };
      if (!postDatas.hasUpdFiles) {
        this.$message({
          message: "请选择图片",
          type: "error"
        });
        return false;
      }
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取轮播图列表信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage
        },
        searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$http(that.$api.getBannerlist(), postdata).then(xhr => {
        if (xhr && xhr.rows) {
          xhr.rows.map(item => {
            if (item.files && item.files.length > 0) {
              item.files.map(file => {
                file.name = file.fileName;
              });
            }
            let operateBtns = [
              {
                id: item.sysId,
                text: "编辑",
                type: "edit"
              },
              {
                id: item.sysId,
                text: "删除",
                type: "remove"
              }
            ];
            item.operateBtns = operateBtns;
            item.begintime = that.$globalFnc.dateStampFormat(item.begintime);
            item.endtime = that.$globalFnc.dateStampFormat(item.endtime);
            if (item.files) {
              item.files = that.$globalFnc.fileFormat(
                item.files,
                "imgPhotoViewUrl",
                "viewPic"
              );
            }
          });
          that.tablelistSettings.tableDatas = xhr.rows;
          that.paginationSettings.totalNumbers = parseInt(xhr.total);
        }
      });
    }
  },
  mounted() {
    this.handleSearchSubmit();
  }
};
</script>
