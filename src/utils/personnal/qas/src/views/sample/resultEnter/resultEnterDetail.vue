<template>
  <div>
    <el-collapse
      v-model="collapseActiveName"
      accordion
      @change="collapseActive"
    >
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
              <el-form-item label="样品等级要求:">
                <el-select
                  v-model="dataSource.sampleInfo.requiredGradeList"
                  placeholder="样品等级要求"
                  class="dialog_input fontMainBlack"
                  multiple
                  disabled
                >
                  <el-option
                    v-for="item in grades"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
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
          :max-height="maxHeight"
          border
        >
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="basItem.name" label="检验指标">
          </el-table-column>
          <el-table-column prop="basItem.munit" label="法定单位" width="80">
          </el-table-column>
          <el-table-column label="结果值" width="160">
            <template slot-scope="scope">
              <el-select
                v-if="scope.row.basItem.dataType == 'O'"
                v-model="scope.row.value"
                placeholder="请选择"
                class="fontMainBlack"
                disabled
              >
                <el-option
                  v-for="item in scope.row.bndictTDictionaryList"
                  :key="item.businid"
                  :label="item.businname"
                  :value="item.businid"
                >
                </el-option>
              </el-select>
              <el-input
                v-else
                v-model="scope.row.value"
                placeholder="请输入结果值"
                class="fontMainBlack"
                disabled
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            v-for="item in dataSource.sampleInfo.stdSuitList"
            :label="item.label"
            :key="item.value"
          >
            <el-table-column prop="" label="标准" width="180">
              <template slot-scope="scope">
                <el-select
                  placeholder="请选择"
                  v-if="item.value == '0'"
                  v-model="scope.row.stdValueNK"
                  class="fontMainBlack"
                  disabled
                >
                  <el-option
                    v-for="stdItem in scope.row.selectDatas[item.value]"
                    :key="stdItem.qasStdId"
                    :label="stdItem.name"
                    :value="stdItem.qasStdId"
                  >
                  </el-option>
                </el-select>
                <el-select
                  placeholder="请选择"
                  v-else
                  v-model="scope.row.stdValueTY"
                  class="fontMainBlack"
                  disabled
                >
                  <el-option
                    v-for="stdItem in scope.row.selectDatas[item.value]"
                    :key="stdItem.qasStdId"
                    :label="stdItem.name"
                    :value="stdItem.qasStdId"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              v-if="item.value == '0'"
              prop="displayRefValueNK"
              label="参考值"
              width="120"
            >
            </el-table-column>
            <el-table-column
              v-else
              prop="displayRefValueTY"
              label="参考值"
              width="120"
            >
            </el-table-column>
            <el-table-column
              v-if="item.value == '0'"
              prop="judgeNameIfTrueNK"
              label="判定结果"
              width="120"
            >
            </el-table-column>
            <el-table-column
              v-else
              prop="judgeNameIfTrueTY"
              label="判定结果"
              width="120"
            >
            </el-table-column>
          </el-table-column>
        </el-table>
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
      dialogEnterTest: false,
      maxHeight: "310px",
      stdOptionDataSource: {},
      grades: []
    };
  },
  methods: {
    //获取样品信息
    findSampleInfo(callback) {
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
            if (callback) {
              callback();
            }
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
            data.data.map(item => {
              item.selectDatas = $this.stdOptionDataSource;
              item.stdValueTY = item.stdValueTY ? item.stdValueTY : "";
              item.stdValueNK = item.stdValueNK ? item.stdValueNK : "";
              item.displayRefValueNK = item.displayRefValueNK
                ? item.displayRefValueNK
                : "";
              item.displayRefValueTY = item.displayRefValueTY
                ? item.displayRefValueTY
                : "";
              item.judgeNameIfTrueNK = item.judgeNameIfTrueNK
                ? item.judgeNameIfTrueNK
                : "";
              item.judgeNameIfTrueTY = item.judgeNameIfTrueTY
                ? item.judgeNameIfTrueTY
                : "";
              item.judgeResultNK = item.judgeResultNK ? item.judgeResultNK : "";
              item.judgeResultTY = item.judgeResultTY ? item.judgeResultTY : "";
            });
            $this.dataSource.sampleCheckItemsDataArray = data.data;
          }
        },
        param: { qasSampleId: this.resultEnterEntity.qasSampleId }
      });
    },
    findStdValue(param1, index) {
      const $this = this;
      let param = {
        stdSuit: param1
      };
      this.$get({
        url: "/_data/std/std/getStdsBySuit",
        fnc: data => {
          if (!data || !data.success || !data.data) {
            $this.$set($this.stdOptionDataSource, param1, []);
            return false;
          }
          //获取标准数据然后存储到数据集合中
          $this.$set($this.stdOptionDataSource, param1, data.data);
        },
        param: param
      });
    },
    findStd() {
      let stdSuitList = this.dataSource.sampleInfo.stdSuitList;
      if (!stdSuitList) {
        return false;
      }
      for (let index in stdSuitList) {
        this.findStdValue(stdSuitList[index].value, index);
      }
    },
    collapseActive(activeNames) {
      if (activeNames) {
        this.maxHeight = "310px";
        return false;
      }
      this.maxHeight = "510px";
    },
    get_grade(vm) {
      //获取判定等级
      this.$Api.getDic(this.$constants.GRAINRANK).then(data => {
        vm.grades = data;
      });
    }
  },
  mounted() {
    const $this = this;
    $this.get_grade($this);
  },
  props: {
    resultEnterObject: {
      type: Object
    }
  },
  watch: {
    resultEnterObject: {
      handler(val) {
        const $this = this;
        let callBackObject = {
          sampleInfoCallBack: function() {
            $this.findStd();
          }
        };
        this.resultEnterEntity = val;
        this.findSampleInfo(callBackObject.sampleInfoCallBack);
        this.findSampleCheckItem();
      },
      immediate: true
    }
  }
};
</script>
