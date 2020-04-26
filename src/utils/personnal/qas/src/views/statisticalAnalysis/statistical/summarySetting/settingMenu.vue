<!-- 统计设计的目录 -->
<template>
  <div>
    <el-collapse v-model="activeName">
      <el-collapse-item name="1" disabled>
        <el-row>
          <el-col :span="24">
            <label class="search_label">监管环节</label>
            <el-select
              v-model="selectedLink"
              placeholder="请选择"
              @change="findData"
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
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <el-table
      ref="settingMenuTable"
      :data="menuDataSource"
      row-key="id"
      :default-expand-all="true"
      :tree-props="{ hasChildren: 'hasChildren', children: 'children' }"
      reserve-selection="true"
      :show-header="false"
      height="700"
      max-height="700"
    >
      <el-table-column>
        <template slot-scope="scope">
          <el-link
            v-if="scope.row.state == 'open'"
            @click="showSetting(scope.row)"
            v-bind:class="{ activefont: scope.row.id == selectedMenuId }"
            >{{ scope.row.text }}</el-link
          >
          <span v-else style="font-weight: bold;font-size: 16px">{{
            scope.row.text
          }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "searchMenu",
  data() {
    return {
      activeName: "1",
      links: [],
      selectedLink: "1", //默认是新粮收获
      menuDataSource: [], //目录
      selectedMenuId: "" //选中的菜单id
    };
  },
  methods: {
    //获取目录
    getMenu() {
      if (!this.selectedLink) {
        return false;
      }
      let busintypeId = this.$constants.QAS_PLAN_REAP_STATISTICAL_CATALOG;
      if (this.$constants.LINK_STOCK == this.selectedLink) {
        //库存承储
        busintypeId = this.$constants.QAS_PLAN_STOCK_STATISTICAL_CATALOG;
      } else if (this.$constants.LINK_MARKET == this.selectedLink) {
        //供销粮食
        busintypeId = this.$constants.QAS_PLAN_MARKET_STATISTICAL_CATALOG;
      }
      this.$Api.getDicDataTree({ busintypeid: busintypeId }).then(xhr => {
        this.menuDataSource = xhr[0].children;
      });
    },
    findLinks() {
      const $this = this;
      this.$Api.getDic("qas_plan_link").then(data => {
        $this.links = data;
        $this.selectedLink = data && data.length > 0 ? data[0].value : "";
      });
    },
    showSetting(scopeRow) {
      /*const $this = this;
      this.menuDataSource.map(item => {
        $this.$set(item, "isActive", false);
      });
      $this.$set(scopeRow, "isActive", true);*/
      this.selectedMenuId = scopeRow.id;
      let returnData = {
        selectedLink: this.selectedLink,
        menuid: scopeRow.id
      };
      this.$emit("returnData", returnData);
    },
    findData() {
      this.getMenu();
    }
  },
  created() {
    this.getMenu();
    this.findLinks();
  }
};
</script>

<style scoped></style>
