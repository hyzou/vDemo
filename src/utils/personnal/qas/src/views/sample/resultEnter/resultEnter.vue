<template>
  <div>
    <el-tabs v-model="activeName">
      <!-- tab1 质检结果信息 -->
      <el-tab-pane label="质检结果录入" class="tab_panel" name="0">
        <el-collapse
          v-model="collapseActiveName"
          accordion
          @change="collapseActive"
        >
          <el-collapse-item title="检测样品相关信息" name="first">
            <el-row>
              <el-col>
                <el-form
                  :model="dataSource.sampleInfo"
                  :rules="rules"
                  :inline="true"
                  ref="sampleInfoForm"
                  label-width="130px"
                >
                  <el-form-item label="样品名称:" prop="name">
                    <el-input
                      v-model="dataSource.sampleInfo.name"
                      class="dialog_input fontMainBlack"
                      disabled
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="样品编号:" prop="code">
                    <el-input
                      v-model="dataSource.sampleInfo.code"
                      class="dialog_input fontMainBlack"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="产品品种:" prop="productName">
                    <el-input
                      v-model="dataSource.sampleInfo.productName"
                      class="dialog_input fontMainBlack"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <br />
                  <el-form-item label="任务性质:" prop="nature">
                    <el-input
                      v-model="dataSource.sampleInfo.nature"
                      class="dialog_input fontMainBlack"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="检测编号:" prop="testCode">
                    <el-input
                      v-model="dataSource.sampleInfo.testCode"
                      class="dialog_input fontMainBlack"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="样品检测等级:" prop="requiredGrade__dsp">
                    <el-input
                      v-model="dataSource.sampleInfo.requiredGrade__dsp"
                      class="dialog_input fontMainBlack"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <br />
                  <el-form-item
                    label="样品检测结果:"
                    prop="qualified"
                    :rules="{
                      required: true,
                      message: '不得为空',
                      trigger: 'change'
                    }"
                  >
                    <el-select
                      v-model="dataSource.sampleInfo.qualified"
                      placeholder="请选择"
                      class="dialog_input"
                    >
                      <el-option
                        v-for="item in qualifieds"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="检测人:"
                    prop="testBy"
                    :rules="{
                      required: true,
                      message: '不得为空',
                      trigger: 'change'
                    }"
                  >
                    <el-input
                      v-model="dataSource.sampleInfo.testBy"
                      class="dialog_input"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="检测时间:"
                    prop="testDt"
                    :rules="{
                      required: true,
                      message: '不得为空',
                      trigger: 'change'
                    }"
                  >
                    <el-date-picker
                      v-model="dataSource.sampleInfo.testDt"
                      type="date"
                      placeholder="选择日期时间"
                      value-format="yyyy-MM-dd"
                      class="dialog_input"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <div style="margin-top: 10px">
          <h1
            class="el-collapse-item__header"
            style="border: 0px;cursor: default"
          >
            检测项目
          </h1>

          <template>
            <el-table
              ref="sampleCheckItemsTable"
              :data="dataSource.sampleCheckItemsDataArray"
              style="width: 100%"
              :max-height="maxHeight"
              border
            >
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="basItem.name" label="检验指标">
              </el-table-column>
              <el-table-column
                prop="basItem.munit"
                label="法定单位"
                width="120"
              >
              </el-table-column>
              <el-table-column label="结果值" width="300">
                <template slot-scope="scope">
                  <el-select
                    v-if="scope.row.basItem.dataType == 'O'"
                    v-model="scope.row.value"
                    placeholder="请选择"
                    @change="judgeItem(scope.row, scope.$index)"
                  >
                    <el-option
                      v-for="item in scope.row.bndictTDictionaryList"
                      :key="item.businid"
                      :label="item.businname"
                      :value="item.businid"
                    >
                    </el-option>
                  </el-select>
                  <el-input
                    v-else
                    v-model="scope.row.value"
                    placeholder="请输入结果值"
                    oninput="value=value.replace(/[^0-9.]/g,'')"
                    @blur="judgeItem(scope.row, scope.$index)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="displayRefValue"
                label="参考值"
                width="300"
              >
              </el-table-column>
              <el-table-column
                prop="judgeNameIfTrue"
                label="判定结果"
                width="300"
              >
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-tab-pane>
      <!-- tab2 上传检验报告 -->
      <el-tab-pane label="检验报告上传" class="tab_panel" name="1">
        <!-- 本地上传文件 -->
        <div style="width: 45%;" class="floatLeft">
          <div class="tool-bar bgfff">
            <div class="fontTitle floatLeft">本地报告</div>
            <el-upload
              class="upload-demo floatRight"
              ref="checkReportUpload"
              action=""
              :auto-upload="false"
              name="fileList"
              :on-change="loadFiles"
              :show-file-list="false"
            >
              <el-button type="primary">选择文件</el-button>
            </el-upload>
            <el-button
              type="primary"
              style="margin-right: 10px"
              :disabled="uploadBtnDisabled"
              @click="uploadFileToServe"
              >上传服务器</el-button
            >
          </div>
          <template>
            <el-table
              ref="taskTable"
              :data="checkReportFiles"
              tooltip-effect="dark"
              style="width: 100%"
              max-height="400px"
              border
            >
              <el-table-column prop="name" label="文件名称"></el-table-column>
              <el-table-column
                prop="fileSizeFixed"
                label="附件大小(兆)"
                width="220"
              ></el-table-column>
              <el-table-column prop="code" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="deleteLocalFile(scope.$index)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <!-- 原文件展示 -->
        <div style="width: 45%;margin-left: 100px;" class="floatLeft">
          <div class="tool-bar bgfff">
            <div class="fontTitle floatLeft">已上传报告</div>
            <el-button
              type="primary"
              :disabled="batchDeleteBtnDisabled"
              @click="batchDeleteFile"
              >批量删除</el-button
            >
          </div>
          <template>
            <el-table
              ref="taskTable"
              :data="checkReportServeFiles"
              tooltip-effect="dark"
              style="width: 100%"
              max-height="400px"
              @selection-change="selectionRowsChange"
              border
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column
                prop="fileName"
                label="文件名称"
              ></el-table-column>
              <el-table-column
                prop="fileType"
                label="文件类型"
              ></el-table-column>
              <el-table-column
                prop="fileSizeFixed"
                label="附件大小(兆)"
              ></el-table-column>
              <el-table-column prop="action" label="操作">
                <template slot-scope="scope">
                  <el-link
                    :href="scope.row.hrefUrl"
                    target="_blank"
                    type="primary"
                  >
                    下载
                  </el-link>
                  <el-button
                    type="text"
                    size="small"
                    style="margin-left: 20px;"
                    @click="selectFileRow = scope.row"
                  >
                    预览
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    style="margin-left: 20px;"
                    @click="deleteFile(scope.row)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-tab-pane>
    </el-tabs>
    <fileReview :scopeRow="selectFileRow"></fileReview>
  </div>
</template>

<script>
import fileReview from "../../common/fileReview";
export default {
  name: "resultEnter",
  data() {
    return {
      rules: {},
      resultEnterEntity: null,
      collapseActiveName: "first",
      dataSource: {
        sampleInfo: {},
        sampleCheckItemsDataArray: []
      },
      submitData: {
        qualified: "Y",
        checkResult: ""
      },
      qualifieds: [
        { value: "Y", text: "合格" },
        { value: "N", text: "不合格" }
      ],
      checkResults: [],
      dialogEnterTest: false,
      activeName: "0",
      checkReportFiles: [],
      uploadBtnDisabled: true,
      checkReportServeFiles: [],
      batchDeleteBtnDisabled: true,
      selectCheckReportServeFiles: [],
      maxHeight: "310px",
      selectFileRow: {}
    };
  },
  components: {
    fileReview: fileReview
  },
  methods: {
    //获取样品信息
    findSampleInfo() {
      if (
        !this.resultEnterEntity ||
        !this.resultEnterEntity.qasSampleId ||
        this.resultEnterEntity.qasSampleId == 0
      ) {
        return false;
      }
      const $this = this;
      this.$get({
        url: "/_data/sample/sample/findSampleInfoBySampleId",
        fnc: data => {
          if (data.success) {
            let dataData = data.data;
            $this.dataSource.sampleInfo = dataData;
            $this.$set(
              $this.dataSource.sampleInfo,
              "testDt",
              dataData.testDt
                ? $this.$dateUtl.getTime(dataData.testDt)
                : $this.$dateUtl.getNowTime()
            );
          }
        },
        param: { qasSampleId: this.resultEnterEntity.qasSampleId }
      });
    },
    //获取样品检测项信息
    findSampleCheckItem() {
      if (
        !this.resultEnterEntity ||
        !this.resultEnterEntity.qasSampleId ||
        this.resultEnterEntity.qasSampleId == 0
      ) {
        return false;
      }
      const $this = this;
      this.$get({
        url: "/_data/sample/sample/findSampleQasPlanQaItem",
        fnc: data => {
          if (data.success) {
            $this.dataSource.sampleCheckItemsDataArray = data.data;
          }
        },
        param: { qasSampleId: this.resultEnterEntity.qasSampleId }
      });
    },
    //判断检测结果
    judgeItem(scopeRow, index) {
      if (!scopeRow.value) {
        return false;
      }
      /*  scopeRow.judgeResult = index == 4 ? "13":"11";
        scopeRow.qasStdId = "494";*/
      //根据输入的内容以及检测项id获取判定结果
      let param = {
        resultValue: scopeRow.value,
        itemId: scopeRow.qasBasItemId,
        gradeValue: this.dataSource.sampleInfo.requiredGrade,
        grainBreedId: this.dataSource.sampleInfo.grainbreedId
      };
      const $this = this;
      this.$get({
        url: "/_data/std/itemCriteria/bestStdItemCriteria",
        param: param,
        fnc: data => {
          if (!data) {
            $this.$set(scopeRow, "judgeResult", "");
            $this.$set(scopeRow, "qasStdId", "");
            $this.$set(scopeRow, "displayRefValue", "");
            $this.$set(scopeRow, "judgeNameIfTrue", "");
            return false;
          }
          $this.$set(scopeRow, "judgeResult", data.judgeValueIfTrue);
          $this.$set(scopeRow, "qasStdId", data.qasStdId);
          $this.$set(scopeRow, "displayRefValue", data.displayRefValue);
          $this.$set(scopeRow, "judgeNameIfTrue", data.judgeNameIfTrue);
        }
      });
    },
    loadFiles(file) {
      let kbsize = file.size / 1024;
      let mbsize = kbsize / 1024;
      file.fileSizeFixed = mbsize.toFixed(2);
      this.checkReportFiles.push(file);
      this.uploadBtnDisabled = false;
    },
    selectionRowsChange(val) {
      this.batchDeleteBtnDisabled = val.length > 0 ? false : true;
      this.selectCheckReportServeFiles = val;
    },
    //删除本地文件
    deleteLocalFile(scopeIndex) {
      this.checkReportFiles.splice(scopeIndex, 1);
      this.uploadBtnDisabled = this.checkReportFiles.length == 0 ? true : false;
    },
    //上传本地文件到服务器
    uploadFileToServe() {
      if (
        !this.resultEnterEntity ||
        !this.resultEnterEntity.qasSampleId ||
        this.resultEnterEntity.qasSampleId == 0 ||
        !this.checkReportFiles ||
        0 == this.checkReportFiles.length
      ) {
        return false;
      }
      let uploadForm = new FormData();
      let up_strName = "fbFiles";
      if (0 == this.checkReportFiles.length && uploadForm.has(up_strName)) {
        uploadForm.delete(up_strName);
      }
      for (var i = 0; i < this.checkReportFiles.length; i++) {
        uploadForm.append(up_strName, this.checkReportFiles[i].raw);
      }
      uploadForm.append("qasSampleId", this.resultEnterEntity.qasSampleId);
      const $this = this;
      this.$post({
        url: "/_data/sample/sample/uploadCheckReportFile",
        param: uploadForm,
        fnc: data => {
          if (!data.success) {
            $this.$notify({
              type: "warning",
              title: "提示",
              message: data.msg,
              duration: 5000,
              offset: 100
            });
            return false;
          }
          //清除表格数据源
          $this.checkReportFiles = [];
          //成功之后执行获取方法
          $this.findCheckReport();
        }
      });
    },
    //删除服务器文件
    deleteFile(scopeRow) {
      this.selectCheckReportServeFiles.push({ fileId: scopeRow.fileId });
      this.batchDeleteFile();
    },
    //批量删除
    batchDeleteFile() {
      const $this = this;
      this.$confirm("确定删除选中检验报告吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          $this.$post({
            url: "/_data/sample/sample/deleteCheckReportFile",
            param: $this.selectCheckReportServeFiles,
            fnc: data => {
              let showtype = "success";
              let message = "删除成功";
              if (!data.success) {
                showtype = "warn";
                message = data.msg;
              }
              $this.$message({
                type: showtype,
                message: message
              });
              if (data.success) {
                $this.selectCheckReportServeFiles = [];
                $this.findCheckReport();
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除操作"
          });
        });
    },
    findCheckReport() {
      if (
        !this.resultEnterEntity ||
        !this.resultEnterEntity.qasSampleId ||
        this.resultEnterEntity.qasSampleId == 0
      ) {
        return false;
      }
      const $this = this;
      this.$get({
        url: "/_data/sample/sample/findCheckReportFiles",
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          data.data.map(item => {
            let kbsize = item.fileSize / 1024;
            let mbsize = kbsize / 1024;
            $this.$set(item, "fileSizeFixed", mbsize.toFixed(2));
            //拼接的href
            let hrefUrl = $this.$Api.createDownloadUrl(
              $this.$constants.baseURL,
              item.fileId
            );
            //预览的链接
            let showUrl = $this.$Api.createFileShowUrl(
              $this.$constants.baseURL,
              item.fileId
            );
            $this.$set(item, "hrefUrl", hrefUrl);
            $this.$set(item, "showUrl", showUrl);
          });
          $this.checkReportServeFiles = data.data;
        },
        param: { qasSampleId: this.resultEnterEntity.qasSampleId }
      });
    },
    collapseActive(activeNames) {
      if (activeNames) {
        console.log("激活");
        this.maxHeight = "310px";
        return false;
      }
      this.maxHeight = "510px";
      console.log(activeNames);
    }
  },
  props: {
    resultEnterObject: {
      type: Object
    }
  },
  watch: {
    resultEnterObject: {
      handler(val) {
        this.resultEnterEntity = val;
        this.findSampleInfo();
        this.findSampleCheckItem();
        this.findCheckReport();
      },
      immediate: true
    }
  }
};
</script>
