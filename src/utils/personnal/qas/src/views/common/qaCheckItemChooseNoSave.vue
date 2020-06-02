<template>
  <div>
    <div class="tool-bar bgfff">
      <div style="color: red;float: left" v-show="showWarn">请选择检验指标</div>
      <div style="float: right">
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
    <div style="margin-top: 45px">
      <!--    <el-tree
        :data="tableListSettings.tableDatas"
        :props="{ children: 'children', label: 'text' }"
        show-checkbox
        node-key="id"
        :default-expanded-keys="expandedKeys"
        :filter-node-method="filterNode"
        :highlight-current="true"
        ref="tree2"
        class="maxHeight400"
      >
      </el-tree>-->

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
      showWarn: false,
      expandedKeys: [],
      disabledBtn: false,
      selectedCheckItemRow: [],

      tableListSettings: {
        tableDatas: []
      },
      checkedItems: []
    };
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    },
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
        let dicList = !obj.data.dicList ? [] : JSON.parse(obj.data.dicList);
        setCheckedItem.push({
          qasBasItemId: obj.data.id,
          code: obj.data.code,
          name: obj.data.text,
          munit: obj.data.munit,
          dataType: obj.data.dataType,
          dicList: dicList
        });
      }
      this.$emit("reloadCheckItem", setCheckedItem);
    }
  },
  mounted() {
    this.do_search();
  }
};
</script>
<style>
.el-cascader-menu__wrap {
  height: 300px;
}
</style>
