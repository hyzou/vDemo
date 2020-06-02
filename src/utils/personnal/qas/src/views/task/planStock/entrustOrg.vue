<template>
  <el-tabs v-model="activeName" type="card" class="dialog_sampler_container">
    <el-tab-pane label="下级单位" name="first">
      <el-form label-width="80px" :inline="true">
        <el-form-item label="机构名称 :">
          <el-input v-model="org_name" placeholder="机构名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toSearchOrg()">查询</el-button>
        </el-form-item>
        <div class="tool-bar-float-right">
          <el-button
            type="primary"
            @click="doSamplerTabsAction"
            :disabled="btnShow"
          >
            确认勾选
          </el-button>
        </div>
      </el-form>
      <el-table
        :data="tableData_org"
        style="width: 100%"
        class="sampler_table"
        :border="true"
        @selection-change="sampleOrgSelectionChange"
        max-height="400px"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="orgname" label="机构名"> </el-table-column>
        <el-table-column prop="linkman" label="联系人"> </el-table-column>
        <el-table-column prop="linkmantel" label="联系电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column label="机构类型">
          <template slot-scope="scope">
            <el-tag
              :type="
                scope.row.orgtypeid == $constants.ORGTYPE_ID001
                  ? 'primary'
                  : scope.row.orgtypeid == $constants.ORGTYPE_ID005
                  ? 'success'
                  : ''
              "
              disable-transitions
            >
              {{
                scope.row.orgtypeid == $constants.ORGTYPE_ID001
                  ? $constants.ORGTYPE_NAME001
                  : scope.row.orgtypeid == $constants.ORGTYPE_ID005
                  ? $constants.ORGTYPE_NAME005
                  : ""
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orgaddress" label="机构地址"> </el-table-column>
      </el-table>
      <tinyPage
        @transfTinyPagParam="getTransfTinyPagParam"
        :total="total"
        :selectedNum="selectedNum"
      ></tinyPage>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import tiny_page from "../../common/tiny_page";

export default {
  data() {
    return {
      activeName: "first",
      org_name: "",
      user_name: "",
      tableData_org: [],
      tableData_user: [],
      currentPage: 1,
      pageSize: this.$constants.numberPerpage,
      total: 0,
      selectedNum: 0,
      btnShow: true,
      selectedArray: []
    };
  },
  methods: {
    samplerTabsAction() {
      const $this = this;
      this.doSearchOrg($this);
    },
    doSamplerTabsAction() {
      let selectedData = this.selectedArray ? this.selectedArray[0] : null;
      //选中下级单位
      let param = {
        entrustOrgName:
          selectedData && selectedData.orgname ? selectedData.orgname : ""
      };
      this.$emit(this.$constants.EMIT_TRANSFENTRUSTORG, param);
    },
    toSearchOrg() {
      const $this = this;
      this.doSearchOrg($this);
    },
    doSearchOrg(vm) {
      let userinfo = this.$store.getters.get_userInfo;
      //获取下级单位的数据
      vm.$get({
        url:
          "/_data/base/org/pageByTypes?types=" +
          this.$constants.ORGTYPE_ID001 +
          "&types=" +
          this.$constants.ORGTYPE_ID005 +
          "&orgid=" +
          (userinfo && userinfo.orgId ? userinfo.orgId : "") +
          "&orgname=" +
          vm.org_name +
          "&page=" +
          vm.currentPage +
          "&rows=" +
          vm.pageSize,
        fnc: data => {
          vm.tableData_org = data.rows;
          vm.total = data.total;
        }
      });
    },
    sampleOrgSelectionChange(val) {
      this.selectedNum = val.length;
      this.btnShow = val.length === 1 ? false : true;
      this.selectedArray = val;
    },
    getTransfTinyPagParam(obj) {
      this.currentPage = obj.currentPageNum;
      this.pageSize = obj.pageSizeNum;
      const $this = this;
      this.doSearchOrg($this);
    }
  },
  components: {
    tinyPage: tiny_page
  },
  created() {
    this.samplerTabsAction();
  }
};
</script>
