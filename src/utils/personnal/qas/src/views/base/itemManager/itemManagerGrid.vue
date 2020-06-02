<template>
  <div class="common_table_container">
    <!-- <itemManagerSearch @doSearch="doSearch" /> -->
    <div class="tool-bar">
      <operateButtonsGroup
        :operateButtonsSettings="operateButtonsSettings"
        @handleOperateButton="handleOperateButton"
        @handleDropItemButton="handleDropItemButton"
      />
    </div>
    <div class="pd20">
      <tableList
        :tablelistSettings="demoTableSettings"
        @handleTableRowButton="handleTableRowButton"
        @handleTableMutiChecked="handleSelectionChange"
      />
    </div>
    <!-- yarn add vue-video-player依赖安装 -->
    <!-- <el-row class="mb20">
      <el-col :span="14">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </el-col>
    </el-row> -->
    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
      @linkSelect="handleDialogSelectChange"
    />
  </div>
</template>

<script>
// import itemManagerSearch from "./itemManagerSearch";
/*配置数据引入👇*/
// table表头设置
import tableHeader from "@/utils/formSettingsJson/itemManager/tableHeader.json";
// 移动指标
import dialogMoveTargetFormBtns from "@/utils/formSettingsJson/itemManager/dialogMoveTargetFormBtns.json";
import dialogMoveTargetFormItems from "@/utils/formSettingsJson/itemManager/dialogMoveTargetFormItems.json";
// 新建指标
import dialogSetTargetFormBtns from "@/utils/formSettingsJson/itemManager/dialogSetTargetFormBtns.json";
import dialogSetTargetFormItems from "@/utils/formSettingsJson/itemManager/dialogSetTargetFormItems.json";
// 新增检测项
import dialogSetProjectFormBtns from "@/utils/formSettingsJson/itemManager/dialogSetProjectFormBtns.json";
import dialogSetProjectFormItems from "@/utils/formSettingsJson/itemManager/dialogSetProjectFormItems.json";
// 更新指标
import dialogUpdateTargetFormBtns from "@/utils/formSettingsJson/itemManager/dialogUpdateTargetFormBtns.json";
import dialogUpdateTargetFormItems from "@/utils/formSettingsJson/itemManager/dialogUpdateTargetFormItems.json";
// 更新检测项
import dialogProjectSetresultFormBtns from "@/utils/formSettingsJson/itemManager/dialogProjectSetresultFormBtns.json";
import dialogProjectUpdateresultFormBtns from "@/utils/formSettingsJson/itemManager/dialogProjectUpdateresultFormBtns.json";
import dialogProjectSetresultFormItems from "@/utils/formSettingsJson/itemManager/dialogProjectSetresultFormItems.json";
import operateButtonListData from "@/utils/formSettingsJson/itemManager/operateButtonListData.json";
/*配置数据引入👆*/

/*校验规则👇*/

import setTargetRule from "@/utils/formRulesJson/itemManager/setTargetRule";
import setProjectRule from "@/utils/formRulesJson/itemManager/setProjectRule";
import setResultRule from "@/utils/formRulesJson/itemManager/setResultRule";
/*校验规则👆*/

export default {
  name: "itemManagerGrid",
  components: {
    // itemManagerSearch
  },
  data() {
    return {
      /**
       * video 基本数据配置
       */
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src:
              "https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4", // 路径
            type: "video/mp4" // 类型
          },
          {
            src:
              "https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4",
            type: "video/mp4"
          }
        ],
        poster: "@/assets/logo.png", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      // table复选框已勾选集合
      checkedTableRow: [],
      // 检测指标树
      testTargetlist: [],
      // 检测项目树
      testProjectlist: [],
      /**
       * 当前tab激活状态值
       */
      activeName: "target",
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
          rules: {}
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
      }
    };
  },
  methods: {
    /* 搜索栏点击事件 */
    doSearch(query) {
      this.demoTableSettings.tableDatas = this.deal(this.testTargetlist, node =>
        node.text.includes(query.name)
      );
    },
    filter(arr, query) {
      return arr.filter(
        data =>
          !query.name ||
          data.text.toLowerCase().includes(query.name.toLowerCase())
      );
    },
    deal(nodes, predicate) {
      // 如果已经没有节点了，结束递归
      if (!(nodes && nodes.length)) {
        return [];
      }
      const newChildren = [];
      for (const node of nodes) {
        if (predicate(node)) {
          // 如果节点符合条件，直接加入新的节点集
          newChildren.push(node);
          node.children = this.deal(node.children, predicate);
        } else {
          // 如果当前节点不符合条件，递归过滤子节点，
          // 把符合条件的子节点提升上来，并入新节点集
          newChildren.push(...this.deal(node.children, predicate));
        }
      }
      return newChildren;
    },
    /* operateButtons点击事件 */
    handleOperateButton(button) {
      if (button.flag == "duplicateOperation") return false;
      if (button.flag == "selectTarget") {
        this.dialogFormSettings.dialogFormItems.formGroupList = dialogSetProjectFormItems;
        this.dialogFormSettings.dialogFormItems.formButtonList = dialogSetProjectFormBtns;
        this.dialogFormSettings.dialogFormItems.rules = setProjectRule.rule;
        this.dialogFormSettings.dialogFormItems.formGroupValues = {
          name: "",
          parentId: ""
        };
      }
      if (button.flag == "newTarget") {
        this.dialogFormSettings.dialogFormItems.formGroupList = dialogSetTargetFormItems;
        this.dialogFormSettings.dialogFormItems.formButtonList = dialogSetTargetFormBtns;
        this.dialogFormSettings.dialogFormItems.rules = setTargetRule.rule;
        this.dialogFormSettings.dialogFormItems.formGroupValues = {
          name: "",
          dataType: "",
          busintypeid: "",
          munit: "",
          sortNo: "",
          disable: "N",
          qasBasItemTypeId: ""
        };
      }
      this.dialogFormSettings.dialogFormTitle = button.label;
      this.dialogFormSettings.dialogFormVisible = true;
      this.dialogFormSettings.dialogType = "form";
    },
    /* operateButtons下拉点击事件 */
    handleDropItemButton(id) {
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
    /* 点击table操作栏按钮操作 */
    handleTableRowButton(rowData, button) {
      if (button.type == "edit") {
        if (!rowData.type || (rowData.type && rowData.type !== "ITEMTYPE")) {
          this.getSingleTarget(rowData.id).then(xhr => {
            this.dialogFormSettings.dialogFormItems.formGroupValues = xhr;
            let hideflag = true;
            if (xhr.dataType == "O") {
              hideflag = false;
            } else {
              hideflag = true;
            }
            dialogSetTargetFormItems.map(tarItem => {
              if (tarItem.name == "busintypeid") {
                tarItem.hideItem = hideflag;
              }
            });
            dialogUpdateTargetFormItems.map(tarItem => {
              if (tarItem.name == "busintypeid") {
                tarItem.hideItem = hideflag;
              }
            });
          });
          this.dialogFormSettings.dialogFormItems.formButtonList = dialogUpdateTargetFormBtns;
          this.dialogFormSettings.dialogFormTitle = "编辑指标项信息";
          this.dialogFormSettings.dialogFormItems.formGroupList = dialogUpdateTargetFormItems;
        }
        this.dialogFormSettings.dialogFormItems.rules = setTargetRule.rule;
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogType = "form";
      } else if (button.type == "move") {
        this.dialogFormSettings.dialogFormItems.formGroupValues = {
          qasBasItemId: rowData.id,
          qasBasItemTypeId: rowData.parentId
        };
        this.dialogFormSettings.dialogFormItems.rules = setResultRule.rule;
        this.dialogFormSettings.dialogFormTitle = "移动指标";
        this.dialogFormSettings.dialogFormItems.formGroupList = dialogMoveTargetFormItems;
        this.dialogFormSettings.dialogFormVisible = true;
        this.dialogFormSettings.dialogFormItems.formButtonList = dialogMoveTargetFormBtns;
      } else if (button.type == "set") {
        this.$Api
          .getProjectResultsInfoById({ qasBasItemTypeId: rowData.id })
          .then(data => {
            if (data.data && data.data.qasBasItemTypeId) {
              this.dialogFormSettings.dialogFormItems.formGroupValues =
                data.data;
              this.dialogFormSettings.dialogFormItems.formButtonList = dialogProjectUpdateresultFormBtns;
            } else {
              this.dialogFormSettings.dialogFormItems.formGroupValues = {
                qasBasItemTypeId: rowData.id
              };
              this.dialogFormSettings.dialogFormItems.formButtonList = dialogProjectSetresultFormBtns;
            }
            this.dialogFormSettings.dialogFormItems.rules = setResultRule.rule;
            this.dialogFormSettings.dialogFormTitle = "设定检测项判定结果";
            this.dialogFormSettings.dialogFormItems.formGroupList = dialogProjectSetresultFormItems;
            this.dialogFormSettings.dialogFormVisible = true;
          });
      } else if (button.type == "removeSet") {
        this.$confirm("此操作将删除本条检测项判定结果, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$Api
              .deleteProjectResults({ qasBasItemTypeId: rowData.id })
              .then(() => {
                this.$message.success("已为您删除检测项判定结果");
              });
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      } else {
        let params = {},
          postUrl = "";
        if (rowData.type && rowData.type == "ITEMTYPE") {
          params.qasBasItemTypeId = rowData.id;
          postUrl = "deleteSingleTestProject";
        } else {
          params.qasBasItemId = rowData.id;
          postUrl = "deleteSingleTestTarget";
        }
        this.$confirm("此操作将删除本条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$Api[postUrl](params).then(() => {
              this.getTestTargetlist();
              this.getTestProjectlist();
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
    /* 点击对话框更改数据联动操作 */
    handleDialogSelectChange(link, id) {
      let hideflag = true;
      if (id == "O") {
        hideflag = false;
      } else {
        hideflag = true;
      }
      dialogSetTargetFormItems.map(tarItem => {
        if (tarItem.name == link) {
          tarItem.hideItem = hideflag;
        }
      });
      dialogUpdateTargetFormItems.map(tarItem => {
        if (tarItem.name == link) {
          tarItem.hideItem = hideflag;
        }
      });
    },
    /* 点击对话框操作 */
    handleDialogForm(btn, data) {
      this.$Api[btn.postUrl](data).then(() => {
        this.getTestTargetlist();
        this.getTestProjectlist();
        this.dialogFormSettings.dialogFormVisible = false;
      });
    },
    /* 获取指标项树列表 */
    getTestTargetlist() {
      this.$Api.getTestTargetlist({}).then(data => {
        let addPropOptions = {
          propName: "operateBtns", //必填
          propFlag: "type",
          propFlagValue: "ITEM",
          propNode: "children",
          propParent: [
            {
              type: "remove",
              styleType: "text",
              text: "删除"
            }
          ], //必填
          propChild: [
            {
              type: "edit",
              styleType: "text",
              text: "编辑"
            },
            {
              type: "move",
              styleType: "text",
              text: "移动"
            },
            {
              type: "remove",
              styleType: "text",
              text: "删除"
            }
          ]
        };
        this.$dateUtl.addPropInTreedata(data, addPropOptions);
        data[0].children.map(child => {
          child.operateBtns = [
            {
              type: "set",
              styleType: "text",
              text: "设置判定结果"
            },
            {
              type: "removeSet",
              styleType: "text",
              text: "删除判定结果"
            }
            // {
            //   type: "remove",
            //   styleType: "danger",
            //   text: "删除"
            // }
          ];
        });
        this.testTargetlist = data[0].children || [];
        this.formatData(this.testTargetlist);
        this.demoTableSettings.tableDatas = this.testTargetlist;
      });
    },
    formatData(data) {
      data.map(item => {
        if (item.type && item.type == "ITEMTYPE_CATEGORY") {
          item.typeDsc = "检测项分类";
        } else if (item.type && item.type == "ITEM") {
          item.typeDsc = "指标";
        } else {
          item.typeDsc = "检测项";
        }
        if (item.children) {
          this.formatData(item.children);
        }
      });
    },
    /* 获取检测指标项树列表 */
    getTestProjectlist() {
      this.$Api.getTestProjectlist({}).then(data => {
        this.testProjectlist = data[0].children || [];
        dialogMoveTargetFormItems.map(tarItem => {
          if (tarItem.name == "qasBasItemTypeId") {
            tarItem.data = this.testProjectlist;
          }
        });
        dialogSetTargetFormItems.map(tarItem => {
          if (tarItem.name == "qasBasItemTypeId") {
            tarItem.data = this.testProjectlist;
          }
        });
        dialogSetProjectFormItems.map(proItem => {
          if (proItem.name == "parentId") {
            proItem.data = this.testProjectlist;
          }
        });
      });
    },
    /* 获取单条指标数据 */
    getSingleTarget(id) {
      return new Promise(resolve => {
        this.$Api.getSingleTestTarget({ qasBasItemId: id }).then(data => {
          resolve(data.data);
        });
      });
    }
  },
  mounted() {
    // 获取指标项及指标树列表
    this.getTestTargetlist();
    // 获取新建指标或指标项时指标项树（只有父节点）
    this.getTestProjectlist();
    this.$Api
      .getDicData({ _refKey: "businType", sysType: "oh-qas" })
      .then(xhr => {
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
        dialogProjectSetresultFormItems.map(tarItem => {
          if (tarItem.name == "busintypeid") {
            tarItem.data = this.$dateUtl.dealDicData(xhr, "text", "value");
          }
        });
      });
  }
};
</script>
