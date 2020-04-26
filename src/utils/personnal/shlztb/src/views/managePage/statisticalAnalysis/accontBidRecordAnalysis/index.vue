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
          <el-row>
            <el-col>
              <iframe
                style="display:block;width:100%;height:600px;border:0"
                :src="url"
              ></iframe>
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
import searchFormBtnList from "@/utils/formSettingsJson/accontBidRecordAnalysis/searchFormBtns.json";
import searchFormItemslist from "@/utils/formSettingsJson/accontBidRecordAnalysis/searchFormItems.json";
export default {
  name: "accontBidRecordAnalysis",
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
        searchTitel: "查询条件"
      },
      /**
       * formGroup 表单组配置，用于编辑，搜索栏等多个场景
       */
      formGroupSettings: {
        formItemSpan: 12,
        formGroupList: searchFormItemslist,
        formGroupValues: {},
        formButtonList: searchFormBtnList
      },
      url: this.$global.VoucherUrl
    };
  },
  methods: {
    /* 搜索栏数据筛选 */
    handleSearchSubmit(flag, data) {
      let filterArr = [];
      this.url = this.$global.VoucherUrl;
      for (let prop in data) {
        if (data[prop] instanceof Array) {
          data[prop].map((item, index) => {
            let filterObj = {};
            filterObj.field = prop;
            filterObj.value = item;
            if (index == 0) {
              filterObj.op = "greaterorequal";
            } else {
              filterObj.op = "lessorequal";
            }
            filterArr.push(filterObj);
          });
        } else {
          let filterObj = {};
          filterObj.field = prop;
          filterObj.value = data[prop];
          if (prop == "no") {
            filterObj.op = "contains";
          } else {
            filterObj.op = "equal";
          }
          filterArr.push(filterObj);
        }
      }
      let url = this.url;
      filterArr.map(item => {
        if (item.value) {
          // url += `${item.field}=${this.$globalFnc.cnwordToCharCode(
          //   item.value
          // )}&`;
          url += `${item.field}=${item.value}&`;
        }
      });
      this.url = url;
    }
  },
  beforeMount() {
    // 出入类型
    this.$getData("PortalDropdownlist", {
      _refKey: "dict",
      busintypeid: "ts_pay_vouchertype",
      _noCache: "true"
    }).then(data => {
      let memberlist = this.$globalFnc.arrayToFormDropdown(
        data,
        "text",
        "value"
      );
      searchFormItemslist.map(item => {
        if (item.name == "type") {
          item.data = memberlist;
        }
      });
    });
  }
};
</script>
