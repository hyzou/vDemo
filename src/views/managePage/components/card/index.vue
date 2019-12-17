<template>
  <div class="table-container">
    <el-row class="mb20">
      <el-col :span="14">
        <card
          :cardlistsData="cardSettings"
          @detailOperateTap="handleDetailOperate"
          @detailItemTap="handleDetailItemTap"
        />
      </el-col>
      <el-col :span="14">
        <ul class="contentText">
          <li>
            <p>1.组件配置项如下：</p>
            <pre>
                <code>
                  &lt;card
                    :cardlistsData="cardSettings"
                    @detailOperateTap="handleDetailOperate"
                    @detailItemTap="handleDetailItemTap"
                  />
                  cardSettings: {
                    cardlistTitle: "优质供应商介绍",
                    cardlistOperation: "更多>>",
                    cardType: "04",
                    cardlistsArray: [{
                      title:"第一条",
                      time:"2019-12-12",
                      otherParam: "其他数据1"
                    },{
                      title:"第二条",
                      time:"2019-12-13",
                      otherParam: "其他数据2"
                    }],
                    cardItemParams:{
                      main:"title",
                      subMain: "otherParam"
                    }
                  },
                </code>
              </pre>
          </li>
          <li>
            <tableList :tablelistSettings="tablelistSettings" />
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 组件引入
import card from "@/components/card";
import tableList from "@/components/tableList";
// 配置数据引入
import tableHeaderOpts from "@/utils/formSettingsJson/tableCommonHeaders/tableHeaderOpt.json";
import tableData from "@/utils/formSettingsJson/cardMng/tableData.json";

export default {
  name: "cardMng",
  components: {
    card,
    tableList
  },
  data() {
    return {
      /**
       * card 基本数据配置
       */
      cardSettings: {
        cardlistTitle: "优质供应商介绍",
        cardlistOperation: "更多>>",
        cardType: "04",
        cardlistsArray: [
          {
            title: "第一条",
            time: "2019-12-12",
            otherParam: "其他数据1"
          },
          {
            title: "第二条",
            time: "2019-12-13",
            otherParam: "其他数据2"
          }
        ],
        cardItemParams: {
          main: "title",
          subMain: "otherParam"
        }
      },
      /**
       * table 表格配置
       */
      tablelistSettings: {
        tableDatas: tableData,
        tableSettingOptions: {
          tooltipEffect: "dark",
          border: true,
          headerOptions: tableHeaderOpts
        }
      }
    };
  },
  methods: {
    /* 点击card组件头部操作按钮 */
    handleDetailOperate(type, title) {
      console.log(type);
      console.log(title);
    },
    /* 点击card组件具体条目 */
    handleDetailItemTap(item, title, type) {
      console.log(item);
      console.log(title);
      console.log(type);
    }
  }
};
</script>
