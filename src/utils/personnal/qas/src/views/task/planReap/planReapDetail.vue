<template>
  <div class="dialog_root">
    <el-tabs v-model="activeName" type="card" @tab-click="doActive">
      <el-tab-pane label="计划信息" name="first">
        <div class="plan_from height600">
          <el-form
            label-width="110px"
            :inline="true"
            :model="planForm"
            :rules="rules"
            ref="planForm"
          >
            <!--表单第一行-->
            <el-form-item label="计划性质:" prop="nature">
              <el-radio-group v-model="planForm.nature">
                <el-radio-button
                  v-for="name in nameGroup"
                  :key="name.value"
                  :label="name.value"
                  name="nature"
                  :disabled="disabledParam"
                  v-bind:class="{ fontMainBlack: disabledParam }"
                >
                  {{ name.text }}
                </el-radio-button>
              </el-radio-group>
            </el-form-item>
            <br />
            <!--表单第二行-->
            <el-form-item label="计划标题:" prop="name">
              <el-input
                v-model="planForm.name"
                class="dialog_input"
                :disabled="disabledParam"
                v-bind:class="{ fontMainBlack: disabledParam }"
              ></el-input>
            </el-form-item>
            <el-form-item label="产品品种:" prop="grainBreed">
              <el-cascader
                v-model="planForm.grainBreed"
                :options="$store.getters.products"
                :props="{
                  expandTrigger: 'hover',
                  label: 'text',
                  value: 'id'
                }"
                ref="productLabel2"
                class="dialog_input"
                clearable
                :disabled="disabledParam"
                v-bind:class="{ fontMainBlack: disabledParam }"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="监测级别:" prop="adminLevel">
              <el-select
                v-model="planForm.adminLevel"
                class="dialog_input"
                :disabled="disabledParam"
                v-bind:class="{ fontMainBlack: disabledParam }"
              >
                <el-option
                  v-for="item in $store.getters.admins"
                  :key="item.text"
                  :label="item.text"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!--表单第三行-->
            <el-form-item label="扦样方式:" prop="sampleWay">
              <el-select
                v-model="planForm.sampleWay"
                placeholder="扦样方式"
                class="dialog_input"
                :disabled="disabledParam"
                v-bind:class="{ fontMainBlack: disabledParam }"
              >
                <el-option
                  v-for="item in data.modes"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <br />
            <el-form-item
              label="样品等级要求:"
              prop="sampleRequest[0].requiredGrade"
            >
              <el-select
                v-model="planForm.sampleRequest[0].requiredGrade"
                placeholder="样品等级要求"
                multiple
                class="dialog_input"
                :disabled="disabledParam"
                v-bind:class="{ fontMainBlack: disabledParam }"
              >
                <el-option
                  v-for="item in data.grades"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="下发时间:" prop="publishDtStr">
              <el-date-picker
                v-model="planForm.publishDtStr"
                type="date"
                value-format="yyyy-MM-dd"
                class="dialog_input"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                :disabled="disabledParam"
                v-bind:class="{ fontMainBlack: disabledParam }"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="扦样要求:"
              prop="sampleRequest[0].samplingRequire"
            >
              <el-input
                v-model="planForm.sampleRequest[0].samplingRequire"
                class="dialog_input"
                :disabled="disabledParam"
                v-bind:class="{ fontMainBlack: disabledParam }"
              ></el-input>
            </el-form-item>
            <!--表单第四行-->
            <el-form-item
              label="样品重量:"
              prop="sampleRequest[0].sampleWeight"
            >
              <el-input
                v-model.number="planForm.sampleRequest[0].sampleWeight"
                class="input-with-select dialog_input"
                :disabled="disabledParam"
                v-bind:class="{ fontMainBlack: disabledParam }"
              >
                <template slot="append">
                  公斤
                </template>
              </el-input>
            </el-form-item>
            <br />
            <el-form-item
              label="一式份数:"
              prop="sampleRequest[0].sampleCopyNum"
            >
              <el-input-number
                v-model="planForm.sampleRequest[0].sampleCopyNum"
                @change="handleChange"
                :min="1"
                class="dialog_input"
                :disabled="disabledParam"
                v-bind:class="{ fontMainBlack: disabledParam }"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="开始时间:" prop="startDtStr">
              <el-date-picker
                v-model="planForm.startDtStr"
                type="date"
                value-format="yyyy-MM-dd"
                class="dialog_input"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                :disabled="disabledParam"
                v-bind:class="{ fontMainBlack: disabledParam }"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="要求完成日期:" prop="deadlineDtStr">
              <el-date-picker
                v-model="planForm.deadlineDtStr"
                type="date"
                value-format="yyyy-MM-dd"
                class="dialog_input"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                :disabled="disabledParam"
                v-bind:class="{ fontMainBlack: disabledParam }"
              >
              </el-date-picker>
            </el-form-item>
            <br />
            <!--表单第五行-->
            <el-form-item label="文件上传:">
              <el-upload
                class="upload-demo"
                ref="upload"
                action=""
                :auto-upload="false"
                name="fileList"
                :file-list="planForm.fileList"
              >
                <el-button size="small" type="primary" v-if="!disabledParam">
                  点击上传
                </el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <el-button class="step_btn" @click="planOver">
          关闭
        </el-button>
        <el-button type="primary" class="step_btn" @click="step2">
          下一步
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="任务管理" name="second" :disabled="tabs2_act">
        <div class="plan_from height600">
          <el-form
            label-width="100px"
            :model="planFormTask"
            ref="planFormTaskForm"
          >
            <el-row>
              <el-col :span="21">
                <el-col :span="6">
                  <el-form-item label="任务编号:">
                    <el-input
                      v-model="planFormTask.taskNo"
                      class="dialog_input"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否完成:">
                    <el-select
                      v-model="planFormTask.flag"
                      clearable
                      class="width100"
                    >
                      <el-option
                        v-for="item in flags"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="扦样地区:">
                    <el-cascader
                      class="width100"
                      v-model="planFormTask.areaSelected"
                      :options="area"
                      :props="{
                        expandTrigger: 'hover',
                        label: 'text',
                        value: 'id',
                        checkStrictly: true
                      }"
                      clearable
                      ref="planFormTaskArea"
                      @change="taskAreaChange"
                    ></el-cascader>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="扦样人:">
                    <el-select
                      v-model="planFormTask.people"
                      class="width100"
                      clearable
                      filterable
                    >
                      <el-option
                        v-for="item in people"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="3" class="textAlignRight">
                <el-button
                  type="primary"
                  class="search_btn"
                  @click="doSearchTask"
                >
                  查询
                </el-button>
              </el-col>
            </el-row>
          </el-form>
          <!--  </el-collapse-item>
                    </el-collapse>-->
          <div class="tool-bar bgfff">
            <el-button class="s-tool-btn" @click="openSummaryTaskDialog">
              汇总任务
            </el-button>
          </div>
          <template>
            <el-table
              ref="taskTable"
              :data="tableDataTask"
              tooltip-effect="dark"
              :border="true"
              style="width: 100%"
              :max-height="maxHeight"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="code" label="任务编号" width="150">
              </el-table-column>
              <el-table-column prop="district__dsp" label="区/县" width="120">
              </el-table-column>
              <el-table-column prop="productName" label="产品品种">
              </el-table-column>
              <el-table-column label="扦样人">
                <template slot-scope="scope">
                  {{ scope.row.performerId__dsp || scope.row.samplingOrgName }}
                </template>
              </el-table-column>
              <el-table-column prop="qaOrgName" label="质检人">
              </el-table-column>
              <el-table-column prop="deadlineDtStr" label="要求完成时间">
              </el-table-column>
              <el-table-column prop="cancelFlagName" label="是否作废">
              </el-table-column>
              <el-table-column prop="overFlagName" label="是否已完成">
              </el-table-column>
            </el-table>
          </template>
          <template>
            <div class="block">
              <el-pagination
                :current-page="currentPageTask"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pagesizeTask"
                :layout="$constants.paginationlayout"
                :total="totalTask"
              >
              </el-pagination>
            </div>
          </template>
        </div>
        <el-button class="step_btn" @click="planOver">
          关闭
        </el-button>
        <el-button type="primary" class="step_btn" @click="step3">
          下一步
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="检验指标管理" name="third" :disabled="tabs3_act">
        <div class="plan_from height600">
          <qaCheckItem
            :selectedQasPlanId="qasPlanId"
            :disabledParam="disabledParam"
          ></qaCheckItem>
        </div>
        <el-button class="step_btn" @click="planOver">
          关闭
        </el-button>
      </el-tab-pane>
    </el-tabs>
    <!--汇总任务窗口-->
    <el-dialog
      :close-on-click-modal="false"
      title="汇总任务"
      :visible.sync="dialog_taskSum"
      v-if="dialog_taskSum"
      width="75%"
      :top="mg_top"
      :append-to-body="true"
    >
      <summary-task ref="taskSummary" :planId="qasPlanId"></summary-task>
      <div slot="footer" class="dialog-footer">
        <!--<el-button type="primary" @click="taskSummaryOutput">导出</el-button>-->
        <el-button @click="dialog_taskSum = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qaCheckItem from "../../common/qaCheckItem";
import summaryTask from "./summaryTask";
export default {
  name: "planReapDetail",
  data() {
    return {
      disabledParam: true,
      reset_dialog: true,
      /*--------------------------计划信息数据对象------------------------------------------*/
      activeName: "first", //默认激活页签
      activeName2: "1",
      step2_active: true,
      step3_active: true,
      rules: {
        //表单验证规则
        grainBreed: {
          required: true,
          message: "请选择产品品种",
          trigger: "change"
        },
        "sampleRequest[0].productName": {
          required: true,
          message: "请选择产品品种"
        },
        name: { required: true, message: "请选择计划标题", trigger: "change" },
        sampleWay: {
          required: true,
          message: "请选择扦样方式",
          trigger: "change"
        },
        adminLevel: {
          required: true,
          message: "请选择监测级别",
          trigger: "change"
        },
        publishDtStr: {
          required: true,
          message: "请选择下发时间",
          trigger: "change"
        },
        "sampleRequest[0].sampleWeight": [
          { required: true, message: "请输入样品重量", trigger: "change" },
          { type: "number", message: "重量必须是数字", trigger: "change" }
        ],
        "sampleRequest[0].sampleCopyNum": {
          required: true,
          message: "请输入样品份数",
          trigger: "change"
        },
        startDtStr: {
          required: true,
          message: "请选择开始时间",
          trigger: "change"
        },
        deadlineDtStr: {
          required: true,
          message: "请选择完成时间",
          trigger: "change"
        }
      },
      planForm: {
        //表单数据对象
        link: this.$constants.LINK_REAP,
        name: "", //计划标题
        nature: "", //计划性质
        startDtStr: this.$dateUtl.getNowTime(), //开始时间
        adminLevel: this.$store.getters.admins[0]
          ? this.$store.getters.admins[0].value
          : "", //监测级别
        plan_origin: "", //计划来源
        publishDtStr: this.$dateUtl.getNowTime(), //下发时间
        deadlineDtStr: "", //要求完成时间
        sampleRequest: [
          {
            grainbreedId: "",
            productName: "", //产品品种绑定值
            sampleWeight: 1, //样品重量绑定值
            sampleCopyNum: 1, //一式份数绑定值
            samplingRequire: "", //扦样要求绑定值
            requiredGrade: "", //判定等级
            qasPlanSampleRequestId: 0 //扦样要求id
          }
        ],
        grainBreed: "", //产品分类绑定值
        sampleWay: "", //扦样方式绑定值
        fileList: [] //上传文件数据列表绑定值
      },
      data: {
        modes: [], //扦样方式来源数据
        grades: [] //判定等级来源数据
      },
      nameGroup: [
        //产品标题选择
      ],
      /*--------------------------任务管理数据对象------------------------------------------*/
      flags: [],
      drops: [
        {
          text: "作废",
          value: "0"
        },
        {
          text: "未作废",
          value: "1"
        }
      ],
      area: [],
      people: [],
      tableDataTask: [],
      currentPageTask: 1,
      pagesizeTask: this.$constants.numberPerpage,
      totalTask: 0,
      planFormTask: {
        taskNo: "",
        grainBreed: "",
        flag: "",
        drop: "",
        assigned: "",
        areaSelected: "",
        people: ""
      },
      multipleSelection: [],
      dialog_dis: false,
      dialog_reg: false,
      planForm3: {},
      showBathDen: true,
      selectedTasks: [],

      //mg_top: "4%",
      dilogWith: "70%",
      dialog_samp: false,
      dialog_checker: false,
      dialog_taskSum: false, // 汇总任务窗口显示
      mg_top: this.$constants.dialog_margin_top,
      //===============编辑
      dialog_taskEdit: false,
      samplingTaskId: 0,
      qasPlanId: 0,
      pickerOptions: {
        disabledDate(time) {
          let time1 = time.toLocaleDateString().replace(/\//g, "-");
          let time1Array = time1.split("-");
          time1Array[1] =
            time1Array[1] > 9 ? time1Array[1] : "0" + time1Array[1];
          time1Array[2] =
            time1Array[2] > 9 ? time1Array[2] : "0" + time1Array[2];
          time1 = time1Array.join("-");
          let time2 = new Date().toLocaleDateString().replace(/\//g, "-");
          let time2Array = time2.split("-");
          time2Array[1] =
            time2Array[1] > 9 ? time2Array[1] : "0" + time2Array[1];
          time2Array[2] =
            time2Array[2] > 9 ? time2Array[2] : "0" + time2Array[2];
          time2 = time2Array.join("-");
          return time1 < time2;
        }
      },

      maxHeight: "380px"
    };
  },
  components: {
    qaCheckItem,
    summaryTask
  },
  computed: {
    tabs2_act: function() {
      return this.step2_active;
    },
    tabs3_act: function() {
      return this.step3_active;
    }
  },
  methods: {
    //面板初始化
    init() {
      const vm = this;
      this.initCommonMethod(vm);
    },
    handleChange() {},
    step2() {
      let planParamId = this.qasPlanId;
      this.qasPlanId = 0;
      this.qasPlanId = planParamId;
      this.activeName = "second";
      this.step2_active = false;
      //点击下一步 执行获取任务管理页签的方法
      this.doActive();
    },
    step3() {
      let planParamId = this.qasPlanId;
      this.qasPlanId = 0;
      this.qasPlanId = planParamId;
      this.activeName = "third";
      this.step3_active = false;
    },
    planOver() {
      this.$emit("closeDialog", "all");
    },
    pageSizeSet() {
      return 0;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.showBathDen = val.length > 0 ? false : true;
      this.selectedTasks = [];
      val.forEach(item => {
        //用item操作每一条数据。
        this.selectedTasks.push({ qasSamplingTaskId: item.qasSamplingTaskId });
      });
    },
    initCommonMethod(vm) {
      //获取计划性质数据
      vm.nameGroup = this.$store.getters.natures;
      vm.planForm.nature =
        vm.nameGroup && vm.nameGroup[0] ? vm.nameGroup[0].value : "";

      //获取扦样方式
      this.$Api.getDic("qas_sample_way").then(data => {
        vm.data.modes = data;
      });

      //判定等级
      this.get_grade(vm);
    },
    get_grade(vm) {
      //获取判定等级
      this.$Api.getDic(this.$constants.GRAINRANK).then(data => {
        vm.data.grades = data;
      });
    },
    //完成状态
    get_overFlags(vm) {
      //获取完成状态
      this.$Api.getOverFlag().then(data => {
        vm.flags = data;
      });
    },
    //获取扦样地区
    get_sampleArea(vm) {
      //获取扦样地区
      this.$Api.getSampleArea({ qasPlanId: this.qasPlanId }).then(data => {
        vm.area = data && data[0] ? data[0].children : [];
      });
    },
    //获取扦样人
    get_sampleBY(vm) {
      this.$Api.getSampler({ qasPlanId: this.qasPlanId }).then(data => {
        vm.people = data;
      });
    },
    doActive() {
      const $this = this;
      if (this.activeName === "first") {
        if (
          this.qasPlanId > 0 &&
          (!this.planForm.sampleRequest[0].qasPlanSampleRequestId ||
            this.planForm.sampleRequest[0].qasPlanSampleRequestId === 0)
        ) {
          //获取扦样要求id
          this.$get({
            url: "/_data/task/plan/findQasPlan",
            fnc: data => {
              if (data.success && data.data) {
                let resurtData = data.data;
                let sampleRequestData = resurtData.sampleRequest[0];
                this.$set(
                  this.planForm.sampleRequest[0],
                  "qasPlanSampleRequestId",
                  sampleRequestData && sampleRequestData.qasPlanSampleRequestId
                    ? sampleRequestData.qasPlanSampleRequestId
                    : 0
                );
              }
            },
            param: { qasPlanId: this.qasPlanId }
          });
        }
      } else if (this.activeName === "second") {
        //任务管理页签
        this.get_overFlags($this);
        this.get_sampleBY($this);
        //获取扦样区域
        this.get_sampleArea($this);
        // this.qasPlanId = this.$router.currentRoute.params.qasPlanId;
        if (this.qasPlanId > 0) {
          //是编辑操作  则要获取列表数据
          this.doSearchTask();
        }
      }
    },
    doSearchTask() {
      const vm = this;
      //获取任务信息 tableDataTask
      let param = {
        page: this.currentPageTask,
        rows: this.pagesizeTask
      };
      if (this.planFormTask.taskNo) {
        param.code = this.planFormTask.taskNo;
      }
      if (this.planFormTask.flag) {
        param.overFlag = this.planFormTask.flag;
      }
      if (this.planFormTask.drop) {
        param.cancelFlag = this.planFormTask.drop;
      }
      if (this.planFormTask.areaSelected) {
        param.district = this.planFormTask.areaSelected;
      }
      if (this.planFormTask.people) {
        param.samplingOrgId = this.planFormTask.people;
      }
      if (this.qasPlanId && this.qasPlanId > 0) {
        param.qasPlanId = this.qasPlanId;
      }

      this.$get({
        url: "/_data/task/samplingTask/findQasSamplingTaskPage",
        fnc: data => {
          if (!data.success || !data.rows || data.total == 0) {
            return false;
          }
          vm.totalTask = data.total;
          vm.tableDataTask = data.rows;
          vm.tableDataTask.map(function(arg) {
            arg.deadlineDtStr = vm.$dateUtl.getTime(arg.deadlineDt);
          });
        },
        param: param
      });
    },
    taskAreaChange() {
      let areas = this.$refs["planFormTaskArea"].getCheckedNodes();
      this.planFormTask.areaSelected =
        areas[0] && areas[0].value ? areas[0].value : "";
    },
    findPlan() {
      const $this = this;
      //加载数据
      this.$get({
        url: "/_data/task/plan/findQasPlan",
        fnc: data => {
          if (data.success && data.data) {
            let resurtData = data.data;
            let sampleRequestData = resurtData.sampleRequest[0];
            //给platForm赋值
            resurtData.fileList = [];
            $this.planForm = resurtData;
            $this.planForm.grainBreed = sampleRequestData.grainbreedId;
            $this.planForm.link = "1";
            //$this.planForm.fileList = [];
            //直接绑定到planForm的内容再次选择不回显 没有触发onchange时间  所以使用这种方法
            $this.$set(
              $this.planForm,
              "startDtStr",
              $this.$dateUtl.getTime(resurtData.startDt)
            );
            $this.$set(
              $this.planForm,
              "publishDtStr",
              $this.$dateUtl.getTime(resurtData.publishDt)
            );
            $this.$set(
              $this.planForm,
              "deadlineDtStr",
              $this.$dateUtl.getTime(resurtData.deadlineDt)
            );
            $this.$set(
              $this.planForm.sampleRequest[0],
              "requiredGrade",
              sampleRequestData && sampleRequestData.requiredGrade
                ? sampleRequestData.requiredGrade
                : ""
            );
            $this.$set(
              $this.planForm.sampleRequest[0],
              "samplingRequire",
              sampleRequestData && sampleRequestData.samplingRequire
                ? sampleRequestData.samplingRequire
                : ""
            );
            $this.$set(
              $this.planForm.sampleRequest[0],
              "qasPlanSampleRequestId",
              sampleRequestData && sampleRequestData.qasPlanSampleRequestId
                ? sampleRequestData.qasPlanSampleRequestId
                : 0
            );
          }
        },
        param: { qasPlanId: this.qasPlanId }
      });
    },
    findPlanFiles() {
      if (this.qasPlanId == 0) {
        return false;
      }
      //获取附件信息
      let pageParam = {
          qasPlanId: this.qasPlanId
        },
        $this = this;
      $this.$get({
        url: "/_data/task/plan/findFileList",
        fnc: data => {
          if (!data.data) {
            return false;
          }
          let fileArray = [];
          data.data.map(item => {
            let fileObject = {
              name: item.fileName,
              //url: "/_data/frame/fbfile/download?fbFileId=" + item.fileId
              url: ""
            };
            fileArray.push(fileObject);
          });
          $this.planForm.fileList = fileArray;
        },
        param: pageParam
      });
    },
    openSummaryTaskDialog() {
      this.dialog_taskSum = true;
    },
    taskSummaryOutput() {
      //debugger;
      this.$refs.taskSummary.outputToExcel();
    }
  },
  beforeMount() {
    this.findPlanFiles();
  },
  created() {
    this.init();
  },
  watch: {
    selectedQasPlanId: {
      handler(newVal) {
        this.qasPlanId = newVal;
        if (this.qasPlanId > 0) {
          //编辑操作赋值
          //允许点击页签
          this.step2_active = false;
          this.step3_active = false;
          this.findPlan();
        }
      },
      immediate: true
    }
  },
  props: {
    selectedQasPlanId: {
      type: Number,
      default: 0
    }
  }
};
</script>
