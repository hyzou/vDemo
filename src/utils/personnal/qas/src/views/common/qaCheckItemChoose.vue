<template>
  <div>
    <div class="tool-bar bgfff">
      <div class="text-danger floatLeft" v-show="showWarn">请选择检验指标</div>
      <div class="floatRight">
        <el-button
          type="primary"
          class="s-tool-btn"
          :disabled="disabledBtn"
          @click="selectSure"
        >
          确认勾选
        </el-button>
      </div>
    </div>
    <div class="mt45">
      <el-cascader-panel
        :options="tableListSettings.tableDatas"
        :props="{
          expandTrigger: 'click',
          label: 'text',
          value: 'id',
          multiple: true
        }"
        ref="tree"
        v-bind:class="{ borderRed: showWarn }"
      ></el-cascader-panel>
    </div>
  </div>
</template>

<script>
export default {
  name: "qaCheckItemChoose",
  data() {
    return {
      //activeName: "1",
      qasPlanSampleRequestId: 0,
      expandedKeys: [],
      // filterText: "",
      disabledBtn: false,
      // selectedCheckItemRow: [],

      tableListSettings: {
        tableDatas: []
      },
      showWarn: false
    };
  },
  methods: {
    do_search() {
      const $this = this;
      this.$get({
        url: "/_data/base/item/tree",
        fnc: data => {
          $this.tableListSettings.tableDatas = data[0].children;
          for (let index in data[0].children) {
            let childrenData = data[0].children[index];
            $this.expandedKeys.push(childrenData.id);
          }
        }
      });
    },
    selectSure() {
      let selectedCheckItemRow = this.$refs.tree.getCheckedNodes(true);
      if (!selectedCheckItemRow || selectedCheckItemRow.length == 0) {
        this.showWarn = true;
        return false;
      }
      let setCheckedItem = [];
      for (let index in selectedCheckItemRow) {
        let obj = selectedCheckItemRow[index];
        setCheckedItem.push({
          qasBasItemId: obj.data.id,
          code: obj.data.code,
          name: obj.data.text,
          munit: obj.data.munit,
          qasPlanSampleRequestId: this.qasPlanSampleRequestId
        });
      }
      const $this = this;
      this.$post({
        url: "/_data/task/planQaItem/insertItems",
        param: setCheckedItem,
        fnc: data => {
          if (!data || !data.success) {
            $this.$message({
              type: "error",
              message: "操作失败"
            });
            return false;
          }
          //插入成功通知父页面刷新列表
          $this.$emit("reloadCheckItem", "Y");
        }
      });
    }
  },
  props: {
    selectedQasPlanSampleRequestId: {
      type: String
    }
  },
  watch: {
    selectedQasPlanSampleRequestId: {
      handler(val) {
        this.qasPlanSampleRequestId = val;
        this.do_search();
      },
      immediate: true
    }
  }
};
</script>
<style>
.el-cascader-menu__wrap {
  height: 300px;
}
</style>
