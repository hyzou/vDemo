<template>
  <div class="plan_from">
    <el-form
      label-width="80px"
      :inline="true"
      :model="planFormTask"
      ref="planFormTaskForm"
    >
      <el-form-item label="任务编号:">
        <el-input v-model="planFormTask.taskNo" class="dialog_input"></el-input>
      </el-form-item>
      <el-form-item label="是否完成:">
        <el-select v-model="planFormTask.flag" clearable class="dialog_input">
          <el-option
            v-for="item in flags"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否作废:">
        <el-select v-model="planFormTask.drop" clearable class="dialog_input">
          <el-option
            v-for="item in drops"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="扦样地区:">
        <el-cascader
          v-model="planFormTask.areaSelected"
          :options="areas"
          :props="{
            expandTrigger: 'hover',
            label: 'text',
            value: 'id',
            checkStrictly: true
          }"
          clearable
          ref="planFormTaskArea"
          @change="taskAreaChange"
          class="dialog_input"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="扦样人:">
        <el-select
          v-model="planFormTask.people"
          clearable
          filterable
          class="dialog_input"
        >
          <el-option
            v-for="item in peoples"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" class="search_btn" @click="doSearchTask">
        查询
      </el-button>
    </el-form>
    <!--</el-collapse-item>
        </el-collapse>-->
    <div class="tool-bar bgfff">
      <el-dropdown class="mg_right" @command="taskAction" v-if="!disabledParam">
        <el-button>
          批量操作<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="disabledBathDen" command="tosampler"
            >指定扦样单位/人</el-dropdown-item
          >
          <el-dropdown-item :disabled="disabledBathDen" command="tochecker"
            >指定质检单位</el-dropdown-item
          >
          <el-dropdown-item :disabled="disabledBathDen" command="sct"
            >作废或启用任务</el-dropdown-item
          >
          <el-dropdown-item :disabled="disabledBathDen" command="d"
            >删除</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        type="primary"
        class="s-tool-btn"
        @click="dialog_summaryTask = true"
        v-if="!disabledParam"
      >
        汇总任务
      </el-button>
      <el-button
        type="primary"
        class="s-tool-btn"
        @click="addTask"
        v-if="!disabledParam"
      >
        任务创建
      </el-button>
    </div>
    <template>
      <el-table
        ref="taskTable"
        :data="tableDataTask"
        tooltip-effect="dark"
        style="width: 100%"
        :max-height="maxHeight"
        @selection-change="selectionRowsChange"
      >
        <el-table-column type="selection" width="55" v-if="!disabledParam">
        </el-table-column>
        <el-table-column prop="code" label="任务编号" width="150">
        </el-table-column>
        <el-table-column prop="district__dsp" label="区域" width="180">
        </el-table-column>
        <el-table-column prop="productName" label="产品品种"> </el-table-column>
        <el-table-column label="扦样单位/人">
          <template slot-scope="scope">
            {{ scope.row.performerId__dsp || scope.row.samplingOrgName }}
          </template>
        </el-table-column>
        <el-table-column prop="qaOrgName" label="质检单位/人">
        </el-table-column>
        <!--<el-table-column prop="monitorLink__dsp" label="监测环节"> </el-table-column>-->
        <el-table-column prop="targetType__dsp" label="对象类型">
        </el-table-column>
        <el-table-column prop="deadlineDtStr" label="要求完成时间">
        </el-table-column>
        <el-table-column prop="cancelFlag" label="是否作废">
          <template slot-scope="scope">
            {{ scope.row.cancelFlag == 0 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="overFlagName" label="是否已完成">
          <template slot-scope="scope">
            {{ scope.row.overFlag == 0 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="!disabledParam">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editTsk(scope.row)"
              >编辑</el-button
            >
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
        :link="planFormTask.link"
        :taskId="samplingTaskId"
        @transfTaskEditCancel="closeTaskEdit"
      ></task-edit>
    </el-dialog>
    <el-dialog
      title="任务创建"
      :visible.sync="dialog_Layout"
      v-if="dialog_Layout"
      :append-to-body="true"
      :width="dilogWith"
      :top="mg_top"
    >
      <createMarketTask
        ref="createMarketTask"
        :qasPlanId="qasPlanId"
      ></createMarketTask>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveTask">保存</el-button>
        <el-button @click="dialog_Layout = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      title="汇总任务"
      :visible.sync="dialog_summaryTask"
      v-if="dialog_summaryTask"
      width="75%"
      :top="mg_top"
      :append-to-body="true"
    >
      <summary-task ref="taskSummary" :planId="qasPlanId"></summary-task>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="taskSummaryOutput">导出</el-button>-->
        <el-button @click="dialog_summaryTask = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sampler from "../../common/sampler";
import checker from "../../common/checker";
import taskEdit from "../../common/taskEdit";
import createMarketTask from "./createMarketTask";
import summaryTask from "./summaryTask";
export default {
  name: "planMarketTask",
  data() {
    return {
      mg_top: this.$constants.dialog_margin_top,
      dilogWith: this.$constants.dialog_width,
      dialog_Layout: false,
      dialog_checker: false,
      dialog_samp: false,
      dialog_taskEdit: false,
      dialog_summaryTask: false,
      activeName: "1",
      disabledBathDen: true,
      flags: [],
      areas: [],
      peoples: [],
      storePoints: [],
      tableDataTask: [],
      currentPageTask: 1,
      pagesizeTask: this.$constants.numberPerpage,
      totalTask: 0,
      planFormTask: {
        link: "3",
        taskNo: "",
        grainBreed: "",
        flag: "",
        drop: "",
        assigned: "",
        areaSelected: "",
        people: "",
        storePoint: ""
      },
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
      qasPlanId: 0,
      selectedTasks: [],
      samplingTaskId: 0,
      maxHeight: "350px"
    };
  },
  components: {
    sampler: sampler,
    checker: checker,
    taskEdit: taskEdit,
    createMarketTask: createMarketTask,
    summaryTask
  },
  methods: {
    init() {
      //获取完成状态
      this.$Api.getOverFlag().then(data => {
        this.flags = data;
      });
      this.findTaskSearchParam();
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
          vm.tableDataTask = data.rows ? data.rows : [];
          vm.tableDataTask.map(function(arg) {
            arg.deadlineDtStr = vm.$dateUtl.getTime(arg.deadlineDt);
          });
        },
        param: param,
        rej: resp => {
          console.log(resp);
        }
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
      const $this = this;
      //弹窗
      let param = {
        content: content,
        url: url,
        sucessText: successText,
        errorText: "操作失败",
        cancelText: "已取消操作",
        qasTaskVoList: paramValue.params
      };

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
              $this.$message({
                type: showtype,
                message: message
              });
              if (data.success) {
                //变为第一页
                $this.currentPageTask = 1;
                $this.findTaskSearchParam();
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
    saveTask() {
      this.$refs.createMarketTask.$refs["pointTaskTableForm"].validate(
        valid => {
          if (!valid) {
            let scrollWidth = this.$refs.createMarketTask.$refs.pointTaskTable
              .bodyWrapper.scrollWidth;
            this.$refs.createMarketTask.$refs.pointTaskTable.bodyWrapper.scrollLeft = scrollWidth;
            return false;
          }
          //获取任务数据
          let regionParam = this.$refs.createMarketTask.pointTask;
          //this.tableDataTask = regionParam; 测试使用
          if (!regionParam || regionParam.length <= 0) {
            this.$message({
              type: "error",
              message: "当前未创建任何新任务,请先创建任务"
            });
            return false;
          }
          //判断是否指定了扦样人/单位、质检单位
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
              message: "请设置 扦样单位(人) 和 质检单位"
            });
            return false;
          }
          //调用保存接口
          const $this = this;
          this.$post({
            url: "/_data/task/samplingTask/saveTasks",
            param: {
              qasLink: "3",
              qasPlanId: this.qasPlanId,
              taskVoList: regionParam
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
                $this.currentPageTask = 1;
                $this.findTaskSearchParam();
                $this.dialog_Layout = false;
              }
            }
          });
        }
      );
    },
    selectionRowsChange(val) {
      this.disabledBathDen = val.length > 0 ? false : true;
      this.selectedTasks = [];
      val.forEach(item => {
        //用item操作每一条数据。
        this.selectedTasks.push({ qasSamplingTaskId: item.qasSamplingTaskId });
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

      const $this = this;
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
          $this.$message({
            type: showtype,
            message: message
          });
          if (data.success) {
            //变为第一页
            $this.currentPageTask = 1;
            $this.get_sampleBY($this);
            if ($this.qasPlanId > 0) {
              //是编辑操作  则要获取列表数据
              $this.doSearchTask();
            }
            $this.dialog_samp = false;
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
            this.currentPageTask = 1;
            this.doSearchTask();
            this.dialog_checker = false;
          }
        }
      });
    },
    closeTaskEdit(obj) {
      if (obj === "success") {
        this.findTaskSearchParam();
      }
      this.samplingTaskId = 0;
      this.dialog_taskEdit = false;
    },
    findTaskSearchParam() {
      const $this = this;
      this.get_sampleBY($this);
      this.get_sampleArea($this);
      if (this.qasPlanId > 0) {
        //是编辑操作  则要获取列表数据
        this.doSearchTask();
      }
    },
    //获取扦样地区
    get_sampleArea(vm) {
      //获取扦样地区
      this.$Api.getSampleArea({ qasPlanId: this.qasPlanId }).then(data => {
        vm.areas = data && data[0] ? data[0].children : [];
      });
    },
    //获取扦样人
    get_sampleBY(vm) {
      this.$Api.getSampler({ qasPlanId: this.qasPlanId }).then(data => {
        vm.peoples = data;
      });
    },
    addTask() {
      this.$data.dialog_Layout = true;
      //let breeds = ['合计'];
      //this.$refs.createMarketTask.$data.planGrainBreedTypes = breeds;
    },
    taskSummaryOutput() {
      //debugger;
      this.$refs.taskSummary.outputToExcel();
    }
  },
  watch: {
    selectedQasPlanId: {
      handler(newVal) {
        this.qasPlanId = newVal;
      },
      immediate: true
    },
    disabledParam: {
      handler(val) {
        if (val) {
          this.maxHeight = "380px";
        }
      },
      immediate: true
    }
  },
  props: {
    selectedQasPlanId: {
      type: Number,
      default: 0
    },
    disabledParam: {
      type: Boolean,
      default: false
    }
  }
};
</script>
