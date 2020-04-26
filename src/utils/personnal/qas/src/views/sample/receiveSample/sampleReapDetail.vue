<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="样品信息" class="tab_panel height600">
        <el-collapse v-model="collapseNames">
          <el-collapse-item title="样品详情" name="0">
            <el-form label-width="210px" :inline="true" ref="sampleInfoForm">
              <el-form-item label="样品编号:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfo.code"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="样品名称:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfo.name"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="产品品种:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfo.product"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="计划性质:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfo.nature__dsp"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="样品重量(公斤):">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfo.weight"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="样品份数:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfo.sampleCopyNum"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="扦样时间:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfo.samplingDt"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="新粮收获详情" name="1">
            <el-form
              label-width="210px"
              :inline="true"
              ref="sampleInfoDetailForm"
            >
              <el-form-item label="种子品种:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfoDetail.seedType__dsp"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="种子属性:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfoDetail.seedProperty__dsp"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="种子来源:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfoDetail.seedSource__dsp"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="种植日期:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfoDetail.plantedDt"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="土壤类型:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfoDetail.soilType__dsp"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="代表面积(亩):">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfoDetail.represntArea"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="代表产量(公斤):">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfoDetail.represntYield"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="供样人:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfoDetail.sampleSupplier"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="主要施药农药:">
                <el-input
                  placeholder=""
                  type="textarea"
                  v-model="sampleForm.sampleInfoDetail.pesticides"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="名称、次数及时间:">
                <el-input
                  placeholder=""
                  type="textarea"
                  v-model="sampleForm.sampleInfoDetail.pesticideUseDesc"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="收获时间是否阴雨连绵:">
                <el-switch
                  v-model="sampleForm.sampleInfoDetail.hasRainy"
                  active-text="是"
                  inactive-text="否"
                  active-value="Y"
                  inactive-value="N"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="下雨天数:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleInfoDetail.rainyDays"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="收获粮食水分是否偏高:">
                <el-switch
                  v-model="sampleForm.sampleInfoDetail.isHigherMoisture"
                  active-text="是"
                  inactive-text="否"
                  active-value="Y"
                  inactive-value="N"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="描述:">
                <el-input
                  placeholder=""
                  type="textarea"
                  v-model="sampleForm.sampleInfoDetail.higherMoistureDesc"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="是否发生过较严重病虫害:">
                <el-switch
                  v-model="sampleForm.sampleInfoDetail.hasPest"
                  active-text="是"
                  inactive-text="否"
                  active-value="Y"
                  inactive-value="N"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="害虫名称:">
                <el-input
                  placeholder=""
                  type="textarea"
                  v-model="sampleForm.sampleInfoDetail.pests"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="是否重金属污染:">
                <el-switch
                  v-model="sampleForm.sampleInfoDetail.hasHmPollution"
                  active-text="是"
                  inactive-text="否"
                  active-value="Y"
                  inactive-value="N"
                >
                </el-switch>
              </el-form-item>
              <el-form-item label="重金属污染情况:">
                <el-input
                  placeholder=""
                  type="textarea"
                  v-model="sampleForm.sampleInfoDetail.hmPollutionDesc"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="扦样详情" name="2">
            <el-form
              label-width="210px"
              :inline="true"
              ref="sampleInfoLocationForm"
            >
              <el-form-item label="扦样方式:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleLocation.sampleWay__dsp"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="扦样定位地址:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleLocation.address"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="扦样定位点经度:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleLocation.longitude"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="扦样定位点纬度:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleLocation.latitude"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="坐标类型:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleLocation.coordType"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="扦样点地址:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleLocation.taskaddress"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="指定扦样点经度:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleLocation.tasklongitude"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="指定扦样点纬度:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleLocation.tasklatitude"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
              <el-form-item label="坐标类型:">
                <el-input
                  placeholder=""
                  v-model="sampleForm.sampleLocation.taskcoordType"
                  :disabled="true"
                  class="dialog_input"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="附件信息" class="tab_panel height600">
        <template>
          <el-table
            ref="taskFileTable"
            :data="taskFileList"
            tooltip-effect="dark"
            border
            style="width: 100%"
            max-height="500px"
          >
            <el-table-column prop="fileName" label="附件名称">
            </el-table-column>
            <el-table-column prop="fileType" label="附件类型">
            </el-table-column>
            <el-table-column prop="fileSizeFixed" label="附件大小(兆)">
            </el-table-column>
            <el-table-column label="操作">
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
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              :layout="$constants.paginationlayout"
              :total="totalNum"
            >
            </el-pagination>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="同质样" class="tab_panel height600">
        <el-table
          ref="sampleListTable"
          :data="sampleList"
          tooltip-effect="dark"
          style="width: 100%"
          max-height="500px"
        >
          <el-table-column prop="code" label="样品标号"> </el-table-column>
          <el-table-column prop="bagCode" label="样品袋条码"> </el-table-column>
          <el-table-column label="查看附件" width="150px">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-message"
                size="small"
                round
                @click="showFile(scope.row)"
                >查看附件</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :close-on-click-modal="false"
      title="样品附件列表"
      :visible.sync="dialogFileShow"
      v-if="dialogFileShow"
      :top="msg_top"
      :width="dialogFileWith"
      :append-to-body="true"
    >
      <div style="height: 500px;">
        <template>
          <el-table
            ref="sampleFileTable"
            :data="sampleFileList"
            tooltip-effect="dark"
            border
            style="width: 100%"
            height="400px"
            max-height="400px"
          >
            <el-table-column prop="fileName" label="附件名称">
            </el-table-column>
            <el-table-column prop="fileType" label="附件类型">
            </el-table-column>
            <el-table-column prop="fileSizeFixed" label="附件大小(兆)">
            </el-table-column>
            <el-table-column label="操作">
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
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChangeSampleFile"
              @current-change="handleCurrentChangeSampleFile"
              :current-page="currentPageSampleFile"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSizeSampleFile"
              :layout="$constants.paginationlayout"
              :total="totalNumSampleFile"
            >
            </el-pagination>
          </div>
        </template>
        <el-button class="step_btn" @click="dialogFileShow = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
    <fileReview :scopeRow="selectFileRow"></fileReview>
  </div>
</template>

<script>
import fileReview from "../../common/fileReview";
export default {
  name: "sampleReapDetail",
  data() {
    return {
      activeName: "0",
      collapseNames: ["0", "1", "2"],
      sampleForm: {
        sampleInfo: {},
        sampleInfoDetail: {},
        sampleLocation: {}
      },
      taskFileList: [],
      currentPage: 1,
      pageSize: this.$constants.numberPerpage,
      totalNum: 0,
      sampleList: [],
      msg_top: "4%",
      dialogFileWith: "70%",
      dialogFileShow: false,
      sampleFileList: [],
      currentPageSampleFile: 1,
      pageSizeSampleFile: this.$constants.numberPerpage,
      totalNumSampleFile: 0,
      selectedQasSampleId: 0,
      selectFileRow: {}
    };
  },
  components: {
    fileReview: fileReview
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.findTaskFile();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findTaskFile();
    },
    handleSizeChangeSampleFile(val) {
      this.pageSizeSampleFile = val;
      this.findSampleFile();
    },
    handleCurrentChangeSampleFile(val) {
      this.currentPageSampleFile = val;
      this.findSampleFile();
    },
    findSampleFile() {
      if (!this.selectedQasSampleId || this.selectedQasSampleId == 0) {
        return false;
      }
      const $this = this;
      let pageParam = {
        page: this.currentPageSampleFile,
        rows: this.pageSizeSampleFile,
        qasSampleId: this.selectedQasSampleId
      };
      this.$get({
        url: "/_data/sample/sample/findFilesBySampleId",
        fnc: data => {
          if (!data.success || !data.rows || data.rows.length == 0) {
            $this.sampleFileList = [];
            return false;
          }
          data.rows.map(item => {
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
          this.sampleFileList = data.rows;
          this.totalNumSampleFile = data.total;
        },
        param: pageParam
      });
    },
    showFile(scopeRow) {
      this.selectedQasSampleId = scopeRow.qasSampleId;
      this.dialogFileShow = true;
      this.findSampleFile();
    },
    findTaskFile() {
      const $this = this;
      //获取附件信息
      let pageParam = {
        page: this.currentPage,
        rows: this.pageSize,
        qasSampleId: this.qasSampleId
      };
      this.$get({
        url: "/_data/sample/sample/findTaskFileBySampleId",
        fnc: data => {
          if (!data.success || !data.rows || data.rows.length == 0) {
            $this.taskFileList = [];
            return false;
          }
          data.rows.map(item => {
            let kbsize = item.fileSize / 1024;
            let mbsize = kbsize / 1024;
            $this.$set(item, "fileSizeFixed", mbsize.toFixed(2));
            //拼接的href
            let hrefUrl = $this.$Api.createDownloadUrl(
              $this.$constants.baseURL,
              item.fileId
            ); //预览的链接
            let showUrl = $this.$Api.createFileShowUrl(
              $this.$constants.baseURL,
              item.fileId
            );
            $this.$set(item, "hrefUrl", hrefUrl);
            $this.$set(item, "showUrl", showUrl);
          });
          this.taskFileList = data.rows;
          this.totalNum = data.total;
        },
        param: pageParam
      });
    },
    findMsg() {
      const $this = this;
      this.$get({
        url: "/_data/sample/sample/findAllMsg",
        param: { qasSampleId: this.qasSampleId },
        fnc: data => {
          if (data.success && data.data) {
            let returnData = data.data;
            $this.sampleForm.sampleInfo.code = returnData.qasSample.code;
            $this.sampleForm.sampleInfo.name = returnData.qasSample.name;
            $this.sampleForm.sampleInfo.product =
              returnData.qasSamplingTask.productName;
            $this.sampleForm.sampleInfo.nature__dsp =
              returnData.qasPlan.nature__dsp;
            $this.sampleForm.sampleInfo.weight = returnData.qasSample.weight;
            $this.sampleForm.sampleInfo.sampleCopyNum =
              returnData.qasPlanSampleRequest.sampleCopyNum;
            $this.sampleForm.sampleInfo.samplingDt = this.$dateUtl.getTime(
              returnData.qasSamplingTask.samplingDt
            );
            $this.sampleForm.sampleInfoDetail = returnData.qasSamplingReap;
            $this.sampleForm.sampleInfoDetail.plantedDt = this.$dateUtl.getTime(
              returnData.qasSamplingReap.plantedDt
            );
            if (returnData && returnData.qasSamplingLocation) {
              $this.sampleForm.sampleLocation = returnData.qasSamplingLocation;
              $this.sampleForm.sampleLocation.coordType =
                returnData.qasSamplingLocation.coordType__dsp;
            }
            $this.sampleForm.sampleLocation.sampleWay__dsp =
              returnData.qasPlan.sampleWay__dsp;
            $this.sampleForm.sampleLocation.taskaddress =
              returnData.qasSamplingTask.address;
            $this.sampleForm.sampleLocation.tasklongitude =
              returnData.qasSamplingTask.longitude;
            $this.sampleForm.sampleLocation.tasklatitude =
              returnData.qasSamplingTask.latitude;
            $this.sampleForm.sampleLocation.taskcoordType =
              returnData.qasSamplingTask.coordType__dsp;
          }
        }
      });
    },
    findSampleMsg() {
      const $this = this;
      this.$get({
        url: "/_data/sample/sample/findAllSample",
        fnc: data => {
          $this.sampleList = data.data;
        },
        param: { qasSampleId: this.qasSampleId }
      });
    }
  },
  props: {
    qasSampleId: {
      type: Number,
      default: 0
    },
    link: {
      type: String,
      default: ""
    }
  },
  watch: {
    qasSampleId: {
      handler(val) {
        this.findMsg();
        this.findTaskFile();
        this.findSampleMsg();
      },
      immediate: true
    }
  }
};
</script>

<style>
.el-input__inner {
  color: #000 !important;
}
</style>
