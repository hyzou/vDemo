<template>
  <div>
    <el-collapse v-model="collapseActiveName" accordion>
      <el-collapse-item title="检测样品相关信息" name="first">
        <el-row>
          <el-col>
            <el-form
              :model="dataSource.sampleInfo"
              :inline="true"
              ref="sampleInfoForm"
              label-width="130px"
            >
              <el-form-item label="样品名称:" prop="name">
                <el-input
                  v-model="dataSource.sampleInfo.name"
                  class="dialog_input fontMainBlack"
                  disabled
                ></el-input>
              </el-form-item>

              <el-form-item label="样品编号:" prop="code">
                <el-input
                  v-model="dataSource.sampleInfo.code"
                  class="dialog_input fontMainBlack"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="产品品种:" prop="productName">
                <el-input
                  v-model="dataSource.sampleInfo.productName"
                  class="dialog_input fontMainBlack"
                  disabled
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="任务性质:" prop="nature">
                <el-input
                  v-model="dataSource.sampleInfo.nature"
                  class="dialog_input fontMainBlack"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="检测编号:" prop="testCode">
                <el-input
                  v-model="dataSource.sampleInfo.testCode"
                  class="dialog_input fontMainBlack"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="样品检测等级:" prop="requiredGrade__dsp">
                <el-input
                  v-model="dataSource.sampleInfo.requiredGrade__dsp"
                  class="dialog_input fontMainBlack"
                  disabled
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="样品检测结果:" prop="qualified">
                <el-input
                  v-model="dataSource.sampleInfo.qualified"
                  class="dialog_input fontMainBlack"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="检测人:" prop="testBy">
                <el-input
                  v-model="dataSource.sampleInfo.testBy"
                  class="dialog_input fontMainBlack"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="检测时间:" prop="testDt">
                <el-date-picker
                  v-model="dataSource.sampleInfo.testDt"
                  type="date"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd"
                  class="dialog_input fontMainBlack"
                  disabled
                >
                </el-date-picker>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div style="margin-top: 10px">
      <h1 class="el-collapse-item__header" style="border: 0px;cursor: default">
        检测项目
      </h1>

      <template>
        <el-table
          ref="sampleCheckItemsTable"
          :data="dataSource.sampleCheckItemsDataArray"
          style="width: 100%"
          max-height="350px"
          border
        >
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="basItem.name" label="检测项">
          </el-table-column>
          <el-table-column prop="basItem.munit" label="法定单位" width="120">
          </el-table-column>
          <el-table-column label="结果值" width="300">
            <template slot-scope="scope">
              <el-select
                v-if="scope.row.basItem.dataType == 'O'"
                v-model="scope.row.value"
                placeholder="请选择"
                class="search_input fontMainBlack"
                disabled
              >
                <el-option
                  v-for="item in scope.row.bndictTDictionaryList"
                  :key="item.businid"
                  :label="item.busintypeName"
                  :value="item.businid"
                >
                </el-option>
              </el-select>
              <el-input
                v-else
                v-model="scope.row.value"
                placeholder="请输入结果值"
                disabled
                class="fontMainBlack"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="displayRefValue" label="参考值" width="300">
          </el-table-column>
          <el-table-column prop="judgeNameIfTrue" label="判定结果" width="300">
          </el-table-column>
        </el-table>
        <!--</el-form>-->
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "resultEnter",
  data() {
    return {
      resultEnterEntity: null,
      collapseActiveName: "first",
      dataSource: {
        sampleInfo: {},
        sampleCheckItemsDataArray: []
      },
      submitData: {
        qualified: "Y",
        checkResult: ""
      },
      qualifieds: [
        { value: "Y", text: "合格" },
        { value: "N", text: "不合格" }
      ],
      checkResults: [],
      dialogEnterTest: false
    };
  },
  methods: {
    //获取样品信息
    findSampleInfo() {
      if (
        !this.resultEnterEntity ||
        !this.resultEnterEntity.qasSampleId ||
        this.resultEnterEntity.qasSampleId == 0
      ) {
        return false;
      }
      const $this = this;
      this.$get({
        url: "/_data/sample/sample/findSampleInfoBySampleId",
        fnc: data => {
          if (data.success) {
            let dataData = data.data;
            $this.dataSource.sampleInfo = dataData;
            $this.$set(
              $this.dataSource.sampleInfo,
              "testDt",
              dataData.testDt ? $this.$dateUtl.getTime(dataData.testDt) : ""
            );
            let qualifiedsObject = $this.qualifieds.filter(item => {
              return item.value == $this.dataSource.sampleInfo.qualified;
            });
            $this.$set(
              $this.dataSource.sampleInfo,
              "qualified",
              qualifiedsObject &&
                qualifiedsObject.length > 0 &&
                qualifiedsObject[0].text
                ? qualifiedsObject[0].text
                : ""
            );
          }
        },
        param: { qasSampleId: this.resultEnterEntity.qasSampleId }
      });
    },
    //获取样品检测项信息
    findSampleCheckItem() {
      if (
        !this.resultEnterEntity ||
        !this.resultEnterEntity.qasSampleId ||
        this.resultEnterEntity.qasSampleId == 0
      ) {
        return false;
      }
      const $this = this;
      this.$get({
        url: "/_data/sample/sample/findSampleQasPlanQaItem",
        fnc: data => {
          if (data.success) {
            $this.dataSource.sampleCheckItemsDataArray = data.data;
          }
        },
        param: { qasSampleId: this.resultEnterEntity.qasSampleId }
      });
    }
  },
  props: {
    resultEnterObject: {
      type: Object
    }
  },
  watch: {
    resultEnterObject: {
      handler(val) {
        this.resultEnterEntity = val;
        this.findSampleInfo();
        this.findSampleCheckItem();
      },
      immediate: true
    }
  }
};
</script>
