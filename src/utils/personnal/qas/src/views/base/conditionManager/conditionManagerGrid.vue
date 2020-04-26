<template>
  <div class="common_table_container">
    <conditionManagerSearch
      :defaultSearchData="defaultSearchData"
      class="pl15 pr15"
      @doSearch="doSearch"
    />
    <div class="tool-bar">
      <operateButtonsGroup
        :operateButtonsSettings="operateButtonsSettings"
        @handleOperateButton="handleOperateButton"
        @handleDropItemButton="handleDropItemButton"
      />
    </div>
    <el-tabs v-model="activeName" class="standar_tabs" type="card">
      <el-tab-pane label="分类条件管理" name="condition">
        <div class="table-tabs">
          <tableList
            :tablelistSettings="demoTableSettings"
            @handleTableRowButton="handleTableRowButton"
            @handleTableMutiChecked="handleSelectionChange"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
    />
    <dialogForm
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
      @linkSelect="linkSelect"
    />
  </div>
</template>

<script>
import conditionManagerSearch from "./conditionManagerSearch";
// import conditionManagerSearch form "./conditionManagerSearch";

// 配置数据引入
import tableHeader from "@/utils/formSettingsJson/conditionManager/tableHeader.json";
import dialogSetTargetFormBtns from "@/utils/formSettingsJson/conditionManager/dialogSetTargetFormBtns.json";
import dialogUpdateTargetFormBtns from "@/utils/formSettingsJson/conditionManager/dialogUpdateTargetFormBtns.json";
import dialogSetTargetFormItems from "@/utils/formSettingsJson/conditionManager/dialogSetTargetFormItems.json";
import dialogUpdateTargetFormItems from "@/utils/formSettingsJson/conditionManager/dialogUpdateTargetFormItems.json";
import operateButtonListData from "@/utils/formSettingsJson/conditionManager/operateButtonListData.json";
// 校验规则
import setConditionRule from "@/utils/formRulesJson/conditionManager/setConditionRule";

export default {
  name: "conditionManagerGrid",
  components: {
    conditionManagerSearch
  },
  data() {
    return {
      // 搜索栏默认下拉数据
      defaultSearchData: {
        busintypelist: [],
        grainbreedlist: [],
        gradedlist: [
          {
            label: "是",
            value: "Y"
          },
          {
            label: "否",
            value: "N"
          }
        ]
      },
      // 搜索条件
      searchData: {},
      // 页面页码
      page: 1,
      // table复选框已勾选集合
      checkedTableRow: [],
      // 检测指标树
      mainTableData: [],
      // 检测项目树
      testProjectlist: [],
      /**
       * 当前tab激活状态值
       */
      activeName: "condition",
      /**
       * dialog 内置form表单对话框基本数据配置
       */
      dialogFormSettings: {
        dialogFormTitle: "",
        dialogType: "form",
        dialogFormVisible: false,
        dialogFormItems: {
          formGroupList: [],
          formGroupValues: {},
          formButtonList: [],
          rules: setConditionRule.rule
        }
      },
      /**
       * operateButtons 按钮组配置
       */
      operateButtonsSettings: {
        moduleName: "part1",
        buttonListData: operateButtonListData
      },
      /**
       * table 顶部demo表格配置
       */
      demoTableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "demo",
          // headerRowClassName: "text-danger",
          // rowClassName: "text-warning",
          rowKey: "id",
          tooltipEffect: "dark",
          border: true,
          headerOptions: tableHeader,
          isMultipleTable: false,
          treeProps: {
            children: "children",
            hasChildren: "hasChildren"
          }
        }
      },
      /**
       * pagination 分页器基本数据配置
       */
      paginationSettings: {
        currentPage: 1,
        pageSize: this.$constants.numberPerpage,
        layout: this.$constants.paginationlayout,
        totalNumbers: 30
      }
    };
  },
  methods: {
    // 对话框更改选项，联动回调
    linkSelect(link, data) {
      let cflag = true,
        bflag = true,
        gflag = true;
      if (link == "graded") {
        this.dialogFormSettings.dialogFormItems.formGroupValues.condictType =
          "";
        if (data == "Y") {
          cflag = true;
          bflag = false;
          gflag = true;
        } else {
          cflag = false;
          bflag = true;
          gflag = true;
        }
      } else {
        if (data == "dicType") {
          cflag = false;
          bflag = false;
          gflag = true;
        } else {
          cflag = false;
          bflag = true;
          gflag = false;
        }
      }
      dialogSetTargetFormItems.map(item => {
        if (item.name == "condictType") {
          item.hideItem = cflag;
        }
        if (item.name == "busintypeid") {
          item.hideItem = bflag;
        }
        if (item.name == "grainbreedId") {
          item.hideItem = gflag;
        }
      });
    },
    /* 搜索栏点击事件 */
    doSearch(query) {
      this.page = 1;
      this.searchData = query;
      console.log(query);
      this.getMainTableDatalist();
    },
    /* operateButtons点击事件 */
    handleOperateButton(button) {
      if (button.flag == "duplicateOperation") return false;
      this.dialogFormSettings.dialogFormItems.formGroupList = dialogSetTargetFormItems;
      this.dialogFormSettings.dialogFormItems.formButtonList = dialogSetTargetFormBtns;
      this.dialogFormSettings.dialogFormItems.formGroupValues = {
        name: "",
        graded: "",
        busintypeid: "",
        grainbreedId: ""
      };
      this.dialogFormSettings.dialogFormTitle = button.label;
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
    },
    /* operateButtons下拉点击事件 */
    handleDropItemButton(id) {
      //console.log(id.value, "id");
      if (id.value == "remove") {
        this.$confirm("此操作将删除您已选择的数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message.success("删除成功!");
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      }
    },
    /* 点击分页器页码按钮操作 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getMainTableDatalist();
    },
    /* 点击table操作栏按钮操作 */
    handleTableRowButton(rowData, button) {
      if (button.type == "edit") {
        this.dialogFormSettings.dialogFormItems.formButtonList = dialogUpdateTargetFormBtns;
        this.dialogFormSettings.dialogFormTitle = "编辑分类条件信息";
        this.dialogFormSettings.dialogFormItems.formGroupList = dialogUpdateTargetFormItems;
        this.dialogFormSettings.dialogFormItems.formGroupValues = rowData;
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogType = "form";
      } else {
        let params = {
          qasBasCriteriaTagId: rowData.qasBasCriteriaTagId
        };
        this.$confirm("此操作将删除本条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$Api[button.postUrl](params).then(() => {
              //console.log(data);
              this.getMainTableDatalist();
              this.$message.success("删除成功!");
            });
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      }
    },
    /* 点击table前面的复选框获取已选数据操作 */
    handleSelectionChange(data) {
      this.checkedTableRow = data;
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      this.$Api[btn.postUrl](data).then(() => {
        this.getMainTableDatalist();
        this.dialogFormSettings.dialogFormVisible = false;
      });
    },
    /* 获取分类条件列表 */
    getMainTableDatalist() {
      let queryParam = JSON.parse(JSON.stringify(this.searchData));
      queryParam.page = this.page;
      queryParam.rows = this.$constants.numberPerpage;
      this.$Api.getTaglist(queryParam).then(data => {
        let options = {
          propName: "operateBtns", //必填
          propParent: [
            // {
            //   type: "edit",
            //   styleType: "text",
            //   text: "编辑",
            //   postUrl: "updateTag"
            // },
            {
              type: "remove",
              styleType: "text",
              text: "删除",
              postUrl: "deleteTag"
            }
          ]
        };
        if (data.code == "0" && data.rows && data.rows.length > 0) {
          this.$dateUtl.addPropInTreedata(data.rows, options);
        }
        data.rows.map(row => {
          if (row.updated) {
            row.updatedTime = this.$dateUtl.getTime(row.updated, "sec");
          }
        });
        this.mainTableData = data.rows || [];
        this.demoTableSettings.tableDatas = this.mainTableData;
        this.paginationSettings.totalNumbers = data.total;
      });
    }
  },
  mounted() {
    this.getMainTableDatalist();
    this.$Api.gradeLevel().then(xhr => {
      this.defaultSearchData.grainbreedlist = this.$dateUtl.dealDicData(
        xhr,
        "name",
        "sysId"
      );
      dialogSetTargetFormItems.map(item => {
        if (item.name == "grainbreedId") {
          item.data = this.$dateUtl.dealDicData(xhr, "name", "sysId");
        }
      });
      dialogUpdateTargetFormItems.map(item => {
        if (item.name == "grainbreedId") {
          item.data = this.$dateUtl.dealDicData(xhr, "name", "sysId");
        }
      });
    });
    this.$Api
      .getDicData({ _refKey: "businType", sysType: "oh-qas" })
      .then(xhr => {
        this.defaultSearchData.busintypelist = this.$dateUtl.dealDicData(
          xhr,
          "text",
          "value"
        );
        dialogSetTargetFormItems.map(tarItem => {
          if (tarItem.name == "busintypeid") {
            tarItem.data = this.$dateUtl.dealDicData(xhr, "text", "value");
          }
        });
        dialogUpdateTargetFormItems.map(tarItem => {
          if (tarItem.name == "busintypeid") {
            tarItem.data = this.$dateUtl.dealDicData(xhr, "text", "value");
          }
        });
      });
  }
};
</script>
