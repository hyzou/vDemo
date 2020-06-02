<template>
  <div class="dialog_root">
    <el-form
      ref="selTargetform"
      :rules="rules"
      :model="form"
      label-width="100px"
    >
      <el-form-item label="检测指标" prop="qasBasItemId">
        <elTreeSelect
          v-if="!form.created"
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
      <el-form-item label="标准值" prop="displayRefValue">
        <el-input
          v-if="refValueIsInput"
          v-model="form.displayRefValue"
        ></el-input>
        <el-select
          v-else
          v-model="form.displayRefValue"
          placeholder="请选择"
          @change="handleChoseRefValue"
        >
          <el-option
            v-for="item in refValueList"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="判定表达式" prop="expr">
        <el-input
          :disabled="!refValueIsInput"
          type="textarea"
          v-model="form.expr"
        ></el-input>
      </el-form-item>
      <el-col :span="24" class="pl100 mb20">
        <div class="bge6a23c text-white pd5 borderR3">
          例如：大于：x>41；小于：x&lt;
          41；大于等于：x>=41；小于等于：x&lt;=41；或：x>21|| x&lt;
          10；且：x>21&&x&lt; 100； 备注：x必须设定
        </div>
      </el-col>
      <el-form-item label="合格判定值">
        <el-select v-model="form.judgeValueIfTrue" placeholder="请选择">
          <el-option
            v-for="item in judgeList"
            :key="item.businid"
            :label="item.businname"
            :value="item.businid"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-input-number v-model="form.priority" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="选择分类">
        <template v-for="type in typelist">
          <el-form-item
            label-width="auto || 0px"
            :label="type.name + '：'"
            class="borderR4 pd5"
            style="border:1px solid #DCDFE6;"
            :key="type.qasBasCriteriaTagId"
          >
            <el-checkbox-group v-model="form.type[type.qasBasCriteriaTagId]">
              <el-checkbox
                v-for="dic in type.dicList"
                :label="dic.dicId"
                :key="dic.dicId"
              >
                {{ dic.businname }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </template>
      </el-form-item>
      <el-form-item label="等级结果">
        <el-select v-model="form.gradeResult" placeholder="请选择">
          <el-option
            v-for="item in gradeResultList"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="textAlignRight">
        <el-button type="primary" @click="handleSubmit('selTargetform')">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 页面组件引入
import elTreeSelect from "@/components/elTreeSelect";
// 校验规则
import seledtTarget from "@/utils/formRulesJson/standardManager/seledtTarget";

export default {
  name: "selectTarget",
  components: {
    elTreeSelect
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
      // 当页显示多个指标信息
      isMultipleTargetInfo: this.flag == "single" ? false : true,
      // 标准值下拉列表
      refValueList: [],
      // 等级结果下拉列表
      gradeResultList: [],
      // 标准值是否为input
      refValueIsInput: true,
      // 检测方法下拉列表
      methodStdList: [],
      // 选择分类下拉列表
      typelist: [],
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
      // 保存分类条件选项值，供处理数据
      typeCondition: [],
      // 合格判定值下拉数据
      judgeList: [],
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
        displayRefValue: "",
        judgeValueIfTrue: "",
        expr: "",
        gradeResult: "",
        priority: 1,
        criteriaTags: [],
        type: {}
      },
      // 当前表单组的校验信息
      rules: seledtTarget.rule
    };
  },
  methods: {
    // 手动选择标准值修改判定表达式
    handleChoseRefValue(val) {
      this.form.expr = "x=" + val;
    },
    // 获取当前指标的节点id
    handleChangeBaseItemType(value, selObject) {
      this.result = [];
      this.getResult(this.elTreeSelectData, value);
      if (this.result.length > 0) {
        this.getTestProjectResultList(this.result[1]);
      }
      if (selObject && selObject.dataType && selObject.dataType == "O") {
        this.refValueIsInput = false;
        this.$Api
          .getDicData({ _refKey: "dict", busintypeid: selObject.busintypeid })
          .then(xhr => {
            this.refValueList = xhr;
          });
      } else {
        this.refValueIsInput = true;
        this.refValueList = [];
      }
    },
    // 提交数据
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let nameArr = [],
            parsedNameArr = [],
            flag = "addSingleStdSet";
          this.typeCondition = [];
          for (let prop in this.form.type) {
            let obj = {};
            obj.qasBasCriteriaTagId = prop;
            obj.tagValus = this.form.type[prop].join(",");
            this.typeCondition.push(obj);
          }
          this.typeCondition.map(condition => {
            let namestr = "";
            this.typelist.map(type => {
              if (
                type.qasBasCriteriaTagId == condition.qasBasCriteriaTagId &&
                condition.tagValus
              ) {
                namestr = type.name + "【";
                type.dicList.map(dic => {
                  let valuesArr = condition.tagValus.split(",");
                  valuesArr.map(val => {
                    if (dic.dicId == val) {
                      namestr = namestr + dic.businname + ",";
                    }
                  });
                });
              }
            });
            if (namestr) {
              nameArr.push(namestr);
            }
          });
          for (let i = 0; i < nameArr.length; i++) {
            let nameItem = nameArr[i];
            if (nameItem.indexOf(",") != -1) {
              nameItem = nameItem.replace(/([^,]*),([^,]*)$/g, "$1】$2");
            } else {
              nameItem += "】";
            }
            parsedNameArr.push(nameItem);
          }
          let newstdtags = [];
          this.typeCondition.map(conitem => {
            if (conitem.tagValus) {
              newstdtags.push(conitem);
            }
          });
          this.form.stdItemCriteriaTags = newstdtags;
          this.form.tagDisplay = parsedNameArr.join(",");
          if (this.form.created) {
            flag = "updateSingleStdSet";
          }
          this.$Api[flag](this.form).then(xhr => {
            this.$emit("selectComplete", xhr.data);
          });
        } else {
          return false;
        }
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
        if (this.form.created) {
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
        this.judgeList = data;
      });
    },
    /* 根据id获取的指标基本信息 */
    getStdBindSingleTargetInfo() {
      this.$Api
        .getStdBindSingleTargetInfo({
          qasStdItemCriteriaId: this.defaultdatas.qasStdItemCriteriaId
        })
        .then(xhr => {
          xhr.data.stdItem = {
            testMethodStdId: xhr.data.testMethodStdId
              ? xhr.data.testMethodStdId
              : "",
            qasStdId: this.defaultdatas.qasStdId
              ? this.defaultdatas.qasStdId
              : ""
          };
          Object.assign(this.form, xhr.data);
          if (
            this.form.stdItemCriteriaTags &&
            this.form.stdItemCriteriaTags.length > 0
          ) {
            this.form.stdItemCriteriaTags.map(tag => {
              if (this.form.type[tag.qasBasCriteriaTagId]) {
                this.form.type[tag.qasBasCriteriaTagId] = tag.tagValus.split(
                  ","
                );
              }
            });
          }
          this.getTestTargetlist();
        });
    }
  },
  mounted() {
    this.$Api.getDicData({ _refKey: "qasStd", type: "2" }).then(data => {
      this.methodStdList = data;
    });
    this.$Api
      .getDicData({ _refKey: "dict", busintypeid: "qas_bas_grainrank" })
      .then(data => {
        this.gradeResultList = data;
      });
    this.$Api
      .getStdBindConditions({ stdId: this.form.stdItem.qasStdId })
      .then(data => {
        this.typelist = data;
        this.typelist.map(item => {
          this.$set(this.form.type, item.qasBasCriteriaTagId, []);
        });
        if (this.defaultdatas.qasStdItemCriteriaId) {
          this.getStdBindSingleTargetInfo();
        } else {
          this.getTestTargetlist();
        }
      });
  }
};
</script>
