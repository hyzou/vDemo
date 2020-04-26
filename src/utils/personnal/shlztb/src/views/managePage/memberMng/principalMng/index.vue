<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
          <el-col class="mb20" :span="24">
            <commonTitleWithBorder :title="titles.searchTitel" />
          </el-col>
          <el-col class="mb20" :span="24">
            <formGroup
              :formGroupSettings="formGroupSettings"
              @formGroupSubmit="handleSearchSubmit"
            />
          </el-col>
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
      @linkSelect="handleDialogSelectChange"
    />
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import searchFormBtnList from "@/utils/formSettingsJson/principalMng/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/principalMng/searchFormItems.json";
import tableOperationsBtnList from "@/utils/formSettingsJson/principalMng/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/principalMng/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/principalMng/dialogFormItems.json";
import dialogFormItemslist from "@/utils/formSettingsJson/principalMng/dialogEditFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/principalMng/dialogAddFormBtns.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/principalMng/dialogEditFormBtns.json";
import dialogFormRules from "@/utils/formRulesJson/memberRegist/dialogRule";
import dialogViewFormItems from "@/utils/formSettingsJson/principalMng/dialogViewFormItems.json";
export default {
  name: "principalMng",
  components: {
    commonTitleWithBorder,
    formGroup,
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
        tableTitle: "委托方列表"
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      formGroupSettings: {
        formItemSpan: 12,
        formGroupList: searchFormItemslist,
        formGroupValues: {
          memType: "2"
        },
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
          rowKey: "basMemberId",
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
          formItemSpan: 12,
          formGroupList: [],
          formGroupValues: {
            memType: "2"
          },
          formButtonList: [],
          rules: dialogFormRules.rule
        }
      },
      /**
       * searchbar 记录搜索栏搜索记录
       */
      searchInfo: {},
      page: 1,
      filterRules: [
        {
          field: "memType",
          value: "2",
          op: "equal"
        }
      ]
    };
  },
  methods: {
    /* operateButtons点击事件 */
    handleOperateButton() {
      let that = this;
      that.dialogFormSettings.dialogFormItems.formGroupValues = {
        memType: "2"
      };
      that.dialogFormSettings.dialogFormVisible = true;
      that.dialogFormSettings.dialogType = "form";
      that.dialogFormSettings.dialogFormTitle = "注册委托方帐号";
      that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormAddBtnlist;
    },
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let option = {
        containByNames: ["loginName", "companyName"],
        doActionFncName: "getDataList"
      };
      this.$searchformBtnAction(this, data, option);
    },
    /* table每栏操作项点击事件 */
    handleTableItem(id) {
      let that = this;
      that.tablelistSettings.tableDatas.map(tabledata => {
        if (tabledata.basMemberId == id) {
          that.dialogFormSettings.dialogFormTitle = "委托方详情";
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
        let dialogData;
        that.tablelistSettings.tableDatas.map(itemdata => {
          if (itemdata.basMemberId == id) {
            dialogData = JSON.parse(JSON.stringify(itemdata));
          }
        });
        that.dialogFormSettings.dialogFormTitle = "编辑委托方信息";
        that.dialogFormSettings.dialogFormItems.formGroupList = dialogFormItemslist;
        that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
        that.dialogFormSettings.dialogFormItems.formGroupValues = dialogData;
        that.dialogFormSettings.dialogFormVisible = true;
        that.dialogFormSettings.dialogType = "form";
      } else {
        this.$confirm("您正在执行重置密码操作，是否继续?", "提示", {
          confirmButtonText: "继续",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          postdata = {
            basMemberId: id.basMemberId
          };
          that.$http(that.$api.resetMemberPsd(), postdata).then(xhr => {
            if (xhr.success) {
              this.$alert("操作成功！该用户密码已重置为000000!", "提示");
              that.handleSearchSubmit();
            }
          });
        });
      }
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.page = num;
      this.getDataList(this.searchInfo);
    },
    /* 点击对话框更改数据联动操作 */
    handleDialogSelectChange(link, id) {
      if (!id) {
        this.dialogFormSettings.dialogFormItems.formGroupValues = {
          memType: "2"
        };
        return false;
      }
      let that = this,
        postdata = {
          basMemberId: id
        };
      that.$getData("getMemberInfo", postdata).then(data => {
        let existData = data.data;
        delete existData.loginPassword;
        delete existData.loginName;
        delete existData.flowComments;
        existData.memType = "2";
        existData.existMemberId = id;
        that.dialogFormSettings.dialogFormItems.formGroupValues = existData;
      });
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      // if (btn.flag == "clearform") {
      //   this.dialogFormSettings.dialogFormItems.formGroupValues = {
      //     memType: "2"
      //   };
      //   return false;
      // }
      if (btn.flag == "add") {
        delete data.basMemberId;
        delete data.taskId;
        delete data.processinstId;
      }
      let options = {
        doActionFncName: "handleSearchSubmit"
      };
      data.memType = "2";
      if (data.existMemberId) delete data.existMemberId;
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取数据列表信息 */
    getDataList(query) {
      let that = this,
        postdata = {
          page: this.page,
          rows: this.$global.numberPerpage
        };
      let searchInfos = {};
      if (query && typeof query === "object") {
        if (query.filterRules) {
          searchInfos = JSON.parse(JSON.stringify(query));
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$getData("getMemberList", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.$global.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("getMemberList", postdata).then(xhr => {
            that.dealListData(xhr);
          });
        } else {
          that.dealListData(data);
        }
      });
    },
    dealListData(xhr) {
      xhr.rows.map(item => {
        item.memTypeDsc = item.memType == "2" ? "委托方" : "会员";
        item.operateBtns = [
          {
            text: "编辑",
            type: "edit",
            id: item.basMemberId
          },
          {
            text: "重置密码",
            type: "resetPsw",
            id: {
              basMemberId: item.basMemberId,
              postUrl: "resetMemberPsd"
            }
          }
        ];
        console.log(item.operateBtns);
      });
      this.tablelistSettings.tableDatas = xhr.rows;
      this.paginationSettings.totalNumbers = parseInt(xhr.total);
    }
  },
  mounted() {
    let that = this;
    that.handleSearchSubmit();
    that
      .$getData("PortalDropdownlist", {
        _refKey: "dict",
        busintypeid: "ts_pay_invoicetype"
      })
      .then(data => {
        let invoicetypelist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        searchFormItemslist.map(item => {
          if (item.name == "invoicetype") {
            item.data = invoicetypelist;
          }
        });
        dialogEditFormItemslist.map(item => {
          if (item.name == "invoicetype") {
            item.data = invoicetypelist;
          }
        });
        dialogFormItemslist.map(item => {
          if (item.name == "invoicetype") {
            item.data = invoicetypelist;
          }
        });
        dialogViewFormItems.map(item => {
          if (item.name == "invoicetype") {
            item.data = invoicetypelist;
          }
        });
      });
    that
      .$getData("PortalDropdownlist", {
        _refKey: "member",
        memType: 3,
        _noCache: "true"
      })
      .then(data => {
        let datalist = that.$globalFnc.arrayToFormDropdown(
          data,
          "text",
          "value"
        );
        dialogEditFormItemslist.map(item => {
          if (item.name == "existMemberId") {
            item.data = datalist;
          }
        });
      });
  }
};
</script>
