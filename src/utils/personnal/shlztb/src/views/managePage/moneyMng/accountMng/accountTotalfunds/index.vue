<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
          <el-col class="mb20" :span="24">
            <commonTitleWithBorder :title="titles.searchTitel" />
          </el-col>
          <el-row>
            <el-col :span="8" :offset="8">
              <formGroup
                :formGroupSettings="formGroupSettings"
                @formGroupSubmit="handleChangePsw"
              />
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
// 配置数据引入
import searchFormItemslist from "@/utils/formSettingsJson/accountTotalfunds/pswSheetSettings.json";
export default {
  name: "accountTotalfunds",
  components: {
    commonTitleWithBorder,
    formGroup
  },
  data() {
    return {
      /**
       * titles 标题管理
       */
      titles: {
        searchTitel: "账户资金总额"
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      formGroupSettings: {
        formItemSpan: 12,
        formGroupList: searchFormItemslist,
        formGroupValues: {},
        formButtonList: []
      }
    };
  },
  methods: {
    /* 分页获取列表信息 */
    getDataList() {
      this.$getData("getAccountTotalfunds", {}).then(xhr => {
        xhr.data.numUse =
          parseFloat(xhr.data.num) - parseFloat(xhr.data.numLock);
        this.formGroupSettings.formGroupValues = xhr.data;
      });
    }
  },
  mounted() {
    this.getDataList();
  }
};
</script>
