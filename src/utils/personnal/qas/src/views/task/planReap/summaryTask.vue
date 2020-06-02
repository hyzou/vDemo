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
      :border="true"
      stripe
      @selection-change="selectionRowsChange"
    >
      <!--<el-table-column type="selection" width="55"></el-table-column>-->
      <!-- <el-table-column
          prop="code"
          label="序号"
          width="150"
        ></el-table-column>-->
      <el-table-column prop="taskContent" label="任务内容"></el-table-column>
      <el-table-column prop="province__dsp" label="省"></el-table-column>
      <el-table-column prop="city__dsp" label="市"></el-table-column>
      <el-table-column prop="area__dsp" label="区"></el-table-column>
      <el-table-column prop="town" label="乡镇"></el-table-column>
      <el-table-column prop="townCount" label="乡镇个数"></el-table-column>
      <el-table-column prop="sampleCount" label="样品个数"></el-table-column>
    </el-table>
    <!--<div style="display: none;">
      <el-table
        :id="exportTabId"
        tooltip-effect="dark"
        :data="selectedRows"
        style="width: 100%"
        max-height="400px"
        stripe
      >
        <el-table-column prop="taskContent" label="任务内容"></el-table-column>
        <el-table-column prop="province__dsp" label="省"></el-table-column>
        <el-table-column prop="city__dsp" label="市"></el-table-column>
        <el-table-column prop="area__dsp" label="区"></el-table-column>
        <el-table-column prop="town" label="乡镇"></el-table-column>
        <el-table-column prop="townCount" label="乡镇个数"></el-table-column>
        <el-table-column prop="sampleCount" label="样品个数"></el-table-column>
      </el-table>
    </div>-->
    <!--   <div>
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
          url: "/_data/task/samplingTask/summaryTasks/reap",
          fnc: data => {
            if (data.success && data.data) {
              this.taskLists = data.data;
            }
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
        return false;
      }
      if (!this.planId) {
        this.$message({
          type: "error",
          message: "未指定计划"
        });
        return false;
      }
      let taskIds = [];
      for (let i in selects) {
        let temp = selects[i].taskIds;
        if (temp && temp.length > 0) {
          taskIds.push(temp);
        }
      }

      //this.outputToExcelNoStyle(); // 纯前端导出
      // 后端导出
      let baseUrl =
        this.$constants.baseURL +
        "/_data/task/samplingTask/taskSummaryExcel/reap";
      let param = { qasPlanId: this.planId, taskIds: taskIds.join(",") };
      this.outputExcelNew(baseUrl, param); //(可判断是否有数据)
      //this.outputExcelByChore({taskIds:taskIds}); //直接通过标签下载
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
    }
    /*outputExcelByChore({taskIds}) {
      let url =
        this.$constants.baseURL +
        "/_data/task/samplingTask/taskSummaryExcel/reap?qasPlanId=" +
        this.planId +
        "&taskIds=" +
        taskIds.join(",");
      const link = document.createElement("a");
      link.target = "_blank";
      link.style.display = "none";
      link.href = url;
      document.body.appendChild(link);
      link.click(); // 执行下载
      document.body.removeChild(link); // 释放标签
    }*/
    /*outputToExcelNoStyle() { // 前端导出excle文件
      let xlsxParam = { raw: true }; // 导出的内容只做解析，不进行格式转换
      let wb = XLSX.utils.table_to_book(
        document.querySelector("#" + this.exportTabId),
        xlsxParam
      );

      /!* get binary string as output *!/
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "任务汇总.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e, wbout);
        }
      }
      //return wbout;
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
