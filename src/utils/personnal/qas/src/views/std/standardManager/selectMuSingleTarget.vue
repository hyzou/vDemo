<template>
  <div class="dialog_root">
    <el-form
      ref="selMuSingleTargetform"
      :rules="rules"
      :model="defaultdatas"
      label-width="100px"
    >
      <el-form-item label="标准值" prop="displayRefValue">
        <el-input
          v-if="defaultdatas.refValueIsInput"
          v-model="defaultdatas.displayRefValue"
        ></el-input>
        <el-select
          v-else
          v-model="defaultdatas.displayRefValue"
          placeholder="请选择"
          @change="handleChoseRefValue"
        >
          <el-option
            v-for="(item, idx) in defaultdatas.refValueList"
            :key="idx"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="判定表达式" prop="expr">
        <el-input
          :disabled="!defaultdatas.refValueIsInput"
          type="textarea"
          v-model="defaultdatas.expr"
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
        <el-select v-model="defaultdatas.judgeValueIfTrue" placeholder="请选择">
          <el-option
            v-for="item in defaultdatas.judgeList"
            :key="item.businid"
            :label="item.businname"
            :value="item.businid"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-input-number
          v-model="defaultdatas.priority"
          :min="1"
        ></el-input-number>
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
            <el-checkbox-group
              v-model="defaultdatas.type[type.qasBasCriteriaTagId]"
            >
              <el-checkbox
                v-for="dic in type.dicList"
                :label="dic.dicId"
                :name="type.busintypeid"
                :key="dic.dicId"
              >
                {{ dic.businname }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </template>
      </el-form-item>
      <el-form-item label="等级结果">
        <el-select v-model="defaultdatas.gradeResult" placeholder="请选择">
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
        <el-button type="primary" @click="handleSubmit('selMuSingleTargetform')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 校验规则
import seledtMuSingleTarget from "@/utils/formRulesJson/standardManager/seledtMuSingleTarget";

export default {
  name: "selectMuSingleTarget",
  props: {
    defaultdatas: {
      type: Object,
      default: () => {
        return {
          qasStdId: "",
          displayRefValue: "",
          expr: "",
          gradeResult: "",
          judgeValueIfTrue: "",
          priority: 1,
          type: {},
          changeFlag: "add",
          judgeList: [],
          refValueList: [],
          refValueIsInput: true
        };
      }
    }
  },
  data() {
    return {
      // 等级结果下拉列表
      gradeResultList: [],
      // 选择分类下拉列表
      typelist: [],
      // 保存分类条件选项值，供处理数据
      typeCondition: [],
      // 当前表单组的校验信息
      rules: seledtMuSingleTarget.rule
    };
  },
  methods: {
    // 手动选择标准值修改判定表达式
    handleChoseRefValue(val) {
      this.defaultdatas.expr = "x=" + val;
    },
    // 提交数据
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let nameArr = [],
            parsedNameArr = [],
            postdatas = JSON.parse(JSON.stringify(this.defaultdatas));
          this.typeCondition = [];
          for (let prop in postdatas.type) {
            let obj = {};
            obj.qasBasCriteriaTagId = prop;
            obj.tagValus = postdatas.type[prop].join(",");
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
          postdatas.stdItemCriteriaTags = newstdtags;
          postdatas.tagDisplay = parsedNameArr.join(",");
          this.defaultdatas.judgeList.map(jdgItem => {
            if (jdgItem.businid == postdatas.judgeValueIfTrue) {
              postdatas.judgeNameIfTrue = jdgItem.businname;
            }
          });
          this.gradeResultList.map(gradeItem => {
            if (gradeItem.value == postdatas.gradeResult) {
              postdatas.gradeResult__dsp = gradeItem.text;
            }
          });
          let changeFlag = postdatas.changeFlag;
          delete postdatas.changeFlag;
          delete postdatas.judgeList;
          delete postdatas.qasStdId;
          delete postdatas.refValueList;
          delete postdatas.refValueIsInput;
          delete postdatas.type;
          this.$emit("selectMuSingleComplete", postdatas, changeFlag);
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.$Api
      .getDicData({ _refKey: "dict", busintypeid: "qas_bas_grainrank" })
      .then(data => {
        this.gradeResultList = data;
      });
    this.$Api
      .getStdBindConditions({ stdId: this.defaultdatas.qasStdId })
      .then(data => {
        this.typelist = data;
        this.typelist.map(item => {
          // this.defaultdatas.type[item.qasBasCriteriaTagId] = [];
          this.$set(this.defaultdatas.type, item.qasBasCriteriaTagId, []);
        });
        if (
          this.defaultdatas.stdItemCriteriaTags &&
          this.defaultdatas.stdItemCriteriaTags.length > 0
        ) {
          this.defaultdatas.stdItemCriteriaTags.map(tag => {
            if (this.defaultdatas.type[tag.qasBasCriteriaTagId]) {
              this.defaultdatas.type[
                tag.qasBasCriteriaTagId
              ] = tag.tagValus.split(",");
            }
          });
        }
      });
  }
};
</script>
