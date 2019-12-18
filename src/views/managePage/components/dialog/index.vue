<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="24">
        <operateButtonsGroup
          :operateButtonsSettings="operateButtonsSettings"
          @handleOperateButton="handleOperateButton"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <ul class="contentText">
          <li>
            <p>
              1.dialog组件目前只支持form和图片查看，后续有需要可扩展组件类型。
            </p>
          </li>
          <li>
            <p>2.组件配置项如下所示：</p>
            <pre>
              <code>
                &lt;dialogForm
                  :dialogFormSettings="dialogFormSettings"
                  @handleDialogForm="handleDialogForm"
                  @linkSelect="handleDialogSelectChange"
                />
                dialogFormSettings: {
                  dialogFormTitle: "", //弹窗标题
                  dialogType: "form", //弹窗类型
                  dialogFormVisible: false, //弹窗是否可见（开或关）
                  dialogFormItems: { //如果是form类型，在此处配置form,详情参考formGroup表单组件
                    formGroupList: [],
                    formGroupValues: {},
                    formButtonList: [],
                    rules: dialogFormRules.rule
                  }
                }
              </code>
            </pre>
          </li>
          <li>
            <tableList :tablelistSettings="tablelistSettings" />
          </li>
        </ul>
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
import dialogForm from "@/components/dialog";
import tableList from "@/components/tableList";
import operateButtonsGroup from "@/components/operateButtonsGroup";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import operationBtnList from "@/utils/formSettingsJson/dialog/operationBtns.json";
import formBtnList from "@/utils/formSettingsJson/dialog/dialogAddFormBtns.json";
import formItemslist from "@/utils/formSettingsJson/dialog/dialogFormItems.json";
import tableData from "@/utils/formSettingsJson/dialog/tableData.json";
// 配置校验规则引入
import dialogFormRules from "@/utils/formRulesJson/formGroup/dialogRule";

// 引入本地图片
import imgUrl from "@/assets/logo.png";

export default {
  name: "dialogMng",
  components: {
    tableList,
    dialogForm,
    operateButtonsGroup
  },
  data() {
    return {
      /**
       * operateButtons 按钮组配置
       */
      operateButtonsSettings: {
        moduleName: "tableList",
        buttonListData: operationBtnList
      },
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
          rules: dialogFormRules.rule
        }
      },
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: tableData,
        tableSettingOptions: {
          tooltipEffect: "dark",
          border: true,
          headerOptions: tableHeaderOpts
        }
      }
    };
  },
  methods: {
    /* operateButtons点击事件 */
    handleOperateButton(button) {
      if (button.flag == "form") {
        this.dialogFormSettings.dialogFormItems.formGroupValues = {
          memType: "2"
        };
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogType = "form";
        this.dialogFormSettings.dialogFormTitle = "我是对话框标题";
        this.dialogFormSettings.dialogFormItems.formGroupList = formItemslist;
        this.dialogFormSettings.dialogFormItems.formButtonList = formBtnList;
      } else if (button.flag == "image") {
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogFormTitle = "我是图片对话框标题";
        this.dialogFormSettings.dialogType = "image";
        this.dialogFormSettings.imgSrc = imgUrl;
      } else if (button.flag == "alert") {
        this.$alert(
          "这是<span class='text-danger'>一段内容</span>",
          "标题名称",
          {
            confirmButtonText: "确定",
            dangerouslyUseHTMLString: true,
            callback: action => {
              this.$message.info(`action: ${action}`);
            }
          }
        );
      } else if (button.flag == "confirm") {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
      } else if (button.flag == "message") {
        this.$message.error("这是消息提示内容");
        // this.$message.warning("这是消息提示内容");
        // this.$message.success("这是消息提示内容");
        // this.$message.info("这是消息提示内容");
      }
    },
    /* 点击对话框更改数据联动操作 */
    handleDialogSelectChange(link, id) {
      console.log(link, "dialog link");
      console.log(id, "dialog id");
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      console.log(btn, "dialog按钮");
      console.log(data, "dialog数据");
    }
  }
};
</script>
