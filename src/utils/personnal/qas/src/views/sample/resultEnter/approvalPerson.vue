<template>
  <div>
    <el-form
      ref="approvalForm"
      :model="dataSourceForm"
      label-width="110px"
      :inline="true"
      :rules="rules"
    >
      <el-form-item label="指定审批人员:" prop="auditByName">
        <el-input
          placeholder="指定审批人员"
          v-model="dataSourceForm.auditByName"
          class="dialog_input"
          readonly
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="approvalShow"
          ></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <el-dialog
      :close-on-click-modal="false"
      title="指定审批人员"
      :visible.sync="dialog_approvalShow"
      v-if="dialog_approvalShow"
      :top="$constants.dialog_margin_top"
      width="70%"
      :append-to-body="true"
    >
      <el-form label-width="80px" :inline="true">
        <el-form-item label="账号名 :">
          <el-input v-model="user_name" placeholder="账号名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toSearchUser">查询</el-button>
        </el-form-item>
        <div class="tool-bar-float-right">
          <el-button
            type="primary"
            @click="doSlectedAction"
            :disabled="btnShow"
          >
            确认勾选
          </el-button>
        </div>
      </el-form>
      <el-table
        :data="tableData_user"
        style="width: 100%"
        class="sampler_table"
        :border="true"
        @selection-change="orgPersonSelectionChange"
        max-height="400px"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="userid" label="账号名"> </el-table-column>
        <el-table-column prop="operatorname" label="姓名"> </el-table-column>
        <el-table-column prop="mobileno" label="手机号"> </el-table-column>
        <el-table-column prop="oemail" label="邮箱"> </el-table-column>
        <el-table-column prop="dutyname" label="职位"> </el-table-column>
      </el-table>

      <pagination
        :paginationSettings="paginationSettings"
        @handlePaginationPagenumber="pointHandlePaginationPagenumber"
        @handlePaginationPagesize="pointHandleSizeChange"
      >
      </pagination>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "approvalPerson",
  data() {
    return {
      rules: {
        auditByName: {
          required: true,
          message: "请指定审批人员",
          trigger: "change"
        }
      },
      user_name: "",
      btnShow: true,
      dataSourceForm: {
        auditBy: "",
        auditByName: ""
      },
      dialog_approvalShow: false,
      tableData_user: [],

      paginationSettings: {
        currentPage: 1,
        pageSize: 10,
        layout: "total,sizes, prev, pager, next, jumper",
        totalNumbers: 0,
        pageSizeChangeList: ["10", "20", "30"]
      }
    };
  },
  methods: {
    approvalShow() {
      this.dialog_approvalShow = true;
      this.user_name = "";
      this.paginationSettings.pageSize = 10;
      this.paginationSettings.currentPage = 1;
      this.toSearchUser();
    },
    doSlectedAction() {
      let selectedData = this.selectedArray ? this.selectedArray[0] : null;
      this.dataSourceForm.auditByName = selectedData
        ? selectedData.operatorname
        : "";
      this.dataSourceForm.auditBy = selectedData ? selectedData.operatorid : "";
      this.dialog_approvalShow = false;
    },
    toSearchUser() {
      const $this = this;
      this.doSearchUser($this);
    },
    doSearchUser(vm) {
      //_data/base/orgemployee/page?orgid=11
      let userinfo = this.$store.getters.get_userInfo;
      if (!userinfo || !userinfo.orgId) {
        return false;
      }
      vm.$get({
        url: "/_data/base/orgemployee/orgEmps",
        fnc: data => {
          vm.tableData_user = data.rows;
          vm.paginationSettings.totalNumbers = data.total;
        },
        param: {
          orgid: userinfo && userinfo.orgId ? userinfo.orgId : "",
          //orgid: "11",
          userid: vm.user_name,
          page: vm.paginationSettings.currentPage,
          rows: vm.paginationSettings.pageSize
        }
      });
    },
    pointHandlePaginationPagenumber(num) {
      this.paginationSettings.currentPage = num;
      this.doSearch();
    },
    pointHandleSizeChange(num) {
      this.paginationSettings.pageSize = num;
      this.toSearchUser();
    },
    orgPersonSelectionChange(val) {
      this.selectedArray = val;
      this.btnShow = val.length == 1 ? false : true;
    }
  }
};
</script>

<style scoped></style>
