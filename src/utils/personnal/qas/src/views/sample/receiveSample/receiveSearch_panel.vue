<template>
  <div>
    <div style="width: 100%;padding: 10px">
      <div style="width: 100%;">
        <label class="search_label">收样方式:</label>
        <el-radio-group v-model="radio" @change="receiveSampleChange">
          <el-radio label="1">输入样品编号收样</el-radio>
          <el-radio label="2">查询列表收样</el-radio>
        </el-radio-group>
      </div>
      <div style="width: 100%;margin-top: 10px" v-if="radio == '1'">
        <el-input
          v-model="search.sampleCode"
          placeholder="请输入样品编号"
          style="width: 500px"
        ></el-input>
        <el-button type="primary" class="search_btn" @click="do_search()">
          查询
        </el-button>
      </div>
    </div>

    <!-- 样品信息弹框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="确认收样"
      :visible.sync="dialog_show"
      v-if="dialog_show"
      :top="mg_top"
      :width="dialogWith"
      :append-to-body="true"
    >
      <receiveSampleDetail
        ref="receiveSampleDetail"
        :sampleDataObject="sampleObject"
        @successfulReceive="successfulReceive"
        @closeReceive="closeReceive"
      ></receiveSampleDetail>
    </el-dialog>
  </div>
</template>

<script>
import receiveSampleDetail from "./receiveSampleDetail";
export default {
  name: "receiveSearch_panel",
  data() {
    return {
      radio: "1",
      sampleObjectrules: {
        testCode: { required: true, message: "不得为空", trigger: "change" }
      },
      activeName: "1", //默认激活面板
      //查询面板数据模型
      search: {
        sampleCode: "" //样品编码
      },
      sampleObject: {
        qasSampleId: 0
      },
      mg_top: "4%",
      dialogWith: "60%",
      dialog_show: false
    };
  },
  components: {
    receiveSampleDetail: receiveSampleDetail
  },
  methods: {
    //面板初始化
    init() {
      const vm = this;
      this.initCommonMethod(vm);
    },
    initCommonMethod() {},
    //查询按钮点击事件
    do_search() {
      if (!this.search.sampleCode) {
        return false;
      }
      const $this = this;
      //查找数据 没找到提示:未找到指定样品！  找到信息则弹出信息框
      this.$get({
        url: "/_data/sample/sample/findSampleBySampleCode",
        fnc: data => {
          if (!data.success || !data.data || !data.data.qasSampleId) {
            this.$message({
              type: "error",
              message: "未找到指定样品,请输入有效的样品编号！"
            });
            return false;
          }
          let sampleObject = data.data;
          $this.$set(
            sampleObject,
            "receiveDt",
            $this.$dateUtl.getTime(sampleObject.receiveDt)
          );
          $this.sampleObject = sampleObject;
          //弹出信息框
          $this.dialog_show = true;
        },
        param: { sampleCode: this.search.sampleCode }
      });
    },
    //切换收样方式
    receiveSampleChange(val) {
      //点击查询列表收样
      this.$emit("changeDataGrid", val);
    },
    successfulReceive(obj) {
      if ("Y" != obj) {
        return false;
      }
      this.dialog_show = false;
      this.$emit(this.$constants.EMIT_TRANSFRELOADDATA, "Y");
    },
    closeReceive(obj) {
      if ("Y" != obj) {
        return false;
      }
      this.dialog_show = false;
    }
  },
  created() {
    this.init();
  }
};
</script>
<style type="text/css">
.el-input__inner {
  color: #000 !important;
}
</style>
