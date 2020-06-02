<template>
  <div class="common_table_container">
    <standarSearch
      :defaultSearchData="defaultSearchData"
      class="pl15 pr15"
      @doSearch="doSearch"
    />
    <div class="tool-bar">
      <operateButtonsGroup
        :operateButtonsSettings="operateButtonsSettings"
        @handleOperateButton="handleOperateButton"
      />
    </div>
    <div class="mt20 ml20 mr20">
      <tableList
        :tablelistSettings="demoTableSettings"
        @handleTableItem="handleTableItem"
        @handleTableRowButton="handleTableRowButton"
        @handleTableMutiChecked="handleSelectionChange"
      />
    </div>
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
    />
    <el-dialog
      v-if="dialogVisible"
      title="标准设定"
      width="960px"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <newStandard
        ref="newstd"
        :defaultData="standardData"
        @refreshlist="refreshlist"
      />
    </el-dialog>
    <el-dialog
      v-if="dialogMethodVisible"
      title="检测方法设定"
      width="960px"
      :visible.sync="dialogMethodVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <newStandardMethod
        ref="newstdMethod"
        :defaultData="standardMethodData"
        @refreshlist="refreshlist"
      />
    </el-dialog>
    <el-dialog
      v-if="dialogViewVisible"
      title="标准设定"
      :visible.sync="dialogViewVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <showStandard ref="showstd" :defaultData="standardData" />
    </el-dialog>
  </div>
</template>

<script>
// 页面组件引入
import newStandard from "./newStandard";
import newStandardMethod from "./newStandardMethod";
import showStandard from "./showStandard";
import standarSearch from "./standarSearch";

// 配置数据引入
import tableHeader from "@/utils/formSettingsJson/standardManager/tableHeader.json";
import operateButtonListData from "@/utils/formSettingsJson/standardManager/operateButtonListData.json";

export default {
  name: "standarGrid",
  components: {
    newStandard,
    newStandardMethod,
    showStandard,
    standarSearch
  },
  data() {
    return {
      // 搜索栏默认下拉数据
      defaultSearchData: {
        productTypelist: [],
        issuedBylist: [],
        standartTypelist: [
          {
            label: "产品判定标准",
            value: "1"
          },
          {
            label: "检测方法",
            value: "2"
          },
          {
            label: "其他",
            value: "9"
          }
        ]
      },
      // 搜索条件
      searchData: {},
      // 当前页面页码
      page: 1,
      // 显示标准设定对话框默认值，不可更改
      dialogViewVisible: false,
      // 检测标准设定对话框，新建修改
      dialogVisible: false,
      // 检测方法设定对话框，新建修改
      dialogMethodVisible: false,
      // 检测标准设定默认值
      standardData: {},
      // 检测方法设定默认值
      standardMethodData: {},
      // table复选框已勾选集合
      checkedTableRow: [],
      // 检测指标树
      testTargetlist: [],
      // 检测项目树
      testProjectlist: [],
      /**
       * 当前tab激活状态值，获取标准列表的type值也是从此取值
       */
      activeName: "standard",
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
    /* 搜索栏点击事件 */
    doSearch(query) {
      this.page = 1;
      this.searchData = query;
      this.getMainTableData();
    },
    /* operateButtons点击事件 */
    handleOperateButton(btn) {
      if (btn.flag == "newStdMehtod") {
        this.standardMethodData = {
          type: "2",
          criteriaTags: [],
          stdSuit: "1",
          disable: "N",
          readonly: "false"
        };
        this.dialogMethodVisible = true;
      } else {
        this.standardData = {
          type: "1",
          criteriaTags: [],
          stdSuit: "1",
          disable: "N"
        };
        this.dialogVisible = true;
      }
    },
    /* 点击分页器页码按钮操作 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getMainTableData();
    },
    /* 点击table可点击项操作操作 */
    handleTableItem(id, type, rowdata) {
      if (rowdata.type == "1") {
        this.standardData = {};
        this.$Api.getSingleStd({ qasStdId: id }).then(xhr => {
          xhr.data.strissuedDt = this.$globalFnc.dateStampFormat(
            xhr.data.issuedDt,
            "ymd"
          );
          this.standardData = xhr.data;
          this.dialogViewVisible = true;
        });
      } else {
        this.standardData = {};
        this.$Api.getSingleStdMethod({ qasStdId: id }).then(xhr => {
          xhr.data.strissuedDt = this.$globalFnc.dateStampFormat(
            xhr.data.issuedDt,
            "ymd"
          );
          xhr.data.basItems = xhr.data.basItemIds;
          this.standardMethodData = xhr.data;
          this.standardMethodData.readonly = "true";
          this.dialogMethodVisible = true;
        });
      }
    },
    /* 点击table操作栏按钮操作 */
    handleTableRowButton(rowData, button) {
      if (button.type == "edit") {
        this.standardData = {};
        this.$Api[button.postUrl]({ qasStdId: rowData.qasStdId }).then(xhr => {
          xhr.data.strissuedDt = this.$globalFnc.dateStampFormat(
            xhr.data.issuedDt,
            "ymd"
          );
          if (rowData.type == "1") {
            this.standardData = xhr.data;
            this.dialogVisible = true;
          } else {
            xhr.data.basItems = xhr.data.basItemIds;
            this.standardMethodData = xhr.data;
            this.standardMethodData.readonly = "false";
            this.dialogMethodVisible = true;
          }
        });
      } else {
        rowData.deleted = "1";
        rowData.strissuedDt = rowData.issuedDt;
        this.$confirm("此操作将删除本条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let postdataObj = {};
            postdataObj = rowData;
            // if (rowData.type == "1") {
            //   postdataObj = rowData;
            // } else {
            //   postdataObj.qasStd = { qasStdId: rowData.qasStdId };
            // }
            this.$Api[button.postUrl](postdataObj).then(() => {
              this.getMainTableData();
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
    refreshlist(type) {
      if (type == "addMethods") {
        this.dialogMethodVisible = false;
      }
      this.getMainTableData();
    },
    /* 获取检测标准列表 */
    getMainTableData() {
      let queryParam = {};
      queryParam.page = this.page;
      queryParam.rows = this.$constants.numberPerpage;
      queryParam.type = "1";
      queryParam.deleted = 0;
      Object.assign(queryParam, this.searchData);
      this.$Api.getStdlist(queryParam).then(data => {
        if (data.rows && data.rows.length > 0) {
          data.rows.map(row => {
            let issuedDt = this.$globalFnc.dateStampFormat(row.issuedDt, "ymd"),
              reviseDt = this.$globalFnc.dateStampFormat(row.reviseDt, "ymd"),
              stdItemOptions = [
                {
                  type: "edit",
                  styleType: "text",
                  text: "编辑",
                  postUrl: "getSingleStd"
                },
                {
                  type: "remove",
                  styleType: "text",
                  text: "删除",
                  postUrl: "updateStd"
                }
              ],
              methodOptions = [
                {
                  type: "edit",
                  styleType: "text",
                  text: "编辑",
                  postUrl: "getSingleStdMethod"
                },
                {
                  type: "remove",
                  styleType: "text",
                  text: "删除",
                  // postUrl: "deleteStdMethod"
                  postUrl: "updateStd"
                }
              ];
            row.issuedDt = issuedDt;
            row.reviseDt = reviseDt;
            switch (row.type) {
              case "1":
                row.type_dsc = "产品判定标准";
                row.operateBtns = stdItemOptions;
                break;
              case "2":
                row.type_dsc = "检测方法";
                row.operateBtns = methodOptions;
                break;
              default:
                row.type_dsc = "其他";
                row.operateBtns = stdItemOptions;
                break;
            }
          });
        }
        // this.$dateUtl.addPropInTreedata(data.rows, options);
        this.testProjectlist = data.rows;
        this.demoTableSettings.tableDatas = this.testProjectlist;
        this.paginationSettings.totalNumbers = data.total;
      });
    }
  },
  mounted() {
    this.getMainTableData();
    /**
     * 产品类别:1-油脂、油料;2-粮食;3-食品;99-其他 字典qas_std_productType
     */
    this.$Api.getDic("qas_std_productType").then(xhr => {
      this.defaultSearchData.productTypelist = this.$dateUtl.dealDicData(
        xhr,
        "text",
        "value"
      );
    });
    /**
     * 颁布组织：1-国家标准;2-行业标准;3-企业标准;4-临时标准;5-专业标准;6-其他 qas_std_issuedBy
     */
    this.$Api.getDic("qas_std_issuedBy").then(xhr => {
      this.defaultSearchData.issuedBylist = this.$dateUtl.dealDicData(
        xhr,
        "text",
        "value"
      );
    });
  }
};
</script>
