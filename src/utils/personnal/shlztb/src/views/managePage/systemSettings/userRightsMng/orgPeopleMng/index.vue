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
          <el-col class="mb20" :span="6">
            <commonTitleWithBorder :title="titles.tableTitle" />
          </el-col>
          <el-col :span="18">
            <operateButtonsGroup
              class="textAlignRight"
              v-show="typeId == 1"
              :operateButtonsSettings="operateButtonsSettings"
              @handleOperateButton="handleOperateButton"
            />
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
import operateButtonsGroup from "@/components/operateButtonsGroup";
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import tableList from "@/components/tableList";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/orgPeopleMng/tableHeaderOpt.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/orgPeopleMng/operationBtns.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/orgPeopleMng/dialogAddFormBtns.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/orgPeopleMng/dialogFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/orgPeopleMng/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/orgPeopleMng/dialogViewFormItems.json";
// 配置表单数据校验规则
import dialogFormRules from "@/utils/formRulesJson/orgPeopleMng/dialogRule";

export default {
  name: "orgPeopleMng",
  components: {
    tree,
    commonTitleWithBorder,
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
        tableTitle: "机构人员详情"
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
          rowKey: "orgid",
          border: true,
          headerOptions: tableHeaderOpts
        }
      },
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
    /* operateButtons点击事件 */
    handleOperateButton() {
      dialogEditFormItemslist.map(dialog => {
        if (dialog.name == "orgcode") {
          dialog.disabled = false;
        }
      });
      this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormTitle = "添加机构信息";
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* 当树结构不显示多选框并且被点击节点时触发 */
    handleTreeNodeClick(data) {
      if (this.treeSettings.treeWithCheckbox) {
        return false;
      }
      this.typeId = data.id;
      this.titles.tableTitle = data.text;
      this.getMainDataItem();
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.orgid == id) {
          that.dialogFormSettings.dialogFormTitle = "查看机构信息";
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
        postdata = {
          orgid: id
        };
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.orgid == postdata.orgid) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        dialogEditFormItemslist.map(dialog => {
          if (dialog.name == "orgcode") {
            dialog.disabled = true;
          }
        });
        that.dialogFormSettings.dialogFormTitle = "编辑机构信息";
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
            orgids: id
          };
          that.$http(that.$api.deleteOrganization(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              this.getMainDataList();
              this.getMainDataItem();
            }
          });
        });
      } else if (type == "subOrgs" || type == "subPeople") {
        let pathName = type == "subOrgs" ? "orgSubOrgs" : "orgSubPeople";
        that.$router.push({
          path: pathName,
          query: {
            orgid: id
          }
        });
      }
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      data.parentorgid = "1";
      let options = {
        doActionFncName: "getMainDataList"
      };
      this.$dialogformBtnAction(this, data, btn, options).then(() => {
        if (btn.flag == "add" || btn.flag == "edit") {
          this.getMainDataItem();
        }
      });
    },
    /* 获取列表数据信息 */
    getMainDataList() {
      this.$getData("getOrganizationTree", {}).then(data => {
        this.treeSettings.treeData = data;
        this.typeId =
          data[0].children && data[0].children.length > 0
            ? data[0].children[0].id
            : data[0].id;
        this.titles.tableTitle =
          data[0].children && data[0].children.length > 0
            ? data[0].children[0].text
            : data[0].text;
        this.getMainDataItem();
      });
    },
    /* 获取数据详情信息 */
    getMainDataItem() {
      let postdata = {
          orgid: this.typeId
        },
        that = this;
      this.$getData("getOrganizationDetail", postdata).then(xhr => {
        if (xhr.data) {
          let tableArr = [],
            dataObj = {
              code: "0",
              httpStatus: 200,
              rows: [],
              success: true,
              total: 1
            },
            operateBtns = [
              {
                text: "编辑",
                type: "edit"
              },
              {
                text: "删除",
                type: "remove"
              },
              {
                text: "下属机构",
                type: "subOrgs"
              },
              {
                text: "下属人员",
                type: "subPeople"
              }
            ];
          tableArr.push(xhr.data);
          dataObj.rows = tableArr;
          that.$dealData(that, dataObj, "orgid", operateBtns, []);
        } else {
          that.tablelistSettings.tableDatas = [];
          if (that.typeId != "0") {
            that.typeId = "";
          }
        }
      });
    }
  },
  mounted() {
    this.getMainDataList();
    this.$getData("PortalDropdownlist", {
      _refKey: "dict",
      busintypeid: "ts_auction_ownerfund"
    }).then(data => {
      let datalist = this.$globalFnc.arrayToFormDropdown(data, "text", "value");
      dialogViewFormItems.map(item => {
        if (item.name == "flagFund") {
          item.data = datalist;
        }
      });
      dialogEditFormItemslist.map(item => {
        if (item.name == "flagFund") {
          item.data = datalist;
        }
      });
    });
    this.$getData("getOrganizationPeopleList", {
      page: 1,
      rows: 1000,
      filterRules: JSON.stringify([{ field: "type", value: "1", op: "equal" }])
    }).then(data => {
      let datalist = this.$globalFnc.arrayToFormDropdown(
        data.rows,
        "operatorname",
        "operatorid"
      );
      dialogEditFormItemslist.map(item => {
        if (item.name == "managerid") {
          item.data = datalist;
        }
      });
      dialogViewFormItems.map(item => {
        if (item.name == "managerid") {
          item.data = datalist;
        }
      });
    });
  }
};
</script>
