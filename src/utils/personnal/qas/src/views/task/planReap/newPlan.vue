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
              <el-radio-group v-model="planForm.nature" @change="planClick">
                <el-radio
                  v-for="name in nameGroup"
                  :key="name.value"
                  :label="name.value"
                  name="nature"
                >
                  {{ name.text }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <br />
            <!--表单第二行-->
            <el-form-item label="计划标题:" prop="name">
              <el-input v-model="planForm.name" class="dialog_input"></el-input>
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
                @change="handChange"
                class="dialog_input"
                clearable
              ></el-cascader>
            </el-form-item>
            <el-form-item label="监测级别:" prop="adminLevel">
              <el-select
                v-model="planForm.adminLevel"
                @change="admin_change"
                class="dialog_input"
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
              prop="sampleRequest[0].requiredGradeList"
            >
              <el-select
                v-model="planForm.sampleRequest[0].requiredGradeList"
                placeholder="样品等级要求"
                class="dialog_input"
                multiple
                clearable
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
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="标准类别:" prop="stdSuitsArray">
              <el-select
                v-model="planForm.stdSuitsArray"
                multiple
                placeholder="请选择"
                class="dialog_input"
              >
                <el-option
                  v-for="item in data.stdSuitsDataSource"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <br />
            <el-form-item label="是否定时下发:" prop="isTimingSent">
              <el-switch
                v-model="planForm.isTimingSent"
                active-text="是"
                inactive-text="否"
                active-value="Y"
                inactive-value="N"
              />
              <el-tooltip
                class="item"
                effect="dark"
                content="选择'是'则根据下发时间自动下发"
                placement="top-start"
                style="margin-left: 5px;vertical-align: middle"
              >
                <el-icon class="el-icon-question"></el-icon>
              </el-tooltip>
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
                :on-change="loadFiles"
                :on-remove="loadFiles"
                :file-list="planForm.fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <el-button type="primary" class="step_btn" @click="step2">
          下一步
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="任务管理" name="second" :disabled="tabs2_act">
        <div class="plan_from height600">
          <!--<el-collapse v-model="activeName2" accordion>
            <el-collapse-item name="1">
              <template slot="title">
                <span class="panel_tit">查询条件</span>
              </template>-->
          <el-form
            label-width="80px"
            :inline="true"
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
                    <el-select v-model="planFormTask.flag" clearable>
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
            <!--<el-form-item label="是否作废:">
                  <el-select v-model="planFormTask.drop" clearable>
                    <el-option
                      v-for="item in drops"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>-->
          </el-form>
          <!--  </el-collapse-item>
          </el-collapse>-->
          <div class="tool-bar bgfff">
            <el-dropdown class="mg_right" @command="taskAction">
              <el-button>
                批量操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :disabled="showBathDen" command="tosampler">
                  分配执行人
                </el-dropdown-item>
                <el-dropdown-item :disabled="showBathDen" command="tochecker">
                  分配质检人
                </el-dropdown-item>
                <!--<el-dropdown-item :disabled="showBathDen">指定产品品种</el-dropdown-item>-->
                <el-dropdown-item :disabled="showBathDen" command="sct">
                  作废或启用任务
                </el-dropdown-item>
                <el-dropdown-item :disabled="showBathDen" command="d">
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button class="s-tool-btn" @click="openSummaryTaskDialog">
              汇总任务
            </el-button>
            <el-button
              type="primary"
              class="s-tool-btn"
              @click="dialog_dis = true"
            >
              精确布点
            </el-button>
            <el-button
              type="primary"
              class="s-tool-btn"
              @click="dialog_reg = true"
            >
              区域布点
            </el-button>
            <el-button
              type="primary"
              class="s-tool-btn"
              @click="dialog_copyTakByPlan = true"
            >
              复制计划新增任务
            </el-button>
            <!--<el-button type="primary" class="s-tool-btn">复制计划新增样品信息</el-button>-->
          </div>
          <template>
            <el-table
              ref="taskTable"
              :data="tableDataTask"
              tooltip-effect="dark"
              style="width: 100%"
              :border="true"
              max-height="400px"
              @selection-change="handleSelectionChange"
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
              <el-table-column prop="product" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="editTsk(scope.row)"
                  >
                    编辑
                  </el-button>
                </template>
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
        <el-button type="primary" class="step_btn" @click="step3">
          下一步
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="检验指标管理" name="third" :disabled="tabs3_act">
        <div class="plan_from height600">
          <qaCheckItem :selectedQasPlanId="qasPlanId"></qaCheckItem>
        </div>
        <el-button type="primary" class="step_btn" @click="planOver">
          完成
        </el-button>
      </el-tab-pane>
    </el-tabs>
    <!--精确布点弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      title="精确布点"
      :visible.sync="dialog_dis"
      v-if="dialog_dis"
      width="75%"
      top="4%"
      :append-to-body="true"
    >
      <distribution ref="distribution" :link="planForm.link"></distribution>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveDistribution">保存</el-button>
        <el-button @click="dialog_dis = false">关闭</el-button>
      </div>
    </el-dialog>
    <!--区域布点弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      title="区域布点"
      :visible.sync="dialog_reg"
      v-if="dialog_reg"
      width="75%"
      top="4%"
      :append-to-body="true"
    >
      <region ref="region" :link="planForm.link"></region>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveRegion">保存</el-button>
        <el-button @click="dialog_reg = false">关闭</el-button>
      </div>
    </el-dialog>
    <!--批量指定扦样人弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      title="批量指定扦样人"
      :visible.sync="dialog_samp"
      v-if="dialog_samp"
      :top="mg_top"
      :width="dilogWith"
      :append-to-body="true"
    >
      <sampler @transfToSampler="getToSampler"></sampler>
    </el-dialog>
    <!--批量指定质检人弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      title="批量指定质检人"
      :visible.sync="dialog_checker"
      v-if="dialog_checker"
      :top="mg_top"
      :width="dilogWith"
      :append-to-body="true"
    >
      <checker @transfToChecker="getToChecker"></checker>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      :close-on-click-modal="false"
      title="编辑任务"
      :visible.sync="dialog_taskEdit"
      v-if="dialog_taskEdit"
      :append-to-body="true"
    >
      <task-edit
        ref="taskEdit"
        :link="planForm.link"
        :taskId="samplingTaskId"
        @transfTaskEditCancel="closeTaskEdit"
      ></task-edit>
    </el-dialog>
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
    <!--复制计划新增任务弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      title="复制计划新增任务"
      :visible.sync="dialog_copyTakByPlan"
      v-if="dialog_copyTakByPlan"
      :top="mg_top"
      width="85%"
      :append-to-body="true"
    >
      <copy-task-by-plan
        :planType="planType"
        @copyPlanTask="copyTaskByPlan"
      ></copy-task-by-plan>
    </el-dialog>
  </div>
</template>

<script>
import distribution from "./distribution";
import area from "./area";
import sampler from "../../common/sampler";
import checker from "../../common/checker";
import taskEdit from "../../common/taskEdit";
import qaCheckItem from "../../common/qaCheckItem";
import summaryTask from "./summaryTask";
import copyTaskByPlan from "../common/copyTaskByPlan";

export default {
  data() {
    return {
      planType: this.$constants.LINK_REAP,
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
        fileList: [], //上传文件数据列表绑定值
        isTimingSent: "N", //是否定时下发
        stdSuitsArray: []
      },
      data: {
        modes: [], //扦样方式来源数据
        grades: [], //判定等级来源数据
        stdSuitsDataSource: []
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
      dialog_copyTakByPlan: false,
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
      }
    };
  },
  components: {
    distribution,
    region: area,
    sampler,
    checker,
    taskEdit,
    qaCheckItem,
    summaryTask,
    copyTaskByPlan
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
      const $this = this;
      //执行校验
      this.$refs["planForm"].validate(valid => {
        if (valid) {
          let uploadForm = new FormData();
          //获取所有form对象
          $this.$refs["planForm"].fields.map(filed => {
            if (
              filed.labelFor != "viewfiles" &&
              filed.labelFor != "flowComments"
            ) {
              uploadForm.append(filed.labelFor, filed.fieldValue);
            }
          });
          let up_strName = "fbFiles";
          if ($this.planForm.fileList.length > 0) {
            for (var i = 0; i < $this.planForm.fileList.length; i++) {
              uploadForm.append(up_strName, $this.planForm.fileList[i].raw);
            }
          } else {
            if (uploadForm.has(up_strName)) uploadForm.delete(up_strName);
          }
          uploadForm.append("link", $this.$constants.LINK_REAP);
          if ($this.planForm.grainBreed) {
            uploadForm.append(
              "sampleRequest[0].grainbreedId",
              $this.planForm.grainBreed
            );
          }
          if (
            $this.planForm.sampleRequest[0] &&
            $this.planForm.sampleRequest[0].productName
          ) {
            uploadForm.append(
              "sampleRequest[0].productName",
              $this.planForm.sampleRequest[0].productName
            );
          }
          if ($this.qasPlanId && $this.qasPlanId > 0) {
            uploadForm.append("qasPlanId", $this.qasPlanId);
          }
          if (
            $this.planForm.sampleRequest[0].qasPlanSampleRequestId &&
            $this.planForm.sampleRequest[0].qasPlanSampleRequestId > 0
          ) {
            uploadForm.append(
              "sampleRequest[0].qasPlanSampleRequestId",
              $this.planForm.sampleRequest[0].qasPlanSampleRequestId
            );
          }
          if (
            $this.planForm.stdSuitsArray &&
            $this.planForm.stdSuitsArray.length > 0
          ) {
            uploadForm.append(
              "stdSuits",
              $this.planForm.stdSuitsArray.join(",")
            );
          }
          $this.submit(uploadForm, $this);
        } else {
          return false;
        }
      });
    },
    submit(formData, $this) {
      this.$post({
        url:
          this.qasPlanId && this.qasPlanId > 0
            ? "/_data/task/plan/updatePlan"
            : "/_data/task/plan/insertPlan",
        param: formData,
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
          if (data.data && (!$this.qasPlanId || $this.qasPlanId === 0)) {
            $this.qasPlanId = data.data;
          }
          $this.activeName = "second";
          $this.step2_active = false;
          //点击下一步 执行获取任务管理页签的方法
          $this.doActive();
          //通知父页面刷新列表
          $this.$emit(this.$constants.EMIT_TRANSFRELOADDATA, "Y");
        }
      });
    },
    step3() {
      let planParamId = this.qasPlanId;
      this.qasPlanId = 0;
      this.qasPlanId = planParamId;
      this.activeName = "third";
      this.step3_active = false;
      this.$emit(this.$constants.EMIT_TRANSFRELOADDATA, "Y");
    },
    planOver() {
      const $this = this;
      this.$post({
        url: "/_data/task/plan/checkPublishDT",
        param: {
          qasPlanId: this.qasPlanId,
          publishDtStr: this.planForm.publishDtStr
        },
        fnc: () => {
          $this.$emit("closeDialog", "all");
        }
      });
    },
    addTit(text) {
      let vm = this;
      let year = vm.$dateUtl.getYear();
      let admins = vm.$store.getters.admins;
      let admin = "";
      for (let i = 0; i < admins.length; i++) {
        if (vm.planForm.adminLevel == admins[i].value) {
          admin = admins[i].text;
          break;
        }
      }
      return year + "新粮收获" + admin + text;
    },
    planClick(value) {
      for (let i = 0; i < this.nameGroup.length; i++) {
        if (value == this.nameGroup[i].value) {
          this.planForm.name = this.addTit(this.nameGroup[i].text);
          break;
        }
      }
    },
    handChange() {
      let name = this.$refs["productLabel2"].getCheckedNodes();
      this.planForm.grainBreed = name[0] ? name[0].value : ""; //品种分类绑定值
      this.planForm.sampleRequest[0].grainbreedId = this.planForm.grainBreed; //品种分类值作为另一个参数传入
      this.planForm.sampleRequest[0].productName = name[0]
        ? name[0].pathLabels[0]
        : ""; //产品品种 显示名称绑定值
      console.log(this.planForm.sampleRequest[0]);
      if (this.planForm.grainBreed) {
        const vm = this;
        this.get_grade(vm);
      }
      console.log(this.planForm.sampleRequest[0]);
    },
    loadFiles(file, fileList) {
      this.planForm.fileList = fileList;
    },
    admin_change() {
      let text = "";
      for (let i = 0; i < this.nameGroup.length; i++) {
        if (this.planForm.nature == this.nameGroup[i].value) {
          text = this.nameGroup[i].text;
          break;
        }
      }
      this.planForm.name = this.addTit(text);
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
      vm.planForm.name = vm.addTit(
        vm.nameGroup && vm.nameGroup[0] ? vm.nameGroup[0].text : ""
      );

      //获取扦样方式
      this.$Api.getDic("qas_sample_way").then(data => {
        vm.data.modes = data;
      });

      //判定等级
      this.get_grade(vm);
      //获取判定结果标准
      this.$Api.getDic(this.$constants.STDSUITSTYPE).then(data => {
        vm.data.stdSuitsDataSource = data;
      });
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
            vm.totalTask = 0;
            vm.tableDataTask = [];
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
    editTsk(scopeRow) {
      //编辑任务
      if (!scopeRow) {
        return false;
      }
      this.samplingTaskId = scopeRow.qasSamplingTaskId;
      this.dialog_taskEdit = true;
    },
    taskAction(commond) {
      let url = "";
      let successText = "操作成功";
      let content = "";
      let paramValue = {
        params: this.selectedTasks
      };
      switch (commond) {
        case "sct": //作废或启用任务
          url = "/_data/task/samplingTask/cancelOrStart";
          content = "是否确定作废或启用选中任务?";
          break;
        case "d": //删除任务
          url = "/_data/task/samplingTask/deleteTaskList";
          successText = "删除成功";
          content = "是否确定删除选中任务?";
          paramValue = {
            params: {
              qasPlanId: this.qasPlanId,
              qasSamplingTaskList: this.selectedTasks
            }
          };
          break;
        case "tosampler": //分配执行人
          url = "tosampler";
          this.dialog_samp = true;
          break;
        case "tochecker": //分配质检人
          url = "tochecker";
          this.dialog_checker = true;
          break;
        default:
          break;
      }
      if (!url || "tosampler" === url || "tochecker" === url) {
        return false;
      }
      //弹窗
      let param = {
        content: content,
        url: url,
        sucessText: successText,
        errorText: "操作失败",
        cancelText: "已取消操作",
        qasTaskVoList: paramValue.params
      };
      const $this = this;
      this.$confirm(param.content, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post({
            url: param.url,
            param: param.qasTaskVoList,
            fnc: data => {
              let showtype = "success";
              let message = param.sucessText;
              if (!data.success) {
                showtype = "warn";
                message = param.errorText;
              }
              this.$message({
                type: showtype,
                message: message
              });
              if (data.success) {
                $this.get_sampleBY($this);
                //$this
                $this.get_sampleArea($this);
                //变为第一页
                $this.currentPageTask = 1;
                $this.doSearchTask();
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: param.cancelText
          });
        });
    },
    taskAreaChange() {
      let areas = this.$refs["planFormTaskArea"].getCheckedNodes();
      this.planFormTask.areaSelected =
        areas[0] && areas[0].value ? areas[0].value : "";
    },
    saveDistribution() {
      //精准布点保存
      let multipleParam = this.$refs.distribution.tableData;
      if (!multipleParam) {
        return false;
      }
      //判断是否指定了扦样人/单位、质检人单位
      let isSubmit = true;
      for (let index in multipleParam) {
        let multipleParamObject = multipleParam[index];
        if (
          (!multipleParamObject.performerId &&
            !multipleParamObject.samplingOrgId) ||
          !multipleParamObject.qaOrgId
        ) {
          isSubmit = false;
          break;
        }
      }
      if (!isSubmit) {
        this.$message({
          type: "error",
          message: "请设置 扦样单位(人) 和 质检单位(人)"
        });
        return false;
      }
      //调用保存接口
      const $this = this;
      this.$post({
        url: "/_data/task/samplingTask/saveTasks",
        param: {
          qasLink: this.planForm.link,
          qasPlanId: this.qasPlanId,
          taskVoList: multipleParam
        },
        fnc: data => {
          let showtype = "success";
          let message = "保存成功";
          if (!data.success) {
            showtype = "warn";
            message = "保存失败";
          }
          this.$message({
            type: showtype,
            message: message
          });
          if (data.success) {
            //变为第一页
            this.currentPageTask = 1;
            //获取扦样人
            this.get_sampleBY($this);
            //获取扦样区域
            this.get_sampleArea($this);
            this.doSearchTask();
            this.dialog_dis = false;
          }
        }
      });
    },
    saveRegion() {
      //区域布点保存
      let regionParam = this.$refs.region.tableData;
      if (!regionParam) {
        return false;
      }
      //判断是否指定了扦样人/单位、质检人单位
      let isSubmit = true;
      for (let index in regionParam) {
        let regionParamObject = regionParam[index];
        if (
          (!regionParamObject.performerId &&
            !regionParamObject.samplingOrgId) ||
          !regionParamObject.qaOrgId
        ) {
          isSubmit = false;
          break;
        }
      }
      if (!isSubmit) {
        this.$message({
          type: "error",
          message: "请设置 扦样单位(人) 和 质检单位(人)"
        });
        return false;
      }
      //调用保存接口
      const $this = this;
      this.$post({
        url: "/_data/task/planDtl/savePlanDtlList",
        param: { qasPlanId: this.qasPlanId, qasPlanDtlList: regionParam },
        fnc: data => {
          let showtype = "success";
          let message = "保存成功";
          if (!data.success) {
            showtype = "warn";
            message = "保存失败";
          }
          this.$message({
            type: showtype,
            message: message
          });
          if (data.success) {
            //变为第一页
            this.currentPageTask = 1;
            //获取扦样人
            this.get_sampleBY($this);
            //获取扦样区域
            this.get_sampleArea($this);
            this.doSearchTask();
            this.dialog_reg = false;
          }
        }
      });
    },
    getToSampler(samplerParam) {
      //指定扦样单位/人
      if (!this.selectedTasks) {
        return false;
      }
      let paramArray = [];
      for (let index in this.selectedTasks) {
        let qasSamplingTaskId = this.selectedTasks[index].qasSamplingTaskId;
        let param = {
          qasSamplingTaskId: qasSamplingTaskId
        };
        if (samplerParam.activeName === "first") {
          //扦样单位
          param.samplingOrgName = samplerParam.samplingOrgName;
          param.samplingOrgId = samplerParam.samplingOrgId;
        } else {
          param.performerName = samplerParam.performerName;
          param.performerId = samplerParam.performerId;
        }
        paramArray.push(param);
      }

      this.$post({
        url: "/_data/task/samplingTask/distribution",
        param: paramArray,
        fnc: data => {
          let showtype = "success";
          let message = "操作成功";
          if (!data.success) {
            showtype = "warn";
            message = "操作失败";
          }
          this.$message({
            type: showtype,
            message: message
          });
          if (data.success) {
            //变为第一页
            //为了让search_panel监听变化生效执行查询方法 先设置为0  然后在search_panel查询方法内 监听到时0则赋值为1
            this.currentPageTask = 1;
            this.doActive();
            this.dialog_samp = false;
          }
        }
      });
    },
    getToChecker(checlerParam) {
      if (!this.selectedTasks) {
        return false;
      }
      let paramArray = [];
      for (let index in this.selectedTasks) {
        let qasSamplingTaskId = this.selectedTasks[index].qasSamplingTaskId;
        let param = {
          qasSamplingTaskId: qasSamplingTaskId,
          qaOrgName: checlerParam.qaOrgName,
          qaOrgId: checlerParam.qaOrgId
        };
        paramArray.push(param);
      }

      this.$post({
        url: "/_data/task/samplingTask/distribution",
        param: { qasTaskVoList: paramArray },
        fnc: data => {
          let showtype = "success";
          let message = "操作成功";
          if (!data.success) {
            showtype = "warn";
            message = "操作失败";
          }
          this.$message({
            type: showtype,
            message: message
          });
          if (data.success) {
            //变为第一页
            //为了让search_panel监听变化生效执行查询方法 先设置为0  然后在search_panel查询方法内 监听到时0则赋值为1
            this.currentPageTask = 1;
            this.doActive();
            this.dialog_checker = false;
          }
        }
      });
    },
    closeTaskEdit(obj) {
      if (obj === "success") {
        this.doActive();
      }
      this.samplingTaskId = 0;
      this.dialog_taskEdit = false;
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
            $this.$set($this.planForm, "isTimingSent", resurtData.isTimingSent);
            $this.$set(
              $this.planForm,
              "stdSuitsArray",
              resurtData.stdSuitsList
            );
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
    },
    copyTaskByPlan(selectPlanParams) {
      //debugger;
      let planId = selectPlanParams.planIds;
      //let selectRows = selectPlanParams.rows;
      if (planId.length > 0) {
        this.$post({
          url: "_data/task/samplingTask/copyTask",
          fnc: data => {
            if (data.success) {
              this.doSearchTask();
              if (data.data != "0") {
                this.dialog_copyTakByPlan = false;
                this.$message({
                  type: "success",
                  message: "操作成功"
                });
              } else {
                this.$message({
                  type: "success",
                  message: "当前计划不存在可复制的任务"
                });
              }
            }
          },
          param: { value: this.qasPlanId, commonEntityValues: planId }
        });
      }
    }
  },
  beforeMount() {
    this.findPlanFiles();
  },
  created() {
    this.init();
    if (this.qasPlanId > 0) {
      //编辑操作赋值
      //允许点击页签
      this.step2_active = false;
      this.step3_active = false;
      this.findPlan();
    }
  },
  watch: {
    selectedQasPlanId: {
      handler(newVal) {
        this.qasPlanId = newVal;
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
