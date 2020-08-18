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
// 配置项数据
import ueEditorToolbarSettings from "@/utils/formSettingsJson/infosManage/setNewInfo/ueEditorToolbarSettings.js";
import workReportsSearchItems from "@/utils/formSettingsJson/infosManage/workReports/workReportsSearchItems";
import workReportsSearchBtns from "@/utils/formSettingsJson/infosManage/workReports/workReportsSearchBtns.json";
import workReportsOperateBtns from "@/utils/formSettingsJson/infosManage/workReports/workReportsOperateBtns.json";
import workReportsTableHeaderOpts from "@/utils/formSettingsJson/infosManage/workReports/workReportsTableHeaderOpts.json";
import editInfoFormItems from "@/utils/formSettingsJson/infosManage/setNewInfo/newInfoFormItems.json";
import editInfoFormBtns from "@/utils/formSettingsJson/infosManage/workReports/dialogSettings/EditInfoFormBtns.json";
// 配置校验规则
import editInfoFormRule from "@/utils/formRulesJson/infosManage/setNewInfo/newInfoFormRule";
// 引入信息查看页面
import showInfo from "./showInfoPage";
export default {
  name: "workReports",
  components: {
    showInfo
  },
  data() {
    return {
      dialogShowInfoDialogSettings: {
        title: "",
        dialogShowInfoVisible: false,
        showInfoData: {}
      },
      // 顶部搜索栏显示配置，默认显示
      showSearchForm: true,
      // dialog 内置form表单对话框基本数据配置
      dialogFormSettings: {
        dialogFormTitle: "编辑信息",
        dialogFormVisible: false,
        width: "70%",
        dialogFormItems: {
          formItemSpan: 12,
          formGroupList: editInfoFormItems,
          formGroupValues: {},
          formButtonList: editInfoFormBtns,
          // formGroupTypeUpload: "true",
          // formGroupTypeUploadName: "uploadName",
          rules: editInfoFormRule.rule
        }
      },
      // 标题管理
      titles: {
        searchTitel: "查询条件",
        tableTitle: "工作简报"
      },
      titlesManage: {
        workReports: "工作简报",
        notification: "通知公告",
        dataDownload: "资料下载",
        dynamic: "各地动态",
        inspectionFile: "考核文件",
        indexInfosDistribution: "信息报送",
        infosDistribution: "信息报送",
        inspectionReport: "考核通报",
        essenceInfo: "精华信息",
        hangzhou: "杭州",
        myIssue: "我的发布",
        stuff: "草稿箱"
      },
      // 搜索栏表单配置
      formGroupSettings: {
        formItemSpan: 12,
        formGroupList: workReportsSearchItems,
        formGroupValues: {},
        formButtonList: workReportsSearchBtns
      },
      // operateButtons 按钮组配置
      operateButtonsSettings: {
        moduleName: "tableList",
        buttonListData: workReportsOperateBtns
      },
      // table 表格配置
      tablelistSettings: {
        tableDatas: [],
        tableSettingOptions: {
          tooltipEffect: "dark",
          rowKey: "id",
          border: true,
          headerOptions: workReportsTableHeaderOpts
        }
      },
      // pagination 分页器基本数据配置
      paginationSettings: {
        currentPage: 1,
        layout: "total, prev, pager, next, jumper",
        totalNumbers: 0
      },
      // 当前页面代码
      page: 1,
      defaultTabledatas: []
    };
  },
  methods: {
    /**
     * 搜索栏数据筛选
     * @params:{}
     */
    handleSearchSubmit(flag, data) {
      console.log(flag, data);
      let tabledatas = this.$globalFnc.deepCopy(
        this.tablelistSettings.tableDatas
      );
      if (data.title) {
        this.tablelistSettings.tableDatas = tabledatas.filter(
          item => item.title.indexOf(data.title) > -1
        );
      } else {
        this.tablelistSettings.tableDatas = this.defaultTabledatas;
      }
      this.paginationSettings.totalNumbers = this.tablelistSettings.tableDatas.length;
    },
    /**
     * operateButtons点击事件
     */
    handleOperateButton(data) {
      if (data.flag == "closeSearch") {
        this.showSearchForm = !this.showSearchForm;
        if (this.showSearchForm) {
          data.label = "关闭查询";
        } else {
          data.label = "开启查询";
        }
      }
      if (data.flag == "newSet") {
        this.$router.push("/informationsPage/infosManage/setNewInfo");
      }
    },
    /**
     * 编辑信息对话框点击事件
     */
    handleDialogForm(btn, data) {
      data.updateTime = this.$globalFnc.dateStampFormat(new Date().getTime());
      if (this.$route.name == "stuff") {
        if (btn.flag == "publish") {
          this.$store
            .dispatch("app/commitRemoveInfoFromStuffList", data.id)
            .then(() => {
              data.id = this.$store.getters["app/allInfosList"].length + 1;
              this.$store
                .dispatch("app/commitAddInfoToAllInfosList", data)
                .then(() => {
                  this.getInfolist("stuff");
                });
            });
        } else {
          this.$store
            .dispatch("app/commitEditInfoFromStuffList", data)
            .then(() => {
              this.getInfolist("stuff");
            });
        }
      } else if (this.$route.name == "myIssue") {
        this.$store
          .dispatch("app/commitEditInfoFromAllInfosList", data)
          .then(() => {
            this.getInfolist("myIssue");
          });
      }
      this.dialogFormSettings.dialogFormVisible = false;
    },
    /**
     * table 标题栏点击事件
     */
    handleTableItem(id, type, row) {
      this.dialogShowInfoDialogSettings.title = this.titlesManage[
        row.subColumn
      ];
      this.dialogShowInfoDialogSettings.dialogShowInfoVisible = true;
      this.dialogShowInfoDialogSettings.showInfoData = row;
    },
    /**
     * table 按钮点击事件
     */
    handleTableRowButton(rowData, btn) {
      if (btn.type == "remove") {
        this.$confirm("您确定要删除当前信息吗？", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(confirm => {
            console.log(confirm);
            if (this.$route.name == "stuff") {
              this.$store
                .dispatch("app/commitRemoveInfoFromStuffList", rowData.id)
                .then(() => {
                  this.getInfolist("stuff");
                });
            } else if (this.$route.name == "myIssue") {
              this.$store
                .dispatch("app/commitRemoveInfoFromAllInfosList", rowData.id)
                .then(() => {
                  this.getInfolist("myIssue");
                });
            }
          })
          .catch();
      } else if (btn.type == "edit") {
        if (editInfoFormBtns.length > 1) {
          editInfoFormBtns.pop();
        }
        if (this.$route.name == "stuff") {
          editInfoFormBtns.push({
            flag: "publish",
            size: "",
            icon: "",
            label: "发布",
            styleType: "primary",
            postUrl: "addRegisterMember"
          });
        }
        this.dialogFormSettings.dialogFormItems.formGroupValues = rowData;
        this.dialogFormSettings.dialogFormVisible = true;
      }
    },
    /**
     * 点击分页器页码
     */
    handlePaginationPagenumber(num) {
      this.tablelistSettings.tableDatas = [];
      this.page = num;
      this.tablelistSettings.tableDatas = this.$globalFnc
        .deepCopy(this.defaultTabledatas)
        .splice(10 * (this.page - 1), 10 * (this.page - 1) + 10);
    },
    /**
     * 切换地址触发回调
     */
    getRouteName(name) {
      return new Promise(relsove => {
        if (workReportsOperateBtns.length > 1) {
          workReportsOperateBtns.shift();
        }
        if (workReportsTableHeaderOpts.length > 6) {
          workReportsTableHeaderOpts.pop();
        }
        workReportsSearchItems.map(item => {
          if (item.name == "subColumn") {
            item.hideItem = true;
          }
        });
        if (name == "infosDistribution" || name == "indexInfosDistribution") {
          workReportsOperateBtns.unshift({
            flag: "newSet",
            size: "",
            icon: "",
            label: "新建",
            styleType: "primary",
            postUrl: "addRegisterMember"
          });
        } else if (name == "myIssue" || name == "stuff") {
          workReportsTableHeaderOpts.push({
            prop: "operateBtns",
            lable: "操作",
            propType: "operateBtns",
            width: "200"
          });
          workReportsSearchItems.map(item => {
            if (item.name == "subColumn") {
              item.hideItem = false;
            }
          });
        }
        this.titles.tableTitle = this.titlesManage[name];
        relsove(name);
      });
    },
    getInfolist(name) {
      this.tablelistSettings.tableDatas = [];
      let tabledataSet = [];
      if (name == "stuff") {
        this.$store.getters["app/stuffList"].map(item => {
          if (item.userId == this.$store.getters["user/userInfos"].userId) {
            item.operateBtns = [
              {
                id: item.id,
                text: "编辑",
                styleType: "primary",
                type: "edit"
              },
              {
                id: item.id,
                text: "删除",
                styleType: "danger",
                type: "remove"
              }
            ];
            tabledataSet.push(item);
          }
        });
      } else {
        this.$store.getters["app/allInfosList"].map(item => {
          if (name == "myIssue") {
            if (item.userId == this.$store.getters["user/userInfos"].userId) {
              item.operateBtns = [
                {
                  id: item.id,
                  text: "编辑",
                  styleType: "primary",
                  type: "edit"
                },
                {
                  id: item.id,
                  text: "删除",
                  styleType: "danger",
                  type: "remove"
                }
              ];
              tabledataSet.push(item);
            }
          } else {
            if (name == "indexInfosDistribution") {
              if (item.subColumn == "infosDistribution") {
                tabledataSet.push(item);
              }
            } else {
              if (item.subColumn == name) {
                tabledataSet.push(item);
              }
            }
          }
        });
      }
      tabledataSet.sort(this.sortObjAttrFromBigToSmall("addTime"));
      this.defaultTabledatas = this.$globalFnc.deepCopy(tabledataSet);
      this.tablelistSettings.tableDatas = this.$globalFnc
        .deepCopy(tabledataSet)
        .splice(0, 10);
      this.paginationSettings.totalNumbers = tabledataSet.length;
    },
    sortObjAttrFromBigToSmall(keyName) {
      return function(objectN, objectM) {
        var valueN = objectN[keyName];
        var valueM = objectM[keyName];
        if (valueN < valueM) return 1;
        else if (valueN > valueM) return -1;
        else return 0;
      };
    }
  },
  mounted() {
    editInfoFormItems.map(item => {
      if (item.name == "editoStr") {
        item.config.toolbars = ueEditorToolbarSettings;
      }
    });
    workReportsSearchItems.map(item => {
      if (item.name == "orgName") {
        item.data = this.$store.getters["user/orgTree"];
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
