<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item name="1">
      <template slot="title">
        <span class="panel_tit">查询条件</span>
      </template>
      <el-form label-width="auto" :inline="true">
        <el-row>
          <el-col :span="21">
            <el-col :span="6">
              <el-form-item label="字典">
                <el-select
                  v-model="search.busintypeid"
                  placeholder="请选择"
                  class="dialog_input"
                  clearable
                >
                  <el-option
                    v-for="item in defaultSearchData.busintypelist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="品种分类">
                <el-select
                  v-model="search.grainbreedId"
                  placeholder="请选择"
                  class="dialog_input"
                  clearable
                >
                  <el-option
                    v-for="item in defaultSearchData.grainbreedlist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否定等">
                <el-select
                  v-model="search.graded"
                  placeholder="请选择"
                  class="dialog_input"
                  clearable
                >
                  <el-option
                    v-for="item in defaultSearchData.gradedlist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="名称查询">
                <el-input
                  v-model="search.name"
                  class="dialog_input"
                  placeholder="请输入内容"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="3" class="textAlignRight">
            <el-button type="primary" @click="do_search">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: "itemManagerSearch",
  props: {
    defaultSearchData: {
      type: Object
    }
  },
  data() {
    return {
      activeName: "1",
      orgs: [],
      search: {
        busintypeid: "",
        grainbreedId: "",
        graded: "",
        name: ""
      }
    };
  },
  methods: {
    do_search() {
      let postdata = JSON.parse(JSON.stringify(this.search));
      postdata.name = encodeURIComponent(postdata.name);
      this.$emit("doSearch", postdata);
    }
  }
};
</script>
