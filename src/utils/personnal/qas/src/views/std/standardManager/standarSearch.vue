<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item name="1">
      <template slot="title">
        <span class="panel_tit">查询条件</span>
      </template>
      <el-form label-width="auto" :inline="true">
        <el-form-item label="颁布组织">
          <el-select
            v-model="search.issuedBy"
            placeholder="请选择"
            class="dialog_input"
            clearable
          >
            <el-option
              v-for="item in defaultSearchData.issuedBylist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类别">
          <el-select
            v-model="search.productType"
            placeholder="请选择"
            class="dialog_input"
            clearable
          >
            <el-option
              v-for="item in defaultSearchData.productTypelist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称查询">
          <el-input
            v-model="search.name"
            class="dialog_input"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="标准编码">
          <el-input
            v-model="search.stdNo"
            class="dialog_input"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="do_search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  name: "standarSearch",
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
        stdNo: "",
        issuedBy: "",
        productType: "",
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
