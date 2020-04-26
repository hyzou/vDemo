<template>
  <div class="unit-organization">
    <el-row>
      <el-col :span="24">
        <div class="table-container">
          <el-row>
            <el-col class="mb20" :span="24">
              <commonTitleWithBorder :title="titles.searchTitel" />
            </el-col>
          </el-row>
          <el-row>
            <el-col class="mb20" :span="24">
              <formGroup
                :formGroupSettings="formGroupSettings"
                @formGroupSubmit="handleSearchSubmit"
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
import dialogEditFormItemslist from "@/utils/formSettingsJson/contractUs/dialogFormItems.json";
import dialogFormAddBtnlist from "@/utils/formSettingsJson/contractUs/dialogAddFormBtns.json";

export default {
  name: "contractUs",
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
        searchTitel: "联系我们"
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      formGroupSettings: {
        fullScreen: "true",
        formItemSpan: 12,
        formGroupList: dialogEditFormItemslist,
        formGroupValues: {},
        formButtonList: dialogFormAddBtnlist
      },
      /**
       * 默认请求筛选条件
       */
      filterRules: [
        {
          field: "type",
          value: "05",
          op: "equal"
        }
      ]
    };
  },
  methods: {
    /* 表单数据提交 */
    handleSearchSubmit(btn, data) {
      let that = this,
        postdata = {};
      data.type = "05";
      postdata = data;
      // postdata.userAction = btn.flag;
      that.$http(that.$api[btn.postUrl](), postdata, true).then(xhr => {
        if (xhr.success) {
          that.$message({
            message: "操作成功！",
            type: "success"
          });
          that.getDefalutData();
        }
      });
    },
    /* 获取默认数据 */
    getDefalutData() {
      let that = this,
        postdata = {
          filterRules: JSON.stringify(this.filterRules)
        };
      this.$getData("tradeInformationList", postdata).then(data => {
        if (data.rows && data.rows.length > 0) {
          that.formGroupSettings.formGroupValues = data.rows[0];
        }
      });
    }
  },
  mounted() {
    this.getDefalutData();
  }
};
</script>
