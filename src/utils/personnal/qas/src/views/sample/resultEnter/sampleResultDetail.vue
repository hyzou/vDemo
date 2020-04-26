<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="样品信息" class="tab_panel maxHeight400" name="0">
        <el-form
          label-width="210px"
          :inline="true"
          ref="sampleInfoForm"
          v-model="sampleForm.sampleInfo"
        >
          <el-form-item label="样品编号:">
            <el-input
              placeholder=""
              v-model="sampleForm.sampleInfo.code"
              :disabled="true"
              class="dialog_input fontMainBlack"
            ></el-input>
          </el-form-item>
          <el-form-item label="样品名称:">
            <el-input
              placeholder=""
              v-model="sampleForm.sampleInfo.name"
              :disabled="true"
              class="dialog_input fontMainBlack"
            ></el-input>
          </el-form-item>
          <el-form-item label="产品品种:">
            <el-input
              placeholder=""
              v-model="sampleForm.sampleInfo.product"
              :disabled="true"
              class="dialog_input fontMainBlack"
            ></el-input>
          </el-form-item>
          <br />
          <el-form-item label="计划性质:">
            <el-input
              placeholder=""
              v-model="sampleForm.sampleInfo.nature__dsp"
              :disabled="true"
              class="dialog_input fontMainBlack"
            ></el-input>
          </el-form-item>
          <el-form-item label="样品重量(公斤):">
            <el-input
              placeholder=""
              v-model="sampleForm.sampleInfo.weight"
              :disabled="true"
              class="dialog_input fontMainBlack"
            ></el-input>
          </el-form-item>
          <el-form-item label="样品份数:">
            <el-input
              placeholder=""
              v-model="sampleForm.sampleInfo.sampleCopyNum"
              :disabled="true"
              class="dialog_input fontMainBlack"
            ></el-input>
          </el-form-item>
          <br />
          <el-form-item label="扦样时间:">
            <el-input
              placeholder=""
              v-model="sampleForm.sampleInfo.samplingDt"
              :disabled="true"
              class="dialog_input fontMainBlack"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="质检结果" class="tab_panel maxHeight400" name="1">
        <resultEnterDetail
          ref="resultEnterDetail"
          :resultEnterObject="resultEnterObject"
        ></resultEnterDetail>
      </el-tab-pane>
      <el-tab-pane label="检验报告" class="tab_panel maxHeight400" name="2">
        <el-table
          ref="checkReportFileTable"
          :data="sampleCheckReportFileList"
          tooltip-effect="dark"
          border
          style="width: 100%"
        >
          <el-table-column prop="fileName" label="附件名称"> </el-table-column>
          <el-table-column prop="fileType" label="附件类型"> </el-table-column>
          <el-table-column prop="fileSizeFixed" label="附件大小(兆)">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link :href="scope.row.hrefUrl" target="_blank" type="primary">
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
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <fileReview :scopeRow="selectFileRow"></fileReview>
  </div>
</template>

<script>
import resultEnterDetail from "../resultEnter/resultEnterDetail";
import fileReview from "../../common/fileReview";
export default {
  name: "sampleResultDetail",
  data() {
    return {
      activeName: "0",
      sampleForm: {
        sampleInfo: {}
      },
      sampleCheckReportFileList: [],
      resultEnterObject: {
        qasSampleId: 0
      },
      selectFileRow: {}
    };
  },
  components: {
    resultEnterDetail: resultEnterDetail,
    fileReview: fileReview
  },
  methods: {
    //获取检验报告
    findsampleCheckReportFileList() {
      if (!this.qasSampleId || this.qasSampleId == 0) {
        return false;
      }
      const $this = this;
      let pageParam = {
        qasSampleId: this.qasSampleId
      };
      this.$get({
        url: "/_data/sample/sample/findCheckReportFiles",
        fnc: data => {
          if (!data.success || !data.data || data.data.length == 0) {
            $this.sampleCheckReportFileList = [];
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
          $this.sampleCheckReportFileList = data.data;
        },
        param: pageParam
      });
    },
    findAllSampleMsg() {
      const $this = this;
      //获取信息
      this.$get({
        url: "/_data/sample/sample/findAllMsg",
        param: { qasSampleId: this.qasSampleId },
        fnc: data => {
          if (!data.success || !data.data) {
            return false;
          }
          let returnData = data.data;
          $this.$set(
            $this.sampleForm.sampleInfo,
            "code",
            returnData.qasSample && returnData.qasSample.code
              ? returnData.qasSample.code
              : ""
          );
          $this.$set(
            $this.sampleForm.sampleInfo,
            "name",
            returnData.qasSample && returnData.qasSample.name
              ? returnData.qasSample.name
              : ""
          );
          $this.$set(
            $this.sampleForm.sampleInfo,
            "product",
            returnData.qasSamplingTask && returnData.qasSamplingTask.productName
              ? returnData.qasSamplingTask.productName
              : ""
          );
          $this.$set(
            $this.sampleForm.sampleInfo,
            "nature__dsp",
            returnData.qasPlan && returnData.qasPlan.nature__dsp
              ? returnData.qasPlan.nature__dsp
              : ""
          );
          $this.$set(
            $this.sampleForm.sampleInfo,
            "weight",
            returnData.qasSample && returnData.qasSample.weight
              ? returnData.qasSample.weight
              : ""
          );
          $this.$set(
            $this.sampleForm.sampleInfo,
            "sampleCopyNum",
            returnData.qasPlanSampleRequest &&
              returnData.qasPlanSampleRequest.sampleCopyNum
              ? returnData.qasPlanSampleRequest.sampleCopyNum
              : ""
          );
          $this.$set(
            $this.sampleForm.sampleInfo,
            "samplingDt",
            returnData.qasSamplingTask && returnData.qasSamplingTask.samplingDt
              ? this.$dateUtl.getTime(returnData.qasSamplingTask.samplingDt)
              : ""
          );
        }
      });
    }
  },
  props: {
    qasSampleId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    qasSampleId: {
      handler(val) {
        this.resultEnterObject.qasSampleId = val;
        this.findAllSampleMsg();
        this.findsampleCheckReportFileList();
      },
      immediate: true
    }
  }
};
</script>
