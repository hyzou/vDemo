<template>
  <div class="width100 random">
    <el-row>
      <el-col class="mb20" :span="24">
        <commonTitleWithBorder title="查询条件" />
      </el-col>
      <el-col class="mb20" :span="24">
        <formGroup
          v-show="showSearchForm"
          ref="searchForm"
          :formGroupSettings="searchFormGroupSettings"
          @formGroupSubmit="handleSearchFormBtn"
        />
      </el-col>
    </el-row>
    <el-row class="reviewProgress-title mb10">
      <el-col :span="6">
        <commonTitleWithBorder title="列表信息" />
      </el-col>
      <el-col :span="18" class="textAlignRight">
        <operateButtonsGroup
          class="textAlignRight"
          :operateButtonsSettings="operateButtonsSettings"
          @handleOperateButton="handleOperateButton"
        />
      </el-col>
    </el-row>
    <tableList
      :tablelistSettings="tableSettings"
      @handleTableRowButton="handleTableRowButton"
    />
    <pagination
      :paginationSettings="paginationSettings"
      @handlePaginationPagenumber="handlePaginationPagenumber"
    />
    <dialogForm
      v-if="dialogFormSettings.dialogFormVisible"
      :dialogFormSettings="dialogFormSettings"
      @handleDialogForm="handleDialogForm"
      @linkSelect="handleLinkSelect"
      @handleHtmlNodeAction="handleHtmlNodeAction"
    />
    <section v-show="dialogVisible" class="positionFix random-bgbox">
      <div class="positionAbs positionCenterWrap random-mainContent">
        <div
          class="positionAbs random-closeBtn"
          @click="
            dialogVisible = false;
            stepNum = 1;
          "
        ></div>
        <div class="random-title mt45"></div>
        <div class="random-switchContent positionRel mt25 overflowHidden">
          <div
            v-show="scrollResult && !scrollRun"
            class="width100 pd15 overflowXhYa"
            style="height:100%"
          >
            <div>
              <el-checkbox-group
                v-model="reRandomIdList"
                size="small"
                @change="handleChangeRandom"
              >
                <el-checkbox
                  class="mb10 width100"
                  v-for="ranItem in randomResultlist"
                  :key="ranItem.code"
                  :label="ranItem.code"
                >
                  <div class="width100" :title="ranItem.fullName">
                    <span class="pr20">{{ ranItem.code }}</span>
                    <span>{{ ranItem.fullName }}</span>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div
            v-show="!scrollResult && !scrollRun"
            class="overflowXhYa width100"
            style="height:100%"
          >
            <div>
              <div
                class="random-showItem textAlignCenter"
                v-for="item in datalist.slice(0, dataShowNumber)"
                :key="item.code"
              >
                {{ item.fullName }}
              </div>
            </div>
          </div>
          <div
            v-show="scrollRun && !scrollResult"
            class="width100"
            style="height:100%;"
          >
            <div
              v-for="randomItem in randomListData"
              :key="randomItem.key"
              class="random-showItem width100 textAlignCenter"
            >
              {{ randomItem.fullName }}
            </div>
          </div>
        </div>
        <div class="random-tips text-white fontSize16 width100 mt10">
          <div class="mgAuto" style="width:515px;">
            注:您可以勾选复选框，点击替换按钮实现重新抽取地区。
          </div>
        </div>
        <div class="random-operateButtons textAlignRight mt30 pr45">
          <el-button
            class="random-operateButtons-button bg409EFF"
            type="primary"
            size="small"
            v-show="!scrollRun && !scrollResult"
            @click="handleStartRandom"
          >
            开始
          </el-button>
          <el-button
            class="random-operateButtons-button bgF4B81B"
            type="warning"
            size="small"
            v-show="!scrollRun && scrollResult"
            @click="handleReStartRandom"
          >
            替换
          </el-button>
          <el-button
            class="random-operateButtons-button bgFF8282"
            v-show="scrollRun && !scrollResult"
            type="danger"
            size="small"
            @click="handleStopRandom"
          >
            停止
          </el-button>
          <el-button
            class="random-operateButtons-button random-operateButtons-next bg1EA6C0"
            v-show="totalStepNumber > stepNum && scrollResult"
            type="primary"
            size="small"
            @click="handleContinue"
          >
            下一步(抽取{{ nextText }})
          </el-button>
          <el-button
            class="random-operateButtons-button bg409EFF"
            v-show="totalStepNumber <= stepNum && scrollResult"
            type="primary"
            size="small"
            @click="handleSaveRandom"
          >
            保存
          </el-button>
        </div>
      </div>
    </section>
    <el-dialog
      title="提示"
      :visible.sync="reportSeverShow"
      append-to-body
      width="70%"
    >
      <iframe
        title="报表"
        style="display:block;width:100%;height:500px;border:1px solid #ccc;"
        :src="reportServerUrl"
      ></iframe>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reportSeverShow = false">取 消</el-button>
        <el-button type="primary" @click="reportSeverShow = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- <section
      v-show="reportSeverShow"
      class="positionFix random-bgbox"
      style="z-index:9999"
    >
      <div class="positionAbs positionCenterWrap random-mainContent"></div>
    </section> -->
  </div>
</template>

<script>
// 引入methods各方法
import methods from "./methods";
// 引入data各变量声明
import dataFnc from "./data";

export default {
  name: "randomSupervisionCheck",
  data: function() {
    return dataFnc(this);
  },
  methods: {
    ...methods
  },
  mounted() {
    this.initPageData();
  },
  watch: {
    stepNum(newVal, oldVal) {
      switch (newVal) {
        case 2:
          this.nextText = "乡/镇";
          break;
        case 3:
          this.nextText = "村/社区";
          break;
        default:
          this.nextText = "区/县";
          break;
      }
    }
  }
};
</script>
