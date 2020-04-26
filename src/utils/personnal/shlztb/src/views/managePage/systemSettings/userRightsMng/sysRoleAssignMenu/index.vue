<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <el-link
          type="primary"
          class="backToPrew mb20"
          @click="$router.push('sysRoleMng')"
        >
          <i class="el-icon-arrow-left"></i>
          返回系统角色管理页面
        </el-link>
      </el-col>
      <el-col :span="24">
        <div class="table-container clearfix">
          <commonTitleWithBorder :title="titles.tableTitle" />
          <el-col :span="12">
            <div class="organization-tree-container">
              <tree
                ref="tree"
                :treeSettings="treeSettings"
                @handleGetCheckedKeys="handleGetCheckedKeys"
              />
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import tree from "@/components/tree";
import commonTitleWithBorder from "@/components/commonTitleWithBorder";

export default {
  name: "sysMenuMng",
  components: {
    tree,
    commonTitleWithBorder
  },
  data() {
    return {
      /**
       * titles 标题管理
       */
      titles: {
        tableTitle: "系统角色分配菜单树"
      },
      treeSettings: {
        treeData: [],
        checkedTreeData: [],
        defaultProps: {
          children: "children",
          label: "text"
        },
        treeWithCheckbox: true,
        treeButtons: [
          { key: "getCheckedKeys", text: "分配菜单权限" },
          { key: "resetChecked", text: "清除已选菜单" }
        ]
      },
      mainRoleId: this.$route.query.roleid,
      checkedlist: []
    };
  },
  methods: {
    /* 获取所有选中的树节点回调 */
    handleGetCheckedKeys(data) {
      let that = this,
        formData = new FormData();
      formData.append("roleid", this.mainRoleId);
      if (data && data.length > 0)
        data.map(opeId => {
          formData.append("menus", opeId);
        });
      that.$http(that.$api.assignMenuOfRole("true"), formData).then(data => {
        if (data.code == "0") {
          that.$message.success("操作成功！");
          that.tradeInformationList();
        }
      });
    },
    /* 获取列表数据信息 */
    tradeInformationList() {
      let that = this,
        postdata = {
          roleid: that.mainRoleId
        };
      that.$getData("getAllMenuTree", postdata).then(data => {
        that.treeSettings.treeData = data;
        that.getDataList();
      });
    },
    getDataList() {
      let that = this,
        postdata = {
          roleid: that.mainRoleId
        };
      that.$getData("getAllCheckedMenuTree", postdata).then(data => {
        that.checkedlist = [];
        if (data.length > 0) {
          that.dealdata(data);
        }
        that.$refs.tree.setCheckedKeys(that.checkedlist);
      });
    },
    dealdata(data) {
      data.map(item => {
        if (item.checked) {
          this.checkedlist.push(item.id);
        }
        if (item.children) {
          this.dealdata(item.children);
        }
      });
    }
  },
  mounted() {
    this.tradeInformationList();
  }
};
</script>
