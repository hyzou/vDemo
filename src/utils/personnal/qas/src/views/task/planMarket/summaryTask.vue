<template>
  <div>
    <div class="tool-bar bgfff">
      <el-button type="primary" @click="refleshTable">刷新</el-button>
    </div>
    <el-table
      tooltip-effect="dark"
      :data="taskLists"
      style="width: 100%"
      max-height="400px"
      stripe
      @selection-change="selectionRowsChange"
    >
      <!-- <el-table-column
        type="selection"
        width="55"
        :selectable="handleDisable"
      ></el-table-column>-->
      <el-table-column prop="city__dsp" label="市"></el-table-column>
      <el-table-column
        prop="targetType__dsp"
        label="监测对象"
      ></el-table-column>
      <el-table-column
        prop="sampling__dsp"
        label="扦样机构(人)"
      ></el-table-column>
      <el-table-column prop="qaOrgName" label="质检机构"></el-table-column>
      <el-table-column prop="district__dsp" label="地区"></el-table-column>
      <el-table-column label="抽样批次">
        <el-table-column
          v-for="(breed, index) in grainBreedTypes"
          :key="breed.id"
          :label="breed.name"
          width="150"
          ><template slot-scope="scope">{{
            scope.row.breedNumList[index].value
          }}</template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!-- <div>
      <i class="header-icon el-icon-info"></i>
      <small style="color: #999999">共{{ taskLists.length }}条记录</small>
      <small>
        已选择
        <small style="color: #0091FF">
          {{ selectedRows.length }}
        </small>
        条</small
      >
    </div>-->
  </div>
</template>

<script>
export default {
  name: "summaryTask",
  data() {
    return {
      taskLists: [], //源数据
      grainBreedTypes: [],
      exportRef: "",
      exportTabId: "",
      exportFileOpts: {
        bookType: "xlsx",
        bookSST: true,
        type: "binary",
        cellStyles: true
      }, // 导出文件默认参数
      selectedRows: [] // 当前选中的行数据
    };
  },
  props: {
    planId: {
      // 计划id
      required: true
    }
  },
  methods: {
    selectionRowsChange(val) {
      this.selectedRows = val;
    },
    setTaskInfosByPlanId(planId) {
      if (planId) {
        this.$get({
          url: "/_data/task/samplingTask/summaryTasks/market",
          fnc: data => {
            let types = [];
            if (data.success && data.data) {
              this.taskLists = data.data;
              if (data.data.length > 0) {
                let temp = data.data[0];
                let breeds = temp.hasOwnProperty("breedNumList")
                  ? temp.breedNumList
                  : [];
                if (breeds) {
                  for (let i in breeds) {
                    let breed = breeds[i];
                    types.push({ id: breed.id, name: breed.name });
                  }
                }
              }
            }
            this.grainBreedTypes = types;
          },
          param: { qasPlanId: this.planId }
        });
      }
    },
    refleshTable() {
      this.setTaskInfosByPlanId(this.planId);
    },
    outputToExcel() {
      let selects = this.selectedRows;
      if (selects.length <= 0) {
        this.$message({
          type: "warn",
          message: "请选择需要导出的数据"
        });
        return;
      }
      let taskIds = [];
      for (let i in selects) {
        let temp = selects[i].taskIds;
        if (temp && temp.length > 0) {
          taskIds.push(temp);
        }
      }
      if (!this.planId) {
        this.$message({
          type: "error",
          message: "未指定计划"
        });
      }

      // 后端导出
      let baseUrl =
        this.$constants.baseURL +
        "/_data/task/samplingTask/taskSummaryExcel/market";
      let param = { qasPlanId: this.planId, taskIds: taskIds.join(",") };
      this.outputExcelNew(baseUrl, param); //(可判断是否有数据)
    },
    outputExcelNew(url, param) {
      // 后端导出excel文件
      this.$get({
        url: url,
        method: "get",
        responseType: "arraybuffer", // 服务器返回的数据类型
        param: param,
        fnc: content => {
          if (content && content.byteLength > 0) {
            const blob = new Blob([content], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.shee"
            }); // 构造一个blob对象来处理数据
            const fileName = "扦样任务汇总表.xlsx"; // 导出文件名
            // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
            // IE10以上支持blob但是依然不支持download
            if ("download" in document.createElement("a")) {
              // 支持a标签download的浏览器
              const link = document.createElement("a"); // 创建a标签
              link.download = fileName; // a标签添加属性
              link.target = "_blank";
              link.style.display = "none";
              link.href = URL.createObjectURL(blob);
              document.body.appendChild(link);
              link.click(); // 执行下载
              URL.revokeObjectURL(link.href); // 释放url
              document.body.removeChild(link); // 释放标签
            } else {
              // 其他浏览器
              navigator.msSaveBlob(blob, fileName);
            }
          } else {
            this.$message({
              type: "error",
              message: "导出失败,未获取到文件数据"
            });
          }
        },
        rej: resp => {
          //let enc = new TextDecoder("utf-8");
          //let res = JSON.parse(enc.decode(new Uint8Array(resp))); //转化成json对象
          console.log("获取文件出错" + resp);
        }
      });
    } /*,
    handleDisable(row) {
      if (row.taskIds && row.taskIds.length > 0) {
        return true;
      }
      return false;
    }*/
  },
  watch: {
    planId: {
      handler(newValue) {
        this.setTaskInfosByPlanId(newValue);
      },
      immediate: true
    }
  },
  created() {
    this.exportTabId =
      "_" +
      Number(
        Math.random()
          .toString()
          .substr(3, length) + Date.now()
      ).toString(35);
  }
};
</script>

<style scoped></style>
