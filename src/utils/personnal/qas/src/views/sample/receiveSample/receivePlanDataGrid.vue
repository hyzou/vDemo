<template>
  <div>
    <el-collapse v-model="activeName" @change="activeNameChange">
      <el-collapse-item name="1">
        <template slot="title">
          <span class="panel_tit">查询条件</span>
        </template>
        <el-form label-width="auto" :inline="true">
          <el-row>
            <el-col :span="21">
              <el-col :span="6">
                <el-form-item label="监管环节">
                  <el-select
                    v-model="search.link"
                    placeholder="请选择"
                    @change="findNatures"
                  >
                    <template v-for="item in links">
                      <el-option
                        :key="item.value"
                        :label="item.text"
                        :value="item.value"
                        v-if="item.value != 9"
                      >
                      </el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="计划性质">
                  <el-select
                    v-model="search.nature"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in natures"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="3" class="textAlignRight">
              <el-button type="primary" @click="findData()">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-table
      :data="
        tableDataArray.filter(
          data => !searchName || data.name.includes(searchName)
        )
      "
      style="width: 100%;"
      :height="tableStyle.height"
      :max-height="tableStyle.maxHeight"
      :border="true"
    >
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="searchName"
            size="small"
            placeholder="输入计划名称搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-link
            @click="showSample(scope.row)"
            v-bind:class="{ activefont: scope.row.isActive }"
            >{{ scope.row.name }}</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPlanPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagePlanSizeSet"
          :layout="$constants.paginationlayout"
          :total="totalPlanNum"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "receivePlanDataGrid",
  data() {
    return {
      activeName: "1",
      currentPlanPage: 1,
      pagePlanSizeSet: this.$constants.numberPerpage, //每页的数量
      totalPlanNum: 0,
      searchName: "",
      tableDataArray: [],
      search: {
        link: "1",
        nature: ""
      },
      links: [],
      natures: [],
      tableStyle: {
        height: "480px",
        maxHeight: "480px"
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagePlanSizeSet = val;
      this.findData();
    },
    handleCurrentChange(val) {
      this.currentPlanPage = val;
      this.findData();
    },
    findData() {
      const $this = this;
      let param = {
        page: this.currentPlanPage,
        rows: this.pagePlanSizeSet
      };
      if (this.search.link) {
        param.link = this.search.link;
      }
      if (this.search.nature) {
        param.nature = this.search.nature;
      }
      this.$get({
        url: "/_data/task/plan/pageNeedSampleReceivePlan",
        fnc: data => {
          if (!data || !data.success || !data.rows) {
            return false;
          }
          data.rows.map(item => {
            item.isActive = false;
          });
          $this.tableDataArray = data.rows;
        },
        param: param
      });
    },
    showSample(scopeRow) {
      this.tableDataArray.map(item => {
        item.isActive = false;
      });
      scopeRow.isActive = true;
      this.$emit("receiveSamplePlanObject", scopeRow);
    },
    findLinks() {
      const $this = this;
      this.$Api.getDic("qas_plan_link").then(data => {
        $this.links = data;
        $this.search.link = data && data.length > 0 ? data[0].value : "";
        $this.findNatures($this.search.link);
      });
    },
    findNatures(val) {
      if (!val) {
        return false;
      }
      const $this = this;
      let natureType = "qas_nature_reap"; //默认新粮收获
      if (this.$constants.LINK_STOCK == val) {
        natureType = "qas_nature_stock";
      } else if (this.$constants.LINK_MARKET == val) {
        natureType = "qas_nature_market";
      }
      this.search.link = val;
      this.$Api.getDic(natureType).then(data => {
        $this.natures = data;
      });
    },
    activeNameChange(activeName) {
      this.tableStyle.height = activeName.length > 0 ? "480px" : "660px";
      this.tableStyle.maxHeight = activeName.length > 0 ? "480px" : "660px";
    }
  },
  created() {
    this.findLinks();
    this.findData();
  }
};
</script>
