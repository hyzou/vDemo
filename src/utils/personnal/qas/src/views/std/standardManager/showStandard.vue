<template>
  <div class="dialog_root">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="标准信息" name="first">
        <formGroup :formGroupSettings="formGroupSettings" />
      </el-tab-pane>
      <el-tab-pane label="指标管理" name="second">
        <tableList :tablelistSettings="demoTableSettings" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tableHeader from "@/utils/formSettingsJson/standardManager/tableShowTargetHeader.json";
import dialogSetTargetFormItems from "@/utils/formSettingsJson/standardManager/dialogShowTargetFormItems.json";

export default {
  name: "newStandard",
  props: {
    defaultData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      // 当前激活的tab标签页
      activeName: "first",
      /**
       * formGroup 表单组配置
       */
      formGroupSettings: {
        fullScreen: true,
        formGroupList: dialogSetTargetFormItems,
        formGroupValues: this.defaultData,
        formButtonList: []
      },
      /**
       * table 表格配置
       */
      demoTableSettings: {
        tableDatas: [],
        tableSettingOptions: {
          ref: "demo",
          // headerRowClassName: "text-danger",
          // rowClassName: "text-warning",
          rowKey: "id",
          tooltipEffect: "dark",
          border: true,
          height: "400",
          headerOptions: tableHeader,
          isShowIndex: false,
          showIndexHeader: "序号",
          isMultipleTable: false,
          defaultExpandAll: true,
          treeProps: {
            children: "children",
            hasChildren: "hasChildren"
          }
        }
      }
    };
  },
  methods: {
    /**
     * 产品类别:1-油脂、油料;2-粮食;3-食品;99-其他 字典qas_std_productType
     */
    getProductType() {
      this.$Api.getDic("qas_std_productType").then(xhr => {
        dialogSetTargetFormItems.map(item => {
          if (item.name == "productType") {
            item.data = this.$dateUtl.dealDicData(xhr, "text", "value");
          }
        });
      });
    },
    /**
     * 颁布组织：1-国家标准;2-行业标准;3-企业标准;4-临时标准;5-专业标准;6-其他 qas_std_issuedBy
     */
    getOrg() {
      this.$Api.getDic("qas_std_issuedBy").then(xhr => {
        dialogSetTargetFormItems.map(item => {
          if (item.name == "issuedBy") {
            item.data = this.$dateUtl.dealDicData(xhr, "text", "value");
          }
        });
      });
    },
    /* 获取指标项树列表table合并同类项 */
    getTestTargetlist(id) {
      this.$Api.getStdToBindTargetlist({ qasStdId: id }).then(data => {
        this.dealtreedata(data);
        this.demoTableSettings.tableDatas = data[0].children;
      });
    },
    /* 处理table-tree 数据，添加子项操作项，改变text值供显示 */
    dealtreedata(data) {
      data.map(item => {
        if (item.children && item.children.length > 0) {
          this.dealtreedata(item.children);
        } else {
          // item.text += item.refValue;
          item.refValue = item.refValue + "\xa0\xa0" + item.text;
          item.text = item.refValue;
        }
      });
    },
    /* 获取所有分类条件 */
    getStdConditions() {
      this.$Api.getStdConditions().then(xhr => {
        dialogSetTargetFormItems.map(item => {
          if (item.name == "criteriaTags") {
            item.data = this.$dateUtl.dealDicData(
              xhr,
              "name",
              "qasBasCriteriaTagId"
            );
          }
        });
      });
    }
  },
  mounted() {
    if (this.defaultData.qasStdId) {
      this.getTestTargetlist(this.defaultData.qasStdId);
    }
    this.getProductType();
    this.getStdConditions();
    this.getOrg();
  }
};
</script>
