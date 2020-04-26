<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="8">
        <div class="organization-tree-container">
          <tree
            :treeSettings="treeSettings"
            @handleTreeNodeClick="handleTreeNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="16">
        <div v-show="typeId != null" class="table-container">
          <!-- <el-col class="mb20" :span="24">
            <commonTitleWithBorder :title="titles.searchTitel" />
          </el-col>
          <el-col class="mb20" :span="24">
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
import tree from "@/components/tree";
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
// import formGroup from "@/components/formGroup";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/typeInfoSetting/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/typeInfoSetting/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/typeInfoSetting/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/typeInfoSetting/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/typeInfoSetting/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/typeInfoSetting/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/typeInfoSetting/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/typeInfoSetting/dialogViewFormItems.json";
// 配置表单数据校验规则
import dialogFormRules from "@/utils/formRulesJson/typeInfoSetting/dialogRule";

export default {
  name: "typeInfoSetting",
  components: {
    tree,
    commonTitleWithBorder,
    // formGroup,
    operateButtonsGroup,
    tableList,
    dialogForm
  },
  data() {
    return {
      /**
       * titles 标题管理
       */
      titles: {
        searchTitel: "查询条件",
        tableTitle: "品种信息详情"
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      formGroupSettings: {
        formItemSpan: 12,
        formGroupList: searchFormItemslist,
        formGroupValues: {},
        formButtonList: searchFormBtnList
      },
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
      paginationSettings: {},
      page: 1,
      /**
       * dialog 内置form表单对话框基本数据配置
       */
      dialogFormSettings: {
        dialogFormTitle: "",
        dialogFormVisible: false,
        dialogFormItems: {
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
      filterRules: [],
      treeSettings: {
        treeData: [],
        nodeExpand: false,
        defaultProps: {
          children: "children",
          label: "text"
        },
        treeWithCheckbox: false
      },
      typeId: null
    };
  },
  methods: {
    /* 当树结构不显示多选框并且被点击节点时触发 */
    handleTreeNodeClick(data) {
      if (this.treeSettings.treeWithCheckbox) {
        return false;
      }
      this.typeId = data.id;
      this.titles.tableTitle = data.text;
      this.getDetailTypeInfo();
    },
    /* operateButtons点击事件 */
    handleOperateButton() {
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        sysParentid: this.typeId
      };
      dialogEditFormItemslist.map(item => {
        if (item.name == "code") {
          item.disabled = false;
        }
      });
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormTitle = "新增品种信息";
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.sysId == id) {
          that.dialogFormSettings.dialogFormTitle = "查看品种信息";
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
        if (id instanceof Object) {
          postdata = {
            sysId: id.sysId
          };
        } else {
          postdata = {
            sysId: id
          };
        }
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.sysId == postdata.sysId) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "code") {
            item.disabled = true;
          }
        });
        that.dialogFormSettings.dialogFormTitle = "编辑品种信息";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      } else if (type == "remove") {
        this.$confirm("您正在执行删除操作，是否继续?", "提示", {
          confirmButtonText: "继续删除",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          postdata = {
            sysId: id
          };
          that.$http(that.$api.removeBreedInfo(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              this.getDataList();
              this.getDetailTypeInfo();
            }
          });
        });
      }
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      if (btn.flag == "add") {
        data.sysParentid = this.typeId;
      }
      let options = {
        doActionFncName: "getDataList"
      };
      this.$dialogformBtnAction(this, data, btn, options);
      // .then(() => {
      // if (btn.flag == "add") {
      //   this.getDetailTypeInfo();
      // }
      // });
    },
    /* 获取列表数据信息 */
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
      that.$getData("breedInfoList", postdata).then(data => {
        that.treeSettings.treeData = data;
        if (!that.typeId) {
          that.typeId =
            data[0].children && data[0].children.length > 0
              ? data[0].children[0].id
              : data[0].id;
          that.titles.tableTitle =
            data[0].children && data[0].children.length > 0
              ? data[0].children[0].text
              : data[0].text;
        }
        that.getDetailTypeInfo();
      });
    },
    /* 获取品种数据信息 */
    getDetailTypeInfo() {
      let postdata = {
          sysId: this.typeId
        },
        that = this;
      if (!postdata.sysId) {
        return false;
      }
      this.$getData("breedInfoDetail", postdata).then(xhr => {
        if (xhr.data) {
          xhr.data.status_dsp = xhr.data.status == "1" ? "启用" : "禁用";
          this.typeId = xhr.data.sysId;
          this.titles.tableTitle = xhr.data.name;
          let tableArr = [],
            dataObj = {
              code: "0",
              httpStatus: 200,
              rows: [],
              success: true,
              total: 1
            };
          tableArr.push(xhr.data);
          dataObj.rows = tableArr;
          that.$dealData(that, dataObj, "sysId", null, []);
        } else {
          that.tablelistSettings.tableDatas = [];
          that.typeId = "";
        }
      });
    }
  },
  mounted() {
    this.getDataList();
  }
};
</script>
