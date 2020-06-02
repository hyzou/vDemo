<template>
  <div class="dialog_root">
    <!-- :rules="rules" -->
    <el-form ref="selTargetform" :model="form" label-width="100px">
      <el-form-item label="检测指标" prop="qasBasItemId">
        <elTreeSelect
          v-if="!defaultdatas.qasStdItemCriteriaId"
          class="width100"
          v-model="form.qasBasItemId"
          :props="elTreeSelectProps"
          :options="elTreeSelectData"
          @getValue="handleChangeBaseItemType"
        />
        <el-input v-else v-model="form.basItemName" readonly></el-input>
      </el-form-item>
      <el-form-item label="检测方法">
        <el-select
          v-model="form.stdItem.testMethodStdId"
          placeholder="请选择"
          filterable
        >
          <el-option
            v-for="item in methodStdList"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="检测标准" class="displayNone">
        <el-input v-model="form.stdItem.qasStdId"></el-input>
      </el-form-item>
      <el-row class="textAlignRight mt10 mb10">
        <el-button type="primary" size="mini" @click="handleAddTargetInfo">
          添加
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handleDeleteMutiTargetInfos"
        >
          批量移除
        </el-button>
      </el-row>
      <tableList
        :tablelistSettings="standardTableSettings"
        @handleTableRowButton="handleTableRowButton"
        @handleTableMutiChecked="handleSelectionChange"
      />
      <el-form-item class="textAlignRight">
        <el-button type="primary" @click="handleSubmit('selTargetform')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog
      v-if="dialogMuSingleTargetVisible"
      title="设定标准值"
      :visible.sync="dialogMuSingleTargetVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      append-to-body
    >
      <selectMuSingleTarget
        :defaultdatas="dialogMuSingleTargetDefaultdatas"
        @selectMuSingleComplete="handleSelectMuSingleComplete"
      />
    </el-dialog>
  </div>
</template>

<script>
// 页面组件引入
import elTreeSelect from "@/components/elTreeSelect";
import selectMuSingleTarget from "./selectMuSingleTarget";

// 配置文件引入
import standardTableHeader from "@/utils/formSettingsJson/standardManager/tableMultiTarget.json";

// 校验规则
// import seledtTarget from "@/utils/formRulesJson/standardManager/seledtTarget";

export default {
  name: "selectMultiTarget",
  components: {
    elTreeSelect,
    selectMuSingleTarget
  },
  props: {
    defaultdatas: {
      type: Object,
      default: () => {
        return {
          qasStdItemCriteriaId: "",
          qasStdId: "",
          flag: ""
        };
      }
    }
  },
  data() {
    return {
      dialogMuSingleTargetVisible: false,
      dialogMuSingleTargetDefaultdatas: {},
      dialogMuSingleTargetdatas: {
        qasStdId: this.defaultdatas.qasStdId ? this.defaultdatas.qasStdId : "",
        displayRefValue: "",
        expr: "",
        judgeValueIfTrue: "",
        priority: 1,
        type: {},
        gradeResult: "",
        changeFlag: "add",
        judgeList: [],
        refValueList: [],
        refValueIsInput: true
      },
      // table配置项
      standardTableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "standardTable",
          // headerRowClassName: "text-danger",
          // rowClassName: "text-warning",
          rowKey: "localId",
          tooltipEffect: "dark",
          isMultipleTable: "true",
          border: true,
          height: "400",
          headerOptions: standardTableHeader
        }
      },
      // 检测方法下拉列表
      methodStdList: [],
      // 指标下拉列表数据
      elTreeSelectData: [],
      // 指标下拉列表配置项
      elTreeSelectProps: {
        value: "id",
        label: "text",
        children: "children",
        choseOnlyProp: "type",
        choseOnlyPropValue: "ITEM",
        choseTip: "当前选项为检测项，请选择检测指标"
      },
      // 指标下拉列表选中，获取父节点，用来获取根节点
      parentNode: null,
      // 指标下拉列表选中，获取父节点id，用来获取根节点id
      parentNodeId: "",
      // 指标下拉列表选中，保存当前节点，每次递归更新，同parentNode，parentNodeId
      node: null,
      // 当前节点
      currentNodeList: [],
      // 当前节点
      currentNode: {},
      // 指标下拉列表选中，获取父节点id结果保存表
      result: [],
      /**
       * formGroup 表单组配置
       */
      form: {
        qasStdItemCriteriaId: this.defaultdatas.qasStdItemCriteriaId
          ? this.defaultdatas.qasStdItemCriteriaId
          : "",
        stdItem: {
          testMethodStdId: "",
          qasStdId: this.defaultdatas.qasStdId ? this.defaultdatas.qasStdId : ""
        },
        qasBasItemId: "",
        basItemName: ""
      },
      // 新增的数据
      addTags: [],
      // 修改的数据
      updateTags: [],
      // 删除的数据
      deleteTags: [],
      // 备份当前默认信息
      bakDefaultDatas: [],
      // table中对象添加本地id值
      tableLocalId: 1,
      // 批量勾选table中对象
      tableMutiCheckedItems: []
      // 当前表单组的校验信息
      // rules: seledtTarget.rule
    };
  },
  methods: {
    // 批量删除勾选的数据
    handleDeleteMutiTargetInfos() {
      if (this.tableMutiCheckedItems.length > 0) {
        this.tableMutiCheckedItems.map(item => {
          if (item.qasStdItemCriteriaId) {
            let params = { qasStdItemCriteriaId: item.qasStdItemCriteriaId };
            this.deleteTags.push(params);
          }
          this.addTags.map((additem, idx) => {
            if (additem.localId == item.localId) {
              this.addTags.splice(idx, 1);
            }
          });
          this.updateTags.map((updateitem, updidx) => {
            if (updateitem.localId == item.localId) {
              this.updateTags.splice(updidx, 1);
            }
          });
          this.standardTableSettings.tableDatas.map((standard, stdindex) => {
            if (standard.localId == item.localId) {
              this.standardTableSettings.tableDatas.splice(stdindex, 1);
            }
          });
        });
      }
    },
    // 勾选列表复选框
    handleSelectionChange(data) {
      this.tableMutiCheckedItems = data;
    },
    // 编辑单条数据信息
    handleSelectMuSingleComplete(data, flag) {
      let singleTargetInfo = JSON.parse(JSON.stringify(data));
      if (flag == "add") {
        // this.tableLocalId += 1;
        // singleTargetInfo.localId = this.tableLocalId;
        this.addTags.push(singleTargetInfo);
        data.operateBtns = [
          {
            type: "edit",
            styleType: "text",
            text: "编辑",
            postUrl: "updateSingleStdSet"
          },
          {
            type: "remove",
            className: "text-danger",
            styleType: "text",
            text: "移除",
            postUrl: "deleteStdSet"
          }
        ];
        this.standardTableSettings.tableDatas.push(data);
      } else {
        if (singleTargetInfo.qasStdItemCriteriaId) {
          let existflag = false;
          this.updateTags.map(updateitem => {
            if (updateitem.localId == singleTargetInfo.localId) {
              Object.assign(updateitem, singleTargetInfo);
              existflag = true;
            }
          });
          if (!existflag) {
            this.updateTags.push(singleTargetInfo);
          }
        } else {
          this.addTags.map(additem => {
            if (additem.localId == singleTargetInfo.localId) {
              Object.assign(additem, singleTargetInfo);
            }
          });
        }
        this.standardTableSettings.tableDatas.map(item => {
          if (item.localId == data.localId) {
            Object.assign(item, data);
          }
        });
      }
      this.dialogMuSingleTargetVisible = false;
    },
    /* 点击table操作栏按钮操作 */
    handleTableRowButton(rowData, button) {
      if (button.type == "edit") {
        let dialogData = JSON.parse(JSON.stringify(rowData));
        dialogData.changeFlag = "update";
        dialogData.type = {};
        dialogData.qasStdId = this.defaultdatas.qasStdId
          ? this.defaultdatas.qasStdId
          : "";
        dialogData.judgeList = this.dialogMuSingleTargetdatas.judgeList;
        dialogData.refValueList = this.dialogMuSingleTargetdatas.refValueList;
        dialogData.refValueIsInput = this.dialogMuSingleTargetdatas.refValueIsInput;
        this.dialogMuSingleTargetDefaultdatas = dialogData;
        this.dialogMuSingleTargetVisible = true;
      } else {
        this.$confirm("此操作将移除本条数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          if (rowData.qasStdItemCriteriaId) {
            let params = { qasStdItemCriteriaId: rowData.qasStdItemCriteriaId };
            this.deleteTags.push(params);
          }
          this.addTags.map((additem, idx) => {
            if (additem.localId == rowData.localId) {
              this.addTags.splice(idx, 1);
            }
          });
          this.updateTags.map((updateitem, updidx) => {
            if (updateitem.localId == rowData.localId) {
              this.updateTags.splice(updidx, 1);
            }
          });
          this.standardTableSettings.tableDatas.map((standard, stdindex) => {
            if (standard.localId == rowData.localId) {
              this.standardTableSettings.tableDatas.splice(stdindex, 1);
            }
          });
        });
      }
    },
    //添加指标信息
    handleAddTargetInfo() {
      this.tableLocalId += 1;
      this.dialogMuSingleTargetdatas.localId = this.tableLocalId;
      this.dialogMuSingleTargetDefaultdatas = JSON.parse(
        JSON.stringify(this.dialogMuSingleTargetdatas)
      );
      this.dialogMuSingleTargetVisible = true;
    },
    // 获取当前指标的节点id
    handleChangeBaseItemType(value, selObject) {
      this.result = [];
      this.getResult(this.elTreeSelectData, value);
      if (this.result.length > 0) {
        this.getTestProjectResultList(this.result[1]);
      }
      if (selObject && selObject.dataType && selObject.dataType == "O") {
        this.dialogMuSingleTargetdatas.refValueIsInput = false;
        this.getRefValueList(selObject.busintypeid);
      } else {
        this.dialogMuSingleTargetdatas.refValueIsInput = true;
        this.dialogMuSingleTargetdatas.refValueList = [];
      }
    },
    // 提交数据
    handleSubmit() {
      let postdatas = {
          std: { qasStdId: this.form.stdItem.qasStdId },
          basItem: { qasBasItemId: this.form.qasBasItemId },
          stdMethod: { qasStdId: this.form.stdItem.testMethodStdId },
          addStdItemCriterias: this.addTags,
          updatedStdItemCriterias: this.updateTags,
          deletedStdItemCriterias: this.deleteTags
        },
        flag = this.defaultdatas.qasStdItemCriteriaId
          ? "updateStdItemCriteriaList"
          : "addStdItemCriteriaList";
      this.$Api[flag](postdatas).then(xhr => {
        this.$emit("selectComplete", xhr.data);
      });
    },
    /**
     * 递归查询JSON树 父子节点,根据id查找当前节点以及父节点
     */
    getNode(json, id) {
      //1.第一层 root 深度遍历整个JSON
      for (var i = 0; i < json.length; i++) {
        if (this.node) {
          break;
        }
        var obj = json[i];
        //没有就下一个
        if (!obj || !obj.id) {
          continue;
        }
        //2.有节点就开始找，一直递归下去
        if (obj.id == id) {
          //找到了与id匹配的节点，结束递归
          if (obj.parentId) {
            this.parentNodeId = obj.parentId;
          }
          this.node = obj;
          break;
        } else {
          //3.如果有子节点就开始找
          if (obj.children && obj.children.length != 0) {
            //4.递归前，记录当前节点，作为parent 父亲
            this.parentNode = obj;
            //递归往下找
            this.getNode(obj.children, id);
          } else {
            //跳出当前递归，返回上层递归
            continue;
          }
        }
      }
      //5.如果没有找到父节点，置为null，因为没有父亲
      if (!this.node) {
        this.parentNode = null;
      }
    },
    //批量查询
    getResult(json, query) {
      this.node = null;
      this.parentNode = null;
      this.parentNodeId = "";
      this.getNode(json, query);
      var obj = {
        parentNodeId: this.parentNodeId,
        parentNode: this.parentNode,
        node: this.node
      };
      this.currentNodeList.push(obj);
      //判断是否闭包
      if (obj.parentNodeId) {
        //获取父节点id继续查祖节点
        this.getResult(json, obj.parentNodeId);
        this.result.push(obj.parentNodeId);
      }
    },
    /* 获取指标项树列表 */
    getTestTargetlist() {
      this.$Api.getTestTargetlist({}).then(data => {
        this.elTreeSelectData = data[0].children;
        // this.dealTreedata(this.elTreeSelectData);
        if (this.defaultdatas.qasStdItemCriteriaId) {
          this.getResult(this.elTreeSelectData, this.form.qasBasItemId);
          this.handleChangeBaseItemType(
            this.form.qasBasItemId,
            this.currentNodeList[0].node
          );
        }
      });
    },
    /* 根据选取的指标获取祖节点设定的判定结果 */
    getTestProjectResultList(id) {
      this.$Api.getProjectResults({ qasBasItemTypeId: id }).then(data => {
        this.dialogMuSingleTargetdatas.judgeList = data;
      });
    },
    /* 根据选取的指标获取标准值列表 */
    getRefValueList(id) {
      this.$Api.getDicData({ _refKey: "dict", busintypeid: id }).then(xhr => {
        this.dialogMuSingleTargetdatas.refValueList = xhr;
      });
    },
    /* 根据id获取的指标基本信息 */
    listStdItemCriteria() {
      this.$Api
        .listStdItemCriteria({
          qasStdId: this.defaultdatas.qasStdId,
          basItemId: this.defaultdatas.qasStdItemCriteriaId
        })
        .then(xhr => {
          if (xhr.length > 0) {
            let stdItem = {
              testMethodStdId: xhr[0].stdItem.testMethodStdId
                ? xhr[0].stdItem.testMethodStdId
                : "",
              qasStdId: xhr[0].stdItem.qasStdId ? xhr[0].stdItem.qasStdId : ""
            };
            this.form.qasBasItemId = xhr[0].qasBasItemId;
            this.form.stdItem = stdItem;
            this.form.basItemName = xhr[0].basItemName;
            xhr.map(pagedata => {
              this.tableLocalId += 1;
              pagedata.localId = this.tableLocalId;
              pagedata.operateBtns = [
                {
                  type: "edit",
                  styleType: "text",
                  text: "编辑",
                  postUrl: "updateSingleStdSet"
                },
                {
                  type: "remove",
                  className: "text-danger",
                  styleType: "text",
                  text: "移除",
                  postUrl: "deleteStdSet"
                }
              ];
            });
            this.standardTableSettings.tableDatas = xhr;
          }
          // this.getTestTargetlist();
        });
    }
  },
  created() {
    this.$Api.getDicData({ _refKey: "qasStd", type: "2" }).then(data => {
      this.methodStdList = data;
    });
    this.getTestTargetlist();
    if (this.defaultdatas.qasStdItemCriteriaId) {
      this.listStdItemCriteria();
    }
  }
};
</script>
