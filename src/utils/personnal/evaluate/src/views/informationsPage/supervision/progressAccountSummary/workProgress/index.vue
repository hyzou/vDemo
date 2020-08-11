<template>
  <div class="width100">
    <el-form
      class="scopeForm"
      :rules="rules"
      :model="workProgressForm"
      ref="workProgressForm"
    >
      <el-row
        type="flex"
        class="table-row-height"
        style="border-top: 1px #DCDFE6 dashed"
      >
        <el-col :span="2" class="row-title">
          年度：
        </el-col>
        <el-col :span="6">
          <el-form-item prop="year">
            <el-input
              :disabled="true"
              type="input"
              v-model="workProgressForm.year"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="row-title">
          城市:
        </el-col>
        <el-col :span="6">
          <el-form-item prop="address">
            <el-input
              :disabled="true"
              type="input"
              v-model="workProgressForm.address"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="row-title">
          填报单位:
        </el-col>
        <el-col :span="6" class="borderRight row-title textAlignLeft">
          杭州市考核办
        </el-col>
      </el-row>
      <el-row class="table-row-height" style="background:#7abbff;">
        <el-col :span="8" class="row-title textAlignCenter text-white">
          填报内容
        </el-col>
        <el-col :span="8" class="row-title textAlignCenter text-white">
          累计情况
        </el-col>
        <el-col
          :span="8"
          class="row-title textAlignCenter borderRight text-white"
        >
          当月情况
        </el-col>
      </el-row>
      <el-row class="table-row-textarea-height">
        <el-col :span="8" class="row-title-textarea">
          考核工作进展情况：
        </el-col>
        <el-col :span="8">
          <el-form-item prop="reviewProgressBefore">
            <el-input
              :disabled="true"
              type="textarea"
              :rows="4"
              v-model="workProgressForm.reviewProgressBefore"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="borderRight">
          <el-form-item prop="reviewProgress">
            <el-input
              :disabled="true"
              type="textarea"
              :rows="4"
              v-model="workProgressForm.reviewProgress"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="table-row-textarea-height">
        <el-col :span="8" class="row-title-textarea">
          落实粮食安全市县长责任制取得的重大突破和工作亮点(分条列出)：
        </el-col>
        <el-col :span="8">
          <el-form-item prop="workResultsBefore">
            <el-input
              :disabled="true"
              type="textarea"
              :rows="4"
              v-model="workProgressForm.workResultsBefore"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="borderRight">
          <el-form-item prop="workResults">
            <el-input
              :disabled="true"
              type="textarea"
              :rows="4"
              v-model="workProgressForm.workResults"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="table-row-textarea-height">
        <el-col :span="8" class="row-title-textarea">
          落实粮食安全市县长责任制存在的突出问题和薄弱环节(分条列出)：
        </el-col>
        <el-col :span="8">
          <el-form-item prop="workIssuesBefore">
            <el-input
              :disabled="true"
              type="textarea"
              :rows="4"
              v-model="workProgressForm.workIssuesBefore"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="borderRight">
          <el-form-item prop="workIssues">
            <el-input
              :disabled="true"
              type="textarea"
              :rows="4"
              v-model="workProgressForm.workIssues"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="table-row-height">
        <el-col :span="2" class="row-title">
          填报人：
        </el-col>
        <el-col :span="6">
          <el-form-item prop="people">
            <el-input
              :disabled="true"
              type="input"
              v-model="workProgressForm.people"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="row-title">
          联系电话：
        </el-col>
        <el-col :span="6">
          <el-form-item prop="tel">
            <el-input
              :disabled="true"
              type="input"
              v-model="workProgressForm.tel"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="row-title">
          填报日期：
        </el-col>
        <el-col :span="6" class="borderRight">
          <el-form-item prop="date">
            <el-date-picker
              :disabled="true"
              type="date"
              v-model="workProgressForm.date"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="table-row-height">
        <el-col :span="2" class="row-title">
          相关附件：
        </el-col>
        <el-col :span="22" class="borderRight" style="line-height: 70px;">
          <!-- <template>
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
          </template> -->
        </el-col>
      </el-row>
      <!-- <el-row class="table-row-textarea-height">
        <el-col :span="2" class="row-title-textarea">
          填报说明：
        </el-col>
        <el-col :span="22" class="borderRight">
          <p>
            1、如果您提交文字超过1000个汉字请您线下编辑好此表格内容并且以附件的形式上传；
          </p>
          <p>2、如果您采用附件的形式上传，请在必填项内容中写明“详见附件”；</p>
          <p>3、考核工作进展情况表下载位置：“信息管理”模块下“资料下载”栏目</p>
        </el-col>
      </el-row> -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: "workProgress",
  props: {
    workProgressForm: {
      type: Object,
      default: () => ({
        year: "",
        address: "",
        reviewProgressBefore: "",
        reviewProgress: "",
        workResultsBefore: "",
        workResults: "",
        workIssuesBefore: "",
        workIssues: "",
        date: "",
        tel: "",
        people: "",
        disable: false
      })
    }
  },
  data() {
    return {
      rules: {
        year: [{ required: true, message: "请输入年份", trigger: "blur" }],
        address: [{ required: true, message: "请输入城市", trigger: "blur" }],
        reviewProgressBefore: [
          {
            required: true,
            message: "请输入考核工作进展累计情况",
            trigger: "blur"
          }
        ],
        reviewProgress: [
          {
            required: true,
            message: "请输入考核工作进展当月情况",
            trigger: "blur"
          }
        ],
        workResultsBefore: [
          {
            required: true,
            message: "请输入累计工作突破和亮点",
            trigger: "blur"
          }
        ],
        workResults: [
          {
            required: true,
            message: "请输入当月工作突破和亮点",
            trigger: "blur"
          }
        ],
        workIssuesBefore: [
          {
            required: true,
            message: "请输入累计工作问题和弱点",
            trigger: "blur"
          }
        ],
        workIssues: [
          {
            required: true,
            message: "请输入当月工作问题和弱点",
            trigger: "blur"
          }
        ],
        people: [{ required: true, message: "请输入填报人", trigger: "blur" }],
        tel: [{ required: true, message: "请输入电话", trigger: "blur" }],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    saveData() {
      let flag;
      this.$refs["workProgressForm"].validate(valid => {
        if (valid) {
          flag = true;
        }
      });
      if (flag) {
        if (!this.workProgressForm.id) {
          this.workProgressForm.id = this.$globalFnc.uuid();
        }
        return this.workProgressForm;
      }
    }
  }
};
</script>

<style scoped lang="less">
/deep/ .el-input {
  width: 100%;
}
.scopeForm {
  .el-col {
    padding-left: 10px;
    padding-right: 10px;
  }
}
.table-row-height {
  height: 70px;
  border-bottom: 1px dashed #dcdfe6;
  .el-col {
    min-height: 70px;
    border-left: 1px solid #dcdfe6;
  }
  .el-form-item {
    margin-top: 13px;
  }
  .row-title {
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
    height: 150px;
    border-left: 1px solid #dcdfe6;
    line-height: 120px;
  }
  .row-title-textarea {
    font-weight: bold;
    line-height: 150px;
  }
  .borderRight {
    border-right: 1px solid #dcdfe6;
  }
  p {
    color: red;
    line-height: 30px;
  }
  p:first-child {
    margin-top: 30px;
  }
}
</style>
