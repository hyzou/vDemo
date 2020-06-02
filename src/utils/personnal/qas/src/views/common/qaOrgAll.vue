<template>
  <el-tabs v-model="activeName" type="card" class="dialog_sampler_container">
    <el-tab-pane label="质检单位" name="first">
      <el-form label-width="80px" :inline="true">
        <el-form-item label="机构名称 :">
          <el-input v-model="org_name" placeholder="机构名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doQaOrgSearch">查询</el-button>
        </el-form-item>
        <div class="tool-bar-float-right">
          <el-button
            type="primary"
            @click="doCheckerTabsAction"
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
        @selection-change="qaOrgSelectionChange"
        max-height="400px"
        :border="true"
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
                scope.row.orgtypeid == $constants.ORGTYPE_ID005 ? 'success' : ''
              "
              disable-transitions
            >
              {{
                scope.row.orgtypeid == $constants.ORGTYPE_ID005
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
import tiny_page from "./tiny_page";
export default {
  name: "qaOrgAll",
  data() {
    return {
      activeName: "first",
      org_name: "",
      tableData_org: [],
      currentPage: 1,
      pageSize: this.$constants.numberPerpage,
      total: 0,
      selectedNum: 0,
      btnShow: true,
      selectedArray: []
    };
  },
  components: {
    tinyPage: tiny_page
  },
  methods: {
    doCheckerTabsAction() {
      let selectedData = this.selectedArray ? this.selectedArray[0] : null;
      let param = {
        qaOrgName: selectedData ? selectedData.orgname : "",
        qaOrgId: selectedData ? selectedData.orgid : ""
      };
      this.$emit("selectQaOrg", param);
    },
    doQaOrgSearch() {
      let param = {
        orgtypeid: this.$constants.ORGTYPE_ID005,
        page: this.currentPage,
        rows: this.pageSize
      };
      //获取下级单位的数据
      this.$get({
        url: "/_data/base/org/page",
        fnc: data => {
          this.tableData_org = data.rows;
          this.total = data.total;
        },
        param: param
      });
    },
    qaOrgSelectionChange(val) {
      this.selectedNum = val.length;
      this.btnShow = val.length === 1 ? false : true;
      this.selectedArray = val;
    },
    getTransfTinyPagParam(obj) {
      this.currentPage = obj.currentPageNum;
      this.pageSize = obj.pageSizeNum;
      this.doQaOrgSearch();
    }
  },
  created() {
    //获取质检单位
    this.doQaOrgSearch();
  }
};
</script>

<style scoped></style>
