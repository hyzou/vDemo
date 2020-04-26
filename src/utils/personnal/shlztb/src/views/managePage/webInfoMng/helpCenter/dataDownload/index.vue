<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
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
import operateButtonsGroup from "@/components/operateButtonsGroup";
import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import dialogForm from "@/components/dialog/dialogForm";
// 配置数据引入
import tableOperationsBtnList from "@/utils/formSettingsJson/dataDownload/operationBtns.json";
import tableHeaderOpts from "@/utils/formSettingsJson/dataDownload/tableHeaderOpt.json";
import dialogEditFormItemslist from "@/utils/formSettingsJson/dataDownload/dialogFormItems.json";
import dialogFormEditBtnlist from "@/utils/formSettingsJson/dataDownload/dialogEditFormBtns.json";

export default {
  name: "dataDownload",
  components: {
    commonTitleWithBorder,
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
        tableTitle: "资料列表"
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
          formGroupTypeUploadName: "files",
          formItemSpan: 12,
          formGroupList: [],
          formGroupValues: {},
          formButtonList: []
        }
      },
      /**
       * searchbar 记录搜索栏搜索记录
       */
      searchInfo: {},
      page: 1,
      numberPerpage: this.$global.numberPerpage
    };
  },
  methods: {
    /* operateButtons点击事件 */
    handleOperateButton(data) {
      if (data.parentSysId) {
        this.dialogFormSettings.dialogFormItems.formGroupValues = {
          projectId: data.parentSysId
        };
      } else {
        this.dialogFormSettings.dialogFormItems.formGroupValues = {};
      }
      let that = this;
      that.dialogFormSettings.dialogFormVisible = true;
      that.dialogFormSettings.dialogType = "form";
      that.dialogFormSettings.dialogFormTitle = "上传交易资料";
      that.dialogFormSettings.dialogFormItems.formGroupList = dialogEditFormItemslist;
      that.dialogFormSettings.dialogFormItems.formButtonList = dialogFormEditBtnlist;
    },
    /* table每栏操作按钮点击事件 */
    handleTableRowButton(id, type) {
      if (type == "download") {
        window.open(this.$global.downloadUrl + "?sysId=" + id.sysId);
      }
      if (type == "delete") {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let postdata = {
                sysId: id.sysId
              },
              that = this;
            that.$http(that.$api.removeDownFile(), postdata).then(xhr => {
              if (xhr.success) {
                that.$message({
                  message: "操作成功！",
                  type: "success"
                });
                that.tradeInformationList();
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    /* 点击分页器页码 */
    handlePaginationPagenumber(num) {
      this.searchInfo.page = num;
      this.tradeInformationList(this.searchInfo);
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data, postDatas) {
      let options = {
        doActionFncName: "tradeInformationList"
      };
      if (!postDatas.hasUpdFiles) {
        this.$message({
          message: "请选择文件",
          type: "error"
        });
        return false;
      }
      this.$dialogformBtnAction(this, data, btn, options);
    },
    /* 获取菜单数据列表信息 */
    tradeInformationList(query) {
      let that = this,
        postdata = {
          page: that.page,
          rows: that.numberPerpage
        },
        searchInfos = {};
      if (query && typeof query === "object") {
        searchInfos = JSON.parse(JSON.stringify(query));
        if (query.filterRules) {
          searchInfos.filterRules = JSON.stringify(searchInfos.filterRules);
        }
        Object.assign(postdata, searchInfos);
      }
      that.$getData("portalFiles", postdata).then(data => {
        if (
          that.page > Math.ceil(data.total / that.numberPerpage) &&
          that.page > 1
        ) {
          postdata.page = postdata.page - 1;
          that.$getData("portalFiles", postdata).then(xhr => {
            that.dealListData(xhr);
          });
        } else {
          that.dealListData(data);
        }
      });
    },
    dealListData(xhr) {
      let that = this;
      if (!xhr.rows) {
        return false;
      }
      xhr.rows.map(item => {
        let operateBtns = [],
          fileId = item.file && item.file.fileId ? item.file.fileId : "",
          fileSize = item.file && item.file.fileSize ? item.file.fileSize : "",
          fileTime = item.file && item.file.fileTime ? item.file.fileTime : "",
          fileName = item.file && item.file.fileName ? item.file.fileName : "";
        operateBtns = [
          {
            id: {
              sysId: item.sysId,
              fileId: fileId,
              fileName: fileName
            },
            text: "下载",
            type: "download"
          },
          {
            id: {
              sysId: item.sysId,
              fileId: fileId,
              fileName: fileName
            },
            text: "删除",
            type: "delete"
          }
        ];
        item.operateBtns = operateBtns;
        item.fileName = fileName;
        item.fileSize = that.$globalFnc.renderSize(fileSize);
        item.fileTime = that.$globalFnc.dateStampFormat(fileTime);
      });
      that.tablelistSettings.tableDatas = xhr.rows;
      that.paginationSettings.totalNumbers = parseInt(xhr.total);
    }
  },
  mounted() {
    this.tradeInformationList();
  }
};
</script>
