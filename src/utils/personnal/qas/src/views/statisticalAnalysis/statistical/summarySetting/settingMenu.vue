<!-- 统计设计的目录 -->
<template>
  <div>
    <el-tree
      :data="menuDataSource"
      :props="defaultProps"
      node-key="id"
      default-expand-all
      :current-node-key="defaultCheckedKey"
      @node-click="handleNodeClick"
      :highlight-current="true"
      ref="menuTree"
      class="treeClass pt15 pd15"
    >
      <span class="span-ellipsis" slot-scope="{ node, data }">
        <span :title="node.label">{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "searchMenu",
  data() {
    return {
      menuDataSource: [], //目录
      selectedMenuId: "", //选中的菜单id
      defaultProps: {
        children: "children",
        label: "text"
      },
      selectedLink: "",
      defaultCheckedKey: ""
    };
  },
  methods: {
    //获取目录
    getMenu() {
      let param_id = this.$route.params.id;
      if (!param_id) {
        return false;
      }
      let busintypeId;
      if (this.$constants.ROUTEID_SAMPLEREAP == param_id) {
        busintypeId = this.$constants.QAS_PLAN_REAP_STATISTICAL_CATALOG;
        this.selectedLink = this.$constants.LINK_REAP;
      } else if (this.$constants.ROUTEID_SAMPLESTOCK == param_id) {
        //库存承储
        busintypeId = this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG;
        this.selectedLink = this.$constants.LINK_STOCK;
      } else if (this.$constants.ROUTEID_SAMPLEMARKET == param_id) {
        //供销粮食
        busintypeId = this.$constants.QAS_PLAN_MARKET_STATISTICAL_CATALOG;
        this.selectedLink = this.$constants.LINK_MARKET;
      }
      const $this = this;
      this.$Api.getDicDataTree({ busintypeid: busintypeId }).then(xhr => {
        let menuTee = xhr[0].children;
        //去除不需要显示的节点
        if ($this.menuType) {
          menuTee = $this.setNode(menuTee);
        }
        $this.menuDataSource = menuTee;
        $this.defaultCheckedKey = $this.menuDataSource[0].children[0].id;
        $this.handleNodeClick({ id: $this.defaultCheckedKey });
        this.$nextTick(function() {
          this.$refs.menuTree.setCurrentKey(
            $this.menuDataSource[0].children[0].id
          );
        });
      });
    },
    handleNodeClick(data) {
      let returnData = {
        selectedLink: this.selectedLink,
        menuid: data.id
      };
      this.$emit("returnData", returnData);
    },
    setNode(nodes) {
      if (!nodes || nodes.length == 0) {
        return nodes;
      }
      let newNods = [];
      for (let index in nodes) {
        let obj = nodes[index];
        let childrenArray = [];
        for (let i in obj.children) {
          let childrenObj = obj.children[i];
          let id = childrenObj.id;
          if (
            this.$constants.QAS_PLAN_MARKET_STATISTICAL_CATALOG_8 == id ||
            this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG_9 == id ||
            this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG_10 == id
          ) {
            continue;
          }
          childrenArray.push(childrenObj);
        }
        obj.children = childrenArray;
        newNods.push(obj);
      }
      return newNods;
    }
  },
  created() {
    this.getMenu();
  },
  props: {
    menuType: {
      type: String,
      default: ""
    }
  }
};
</script>
