<template>
  <el-tabs
    v-model="activeName"
    type="card"
    @tab-click="samplerTabsAction"
    class="dialog_sampler_container"
  >
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
            >确认勾选</el-button
          >
        </div>
      </el-form>
      <el-table
        :data="tableData_org"
        style="width: 100%"
        class="sampler_table"
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
    <el-tab-pane label="本单位人员" name="second">
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
            @click="doSamplerTabsAction"
            :disabled="btnShow"
            >确认勾选</el-button
          >
        </div>
      </el-form>
      <el-table
        :data="tableData_user"
        style="width: 100%"
        class="sampler_table"
        @selection-change="sampleOrgSelectionChange"
        max-height="400px"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="userid" label="账号名"> </el-table-column>
        <el-table-column prop="operatorname" label="姓名"> </el-table-column>
        <el-table-column prop="mobileno" label="手机号"> </el-table-column>
        <el-table-column prop="oemail" label="邮箱"> </el-table-column>
        <el-table-column prop="dutyname" label="职位"> </el-table-column>
      </el-table>
      <tinyPage
        @transfTinyPagParam="getTransfTinyPagParam"
        :total="total"
        :selectedNum="selectedNum"
      ></tinyPage>
      <!--<div class="tool-bar">
        <el-button type="primary" @click="doSamplerTabsAction" :disabled="btnShow">确认勾选</el-button>
      </div>-->
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import tiny_page from "./tiny_page";

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
      this.currentPage = 1;
      this.pageSize = 10;
      this.total = 0;
      this.selectedNum = 0;
      this.btnShow = true;
      this.selectedArray = [];
      const $this = this;
      if (this.activeName === "first") {
        //下级单位
        this.doSearchOrg($this);
      } else {
        //本级单位人员
        //获取本级单位人员数据
        this.doSearchUser($this);
      }
    },
    doSamplerTabsAction() {
      let param = {
        activeName: this.activeName
      };
      let selectedData = this.selectedArray ? this.selectedArray[0] : null;
      //选中下级单位
      if (this.activeName === "first") {
        //当前测试
        param.samplingOrgName =
          selectedData && selectedData.orgname ? selectedData.orgname : "";
        param.samplingOrgId =
          selectedData && selectedData.orgid ? selectedData.orgid : "";
        param.performerName = "";
        param.performerId = "";
      } else {
        //选中本单位人员
        param.samplingOrgName = "";
        param.samplingOrgId = "";
        /*param.performerName='qas';
          param.performerId='AADB9D8B611B4ACEB93AB32AAB26F678';*/
        param.performerName = selectedData ? selectedData.operatorname : "";
        param.performerId = selectedData ? selectedData.operatorid : "";
      }
      if (this.sourceD) {
        this.$emit(this.$constants.PLAN_SAMPLER, param);
      } else {
        this.$emit(this.$constants.PLAN_TO_SAMPLER, param);
      }
    },
    toSearchOrg() {
      const $this = this;
      this.doSearchOrg($this);
    },
    doSearchOrg(vm) {
      /*  let types = [
        this.$constants.ORGTYPE_ID001,
        this.$constants.ORGTYPE_ID005
      ]; //粮食局、质检站*/
      let userinfo = this.$store.getters.get_userInfo;
      /* let param = {
        types: this.$constants.ORGTYPE_ID001,
        types: this.$constants.ORGTYPE_ID005,
        orgid: userinfo && userinfo.orgId ? userinfo.orgId : "",
        // orgid:'11',
        orgname: vm.org_name,
        page: vm.currentPage,
        rows: vm.pageSize
      };*/
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
    toSearchUser() {
      const $this = this;
      this.doSearchUser($this);
    },
    doSearchUser(vm) {
      //_data/base/orgemployee/page?orgid=11
      let userinfo = this.$store.getters.get_userInfo;
      vm.$get({
        url: "/_data/base/orgemployee/orgEmps",
        fnc: data => {
          vm.tableData_user = data.rows;
          vm.total = data.total;
        },
        param: {
          orgid: userinfo && userinfo.orgId ? userinfo.orgId : "",
          //orgid: "11",
          userid: vm.user_name,
          page: vm.currentPage,
          rows: vm.pageSize
        }
      });
    },
    getTransfTinyPagParam(obj) {
      this.currentPage = obj.currentPageNum;
      this.pageSize = obj.pageSizeNum;
      const $this = this;
      if (this.activeName === "first") {
        //下级单位
        this.doSearchOrg($this);
      } else {
        //本级单位人员
        //获取本级单位人员数据
        this.doSearchUser($this);
      }
    }
  },
  components: {
    tinyPage: tiny_page
  },
  created() {
    this.samplerTabsAction();
  },
  props: {
    sourceD: {
      type: String,
      default: ""
    }
  }
};
</script>
