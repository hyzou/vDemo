<template>
  <div class="width100">
    <el-row class="table-row-height" style="border-top: 1px #DCDFE6 dashed">
      <el-col :span="5" class="row-title">
        年度：
      </el-col>
      <el-col :span="19">
        <template>
          <el-input
            :disabled="true"
            type="input"
            v-model="indexConfigForm.year"
          ></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row class="table-row-height">
      <el-col :span="5" class="row-title textAlignCenter">
        考核内容：
      </el-col>
      <el-col :span="19" class="borderRight">
        <template>
          <el-input
            :disabled="true"
            type="input"
            v-model="indexConfigForm.assessmentContent"
          ></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row class="table-row-height">
      <el-col :span="5" class="row-title textAlignCenter">
        重点考核事项：
      </el-col>
      <el-col :span="19" class="borderRight">
        <template>
          <el-input
            :disabled="true"
            type="input"
            v-model="indexConfigForm.assessmentItems"
          ></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row class="table-row-height">
      <el-col :span="5" class="row-title textAlignCenter">
        考核指标：
      </el-col>
      <el-col :span="19" class="borderRight">
        <template>
          <el-input
            :disabled="true"
            type="input"
            v-model="indexConfigForm.assessmentTarget"
          ></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row class="table-row-height">
      <el-col :span="5" class="row-title textAlignCenter">
        年度考核目标任务：
      </el-col>
      <el-col :span="19" class="borderRight">
        <template>
          <el-input
            :disabled="true"
            type="input"
            v-model="indexConfigForm.assessmentTargetTask"
          ></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row class="table-row-textarea-height">
      <el-col :span="5" class="row-title-textarea textAlignCenter">
        评分标准：
      </el-col>
      <el-col :span="19" class="borderRight">
        <template>
          <el-input
            :disabled="true"
            type="textarea"
            :rows="4"
            v-model="indexConfigForm.scoreStandard"
          ></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row class="table-row-height" v-if="!indexConfigForm.isDistribute">
      <el-col :span="5" class="row-title">
        指标分值：
      </el-col>
      <el-col :span="7">
        <template>
          <el-input
            :disabled="true"
            type="input"
            v-model="indexConfigForm.targetScore"
          ></el-input>
        </template>
      </el-col>
      <el-col :span="5" class="row-title">
        牵头部门:
      </el-col>
      <el-col :span="7" class="borderRight">
        <el-input
          :disabled="true"
          type="input"
          v-model="indexConfigForm.provinceLeadDepartment"
        ></el-input>
      </el-col>
    </el-row>
    <el-row class="table-row-height" v-if="!indexConfigForm.isDistribute">
      <el-col :span="5" class="row-title">
        任务完成情况：
      </el-col>
      <el-col :span="3" class="borderRight">
        <el-select
          :disabled="indexConfigForm.departmentDisabled"
          v-model="indexConfigForm.completeRate"
        >
          <el-option label="已完成" value="1"> </el-option>
          <el-option label="未完成" value="0"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="row-title">
        耕地面积(万亩)：
      </el-col>
      <el-col :span="3" class="borderRight">
        <el-input
          :disabled="true"
          type="input"
          v-model="indexConfigForm.agriculturalArea"
        ></el-input>
      </el-col>
      <el-col :span="5" class="row-title">
        计划值(万亩)：
      </el-col>
      <el-col :span="3" class="borderRight">
        <el-input
          :disabled="true"
          type="input"
          v-model="indexConfigForm.planAgriculturalArea"
        ></el-input>
      </el-col>
    </el-row>
    <el-row
      class="table-row-textarea-height"
      v-if="indexConfigForm.isDepartment && !indexConfigForm.distributeFlag"
    >
      <el-col :span="5" class="row-title-textarea">
        局落实进展情况：
      </el-col>
      <el-col :span="19" class="borderRight">
        <template>
          <el-input
            :disabled="indexConfigForm.departmentDisabled"
            type="textarea"
            :rows="4"
            v-model="indexConfigForm.departmentImplementProgress"
          ></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row class="table-row-textarea-height">
      <el-col :span="5" class="row-title-textarea">
        局落实依据：
      </el-col>
      <el-col :span="19" class="borderRight">
        <template>
          <el-upload
            class="upload-demo row-title-area"
            ref="fileUpd"
            action="123"
            :auto-upload="false"
            :show-file-list="false"
          >
            <!-- <el-button slot="trigger" size="small" type="primary">
              <em class="el-icon-plus"></em>上传附件
            </el-button> -->
          </el-upload>
        </template>
      </el-col>
    </el-row>
    <el-row class="table-row-textarea-height" v-if="indexConfigForm.isOffice">
      <el-col :span="5" class="row-title-textarea">
        处落实进展情况：
      </el-col>
      <el-col :span="19" class="borderRight">
        <template>
          <el-input
            :disabled="indexConfigForm.officeDisabled"
            type="textarea"
            :rows="4"
            v-model="indexConfigForm.officeImplementProgress"
          ></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row
      class="table-row-textarea-height"
      v-if="indexConfigForm.isOffice && !indexConfigForm.officeDisabled"
    >
      <el-col :span="5" class="row-title-textarea">
        处落实依据：
      </el-col>
      <el-col :span="19" class="borderRight">
        <template>
          <el-upload
            class="upload-demo row-title-area"
            ref="fileUpd"
            action="123"
            :auto-upload="false"
            :show-file-list="false"
          >
            <el-button slot="trigger" size="small" type="primary">
              <em class="el-icon-plus"></em>上传附件
            </el-button>
          </el-upload>
        </template>
      </el-col>
    </el-row>
    <el-row class="table-row-height" v-if="indexConfigForm.isDistribute">
      <el-col :span="5" class="row-title">
        省牵头部门：
      </el-col>
      <el-col :span="7">
        <template>
          <el-input
            :disabled="true"
            type="input"
            v-model="indexConfigForm.provinceLeadDepartment"
          ></el-input>
        </template>
      </el-col>
      <el-col :span="5" class="row-title">
        省配合部门：
      </el-col>
      <el-col :span="7" class="borderRight">
        <template>
          <el-input
            :disabled="true"
            type="input"
            v-model="indexConfigForm.provinceCoordinationDepartment"
          ></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row class="table-row-height" v-if="indexConfigForm.isDistribute">
      <el-col :span="5" class="row-title">
        市牵头部门：
      </el-col>
      <el-col :span="7">
        <template>
          <el-input
            :disabled="true"
            type="input"
            v-model="indexConfigForm.cityLeadDepartment"
          ></el-input>
        </template>
      </el-col>
      <el-col :span="5" class="row-title">
        市配合部门：
      </el-col>
      <el-col :span="7" class="borderRight">
        <template>
          <el-input
            :disabled="true"
            type="input"
            v-model="indexConfigForm.cityCoordinationDepartment"
          ></el-input>
        </template>
      </el-col>
    </el-row>
    <el-row class="table-row-height" v-if="indexConfigForm.isDistribute">
      <el-col :span="5" class="row-title">
        指标分派说明：
      </el-col>
      <el-col :span="19" class="borderRight" style="color:red">
        请各市县根据自身实际情况落实市县级牵头部门及配合部门，未要求与国家牵头及配合部门做一致性对应关系。
      </el-col>
    </el-row>
    <el-row class="table-row-height" v-if="indexConfigForm.isDistribute">
      <el-col :span="5" class="row-title">
        指派处室：
      </el-col>
      <el-col :span="19" class="borderRight" style="color:red">
        <el-select v-model="indexConfigForm.officeId" placeholder="请选择">
          <el-option
            v-for="item in officeList"
            :key="item.value"
            :label="item.orgName"
            :value="item.orgId"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "indexAssignment",
  props: {
    indexConfigForm: {
      type: Object,
      default: () => ({
        year: "",
        targetScore: "",
        cityName: "",
        officeId: "",
        assessmentContent: "",
        assessmentTarget: "",
        assessmentTargetTask: "",
        assessmentItems: "",
        scoreStandard: "",
        provinceLeadDepartment: "",
        provinceCoordinationDepartment: "",
        cityCoordinationDepartment: "",
        cityLeadDepartment: "",
        implementProgress: "",
        officeImplementProgress: "",
        departmentImplementProgress: "",
        officeDisabled: false,
        departmentDisabled: false,
        distributeFlag: false
      })
    }
  },
  data() {
    let officelist = [];
    this.$store.getters["user/orgTree"].map(item => {
      if (item.orgId == this.$store.getters["user/userInfos"].userId) {
        officelist = item.children;
      }
    });
    return {
      officeList: officelist
    };
  },
  methods: {
    saveData() {
      return this.indexConfigForm;
    }
  }
};
</script>

<style scoped lang="less">
.table-row-height {
  height: 70px;
  border-bottom: 1px dashed #dcdfe6;
  .el-col {
    min-height: 70px;
    border-left: 1px solid #dcdfe6;
    line-height: 70px;
  }
  .row-title {
    text-align: center;
    line-height: 70px;
    font-weight: bold;
  }
  .borderRight {
    border-right: 1px solid #dcdfe6;
  }
}

.table-row-textarea-height {
  height: 150px;
  border-bottom: 1px dashed #dcdfe6;
  .el-col {
    min-height: 150px;
    line-height: 120px;
    border-left: 1px solid #dcdfe6;
  }
  .row-title-textarea {
    text-align: center;
    font-weight: bold;
    line-height: 150px;
  }
  .borderRight {
    border-right: 1px solid #dcdfe6;
  }
}
</style>
