<template>
  <div class="unit-organization" style="height:100%;">
    <el-row style="height:100%;">
      <el-col :span="8" style="height:100%;">
        <div
          class="organization-tree-container"
          style="height:100%;overflow-y:auto"
        >
          <tree
            :treeSettings="treeSettings"
            @handleTreeNodeClick="handleTreeNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="16">
        <div v-show="typeId != null" class="table-container">
          <el-col class="mb20" :span="24">
            <el-col :span="6">
              <commonTitleWithBorder :title="titles.tableTitle" />
            </el-col>
            <el-col :span="18">
              <operateButtonsGroup
                class="textAlignRight"
                v-show="!isLeaf || typeId == 0"
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
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import tableOperationsBtnList from "@/utils/formSettingsJson/sysMenuMng/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/sysMenuMng/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/sysMenuMng/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/sysMenuMng/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/sysMenuMng/dialogEditFormBtns.json";
import dialogViewFormItems from "@/utils/formSettingsJson/sysMenuMng/dialogViewFormItems.json";
// 配置表单数据校验规则
import dialogFormRules from "@/utils/formRulesJson/sysMenuMng/dialogRule";

export default {
  name: "sysMenuMng",
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
        tableTitle: "系统菜单详情"
      },
      /**
       * operateButtons 按钮组配置
       */
      operateButtonsSettings: {
        moduleName: "tableList",
        buttonListData: tableOperationsBtnList
      },
      paginationSettings: {},
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "dark",
          rowKey: "menuid",
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
      typeId: null,
      isLeaf: false
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
        parentsid: this.typeId,
        isaction: "0",
        sysType: "0"
      };
      dialogEditFormItemslist.map(item => {
        if (item.name == "menuid") {
          item.disabled = false;
        }
      });
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
      this.dialogFormSettings.dialogFormTitle = "新增系统菜单";
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.menuid == id) {
          that.dialogFormSettings.dialogFormTitle = "查看系统菜单";
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
            menuid: id.menuid
          };
        } else {
          postdata = {
            menuid: id
          };
        }
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.menuid == postdata.menuid) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "menuid") {
            item.disabled = true;
          }
        });
        that.dialogFormSettings.dialogFormTitle = "编辑系统菜单";
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
            menuid: id
          };
          that.$http(that.$api.deletemenu(), postdata).then(xhr => {
            if (xhr.success) {
              that.$message({
                message: "操作成功！",
                type: "success"
              });
              this.typeId = null;
              this.tradeInformationList();
              // this.getDetailTypeInfo();
            }
          });
        });
      } else if (type == "open" || type == "stop") {
        let status;
        status = type == "open" ? "1" : "0";
        postdata = {
          menuids: id,
          status: status
        };
        that.$http(that.$api.updateMenuStatusMuti(), postdata).then(xhr => {
          if (xhr.success) {
            that.$message({
              message: "操作成功！",
              type: "success"
            });
            this.tradeInformationList();
            this.getDetailTypeInfo();
          }
        });
      }
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      if (btn.flag == "add") {
        data.parentsid = this.typeId;
      }
      data.isaction = data.isaction ? data.isaction : "0";
      let options = {
        doActionFncName: "tradeInformationList"
      };
      this.$dialogformBtnAction(this, data, btn, options).then(() => {
        if (this.typeId) {
          this.getDetailTypeInfo();
        }
      });
    },
    /* 获取列表数据信息 */
    tradeInformationList(query) {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.$global.numberPerpage
        },
        searchInfos = {},
        promise;
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      promise = new Promise(resolve => {
        that.$getData("getAllMenuTree", postdata).then(data => {
          that.treeSettings.treeData = data;
          resolve(data);
        });
      });
      return promise;
    },
    /* 获取菜单数据信息 */
    getDetailTypeInfo() {
      let postdata = {
          menuid: this.typeId
        },
        that = this;
      this.$getData("getMenuDetail", postdata).then(xhr => {
        if (xhr.data) {
          that.isLeaf = xhr.data.isleaf == "N" ? false : true;
          xhr.data.isleaf_dsp = xhr.data.isleaf == "N" ? "否" : "是";
          xhr.data.status_dsp = xhr.data.status == "1" ? "启用" : "禁用";
          let tableArr = [],
            dataObj = {
              code: "0",
              httpStatus: 200,
              rows: [],
              success: true,
              total: 1
            },
            operateBtns = [],
            isOpen = xhr.data.status == "1" ? "false" : "true",
            isClose = xhr.data.status == "1" ? "true" : "false";
          operateBtns.push(
            {
              text: "编辑",
              type: "edit"
            },
            {
              text: "删除",
              type: "remove"
            },
            {
              text: "启用",
              type: "open",
              showflag: isOpen
            },
            {
              text: "禁用",
              type: "stop",
              showflag: isClose
            }
          );
          tableArr.push(xhr.data);
          dataObj.rows = tableArr;
          that.$dealData(that, dataObj, "menuid", operateBtns, []);
        } else {
          that.tablelistSettings.tableDatas = [];
          that.typeId = "";
        }
      });
    }
  },
  mounted() {
    let that = this;
    this.tradeInformationList().then(data => {
      that.typeId =
        data[0].children && data[0].children.length > 0
          ? data[0].children[0].id
          : data[0].id;
      that.titles.tableTitle =
        data[0].children && data[0].children.length > 0
          ? data[0].children[0].text
          : data[0].text;
      that.getDetailTypeInfo();
    });
  }
};
</script>
