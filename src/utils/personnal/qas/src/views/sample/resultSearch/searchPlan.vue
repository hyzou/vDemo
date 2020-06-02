<template>
  <div class="common_page">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <span class="panel_tit">查询条件</span>
        </template>
        <el-row>
          <el-col :span="21">
            <el-col :span="6">
              <label class="search_label">监管环节</label>
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
            </el-col>
            <el-col :span="6">
              <label class="search_label">计划性质</label>
              <el-select v-model="search.nature" placeholder="请选择" clearable>
                <el-option
                  v-for="item in natures"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <label class="search_label">计划标题</label>
              <el-input placeholder="" v-model="search.name"> </el-input>
            </el-col>
          </el-col>
          <el-col :span="3" class="textAlignRight">
            <el-button type="primary" class="search_btn" @click="do_search()"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>

    <template>
      <el-table
        ref="planTable"
        :data="planData"
        stripe
        :border="true"
        style="width: 100%"
        @selection-change="selectionRowsChange"
        class="sampler_table"
        max-height="400px"
      >
        <el-table-column type="selection" width="50"> </el-table-column>
        <el-table-column prop="name" label="计划标题"></el-table-column>
      </el-table>
    </template>
    <template>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSizeNum"
          layout="total, prev, pager, next"
          :total="totalNum"
        >
        </el-pagination>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "searchPlan",
  data() {
    return {
      activeName: "1",
      search: {
        link: "1",
        nature: "",
        name: ""
      },
      links: [],
      natures: [],
      totalNum: 0,
      pageSizeNum: this.$constants.numberPerpage,
      currentPage: 1,
      planData: [],
      choosePlanData: {
        qasPlanId: 0,
        qasPlanName: ""
      }
    };
  },
  methods: {
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

    handleSizeChange(val) {
      this.pageSizeNum = val;
      this.do_search();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.do_search();
    },
    do_search() {
      let param = {
        page: this.currentPage,
        rows: this.pageSizeNum
      };
      if (this.search.name) {
        param.name = encodeURIComponent(this.search.name);
      }
      if (this.search.link) {
        param.link = this.search.link;
      }
      if (this.search.nature) {
        param.nature = this.search.nature;
      }
      this.$get({
        url: "/_data/task/plan/pageApprovalOrEndSamplePlan",
        fnc: data => {
          this.planData = data.rows;
          this.totalNum = data.total;
        },
        param: param
      });
    },
    //选中计划
    selectionRowsChange(val) {
      if (val.length != 1) {
        this.$emit("btnShowCallback", true);
        return false;
      }
      this.$emit("btnShowCallback", false);
      this.choosePlanData.qasPlanId = val[0].qasPlanId;
      this.choosePlanData.qasPlanName = val[0].name;
    }
  },
  created() {
    this.findLinks();
  },
  mounted() {
    this.do_search();
  }
};
</script>

<style scoped></style>
