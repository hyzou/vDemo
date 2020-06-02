/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div class="plan_from">
    <el-form
      label-width="110px"
      :inline="true"
      :model="planForm"
      :rules="rules"
      ref="stockPlanForm"
    >
      <!--表单第一行-->
      <el-form-item label="计划性质:" prop="nature">
        <el-radio-group v-model="planForm.nature" @change="planClick">
          <el-radio
            v-for="name in this.$store.getters.natures"
            :key="name.value"
            :label="name.value"
            name="nature"
            :disabled="disabledParam"
            v-bind:class="{ fontMainBlack: disabledParam }"
          >
            {{ name.text }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <br />
      <!--表单第二行-->
      <el-form-item label="计划标题:" prop="name">
        <el-input
          v-model="planForm.name"
          class="dialog_input"
          :disabled="disabledParam"
          v-bind:class="{ fontMainBlack: disabledParam }"
        ></el-input>
      </el-form-item>
      <el-form-item label="监测级别:" prop="adminLevel">
        <el-select
          v-model="planForm.adminLevel"
          @change="admin_change"
          class="dialog_input"
          :disabled="disabledParam"
          v-bind:class="{ fontMainBlack: disabledParam }"
        >
          <el-option
            v-for="item in $store.getters.admins"
            :key="item.text"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="扦样方式:" prop="sampleWay">
        <el-select
          v-model="planForm.sampleWay"
          placeholder="扦样方式"
          class="dialog_input"
          :disabled="disabledParam"
          v-bind:class="{ fontMainBlack: disabledParam }"
        >
          <el-option
            v-for="item in modes"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下发时间:" prop="publishDtStr">
        <el-date-picker
          v-model="planForm.publishDtStr"
          type="date"
          value-format="yyyy-MM-dd"
          class="dialog_input"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          :disabled="disabledParam"
          v-bind:class="{ fontMainBlack: disabledParam }"
        >
        </el-date-picker>
      </el-form-item>
      <br />
      <!--表单第三行-->
      <el-form-item label="开始时间:" prop="startDtStr">
        <el-date-picker
          v-model="planForm.startDtStr"
          type="date"
          value-format="yyyy-MM-dd"
          class="dialog_input"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          :disabled="disabledParam"
          v-bind:class="{ fontMainBlack: disabledParam }"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="要求完成日期:" prop="deadlineDtStr">
        <el-date-picker
          v-model="planForm.deadlineDtStr"
          type="date"
          value-format="yyyy-MM-dd"
          class="dialog_input"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          :disabled="disabledParam"
          v-bind:class="{ fontMainBlack: disabledParam }"
        >
        </el-date-picker>
      </el-form-item>
      <!--表单第四行-->
      <el-form-item label="委托单位:" prop="entrustOrg">
        <!-- <el-input
          placeholder="委托单位"
          v-model="planForm.entrustOrg"
          class="input-with-select"
          v-bind:class="{ fontMainBlack: disabledParam }"
          :disabled="disabledParam"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="doSearchEntrustOrg"
          ></el-button>
        </el-input>-->
        <el-autocomplete
          v-model="planForm.entrustOrg"
          :fetch-suggestions="querySearchAsync"
          placeholder="委托单位"
          @select="handleSelect"
          :trigger-on-focus="false"
          value-key="orgname"
          value="orgname"
        >
          <span slot-scope="{ item }">
            <span :title="item.orgname"> {{ item.orgname }}</span>
          </span>
        </el-autocomplete>
        <!-- <el-select
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="委托单位"
          v-model="planForm.entrustOrg"
          class="input-with-select"
          v-bind:class="{ fontMainBlack: disabledParam }"
          :disabled="disabledParam"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in entrustOrgS"
            :key="item.orgid"
            :label="item.orgname"
            :value="item.orgid"
          >
          </el-option>
        </el-select>-->
      </el-form-item>
      <el-form-item label="标准类别:" prop="stdSuitsArray">
        <el-select
          v-model="planForm.stdSuitsArray"
          multiple
          placeholder="请选择"
          class="dialog_input"
        >
          <el-option
            v-for="item in stdSuitsDataSource"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <br />
      <el-form-item label="是否定时下发:" prop="isTimingSent">
        <el-switch
          v-model="planForm.isTimingSent"
          active-text="是"
          inactive-text="否"
          active-value="Y"
          inactive-value="N"
        />
      </el-form-item>

      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <span class="sub-tit" style="margin-right: 10px">产品信息</span>
          </template>
          <div class="tool-bar bgfff">
            <el-button
              type="primary"
              class="s-tool-btn"
              @click="handler_row(0, { action: '新增' })"
              v-if="!disabledParam"
            >
              新增
            </el-button>
          </div>
          <el-table
            ref="productsTable"
            :data="planForm.sampleRequest"
            stripe
            :border="true"
            :row-key="row_key"
            style="width: 100%"
          >
            <el-table-column label="产品品种" width="450">
              <template slot-scope="scope">
                <el-form-item>
                  <el-select
                    placeholder="请选择"
                    :size="table_input"
                    v-model="planForm.sampleRequest[scope.$index].productId"
                    ref="pros"
                    @change="
                      val => {
                        productHandle(val, scope.$index);
                      }
                    "
                    v-bind:class="{ fontMainBlack: disabledParam }"
                    :disabled="disabledParam"
                  >
                    <el-option
                      v-for="item in $store.getters.products"
                      :key="item.id"
                      :label="item.text"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <el-select
                    placeholder="请选择"
                    :size="table_input"
                    v-model="planForm.sampleRequest[scope.$index].grainbreedId"
                    style="margin-left: 10px;"
                    v-bind:class="{ fontMainBlack: disabledParam }"
                    :disabled="disabledParam"
                  >
                    <el-option
                      v-for="item in grainBreed[scope.$index]"
                      :key="item.id"
                      :label="item.text"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="样品等级要求">
              <template slot-scope="scope">
                <el-form-item>
                  <el-select
                    placeholder="请选择"
                    :size="table_input"
                    v-model="
                      planForm.sampleRequest[scope.$index].requiredGradeList
                    "
                    multiple
                    clearable
                    v-bind:class="{ fontMainBlack: disabledParam }"
                    :disabled="disabledParam"
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
              </template>
            </el-table-column>
            <el-table-column label="扦样要求">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    :size="table_input"
                    v-model="
                      planForm.sampleRequest[scope.$index].samplingRequire
                    "
                    v-bind:class="{ fontMainBlack: disabledParam }"
                    :disabled="disabledParam"
                  >
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column label="样品重量(公斤)">
              <template slot-scope="scope">
                <el-form-item
                  :prop="'sampleRequest.' + scope.$index + '.sampleWeight'"
                  :rules="{
                    required: true,
                    message: '样品重量不得为空',
                    trigger: 'change'
                  }"
                >
                  <el-input
                    placeholder="样品重量(公斤)"
                    :size="table_input"
                    v-model="planForm.sampleRequest[scope.$index].sampleWeight"
                    v-bind:class="{ fontMainBlack: disabledParam }"
                    :disabled="disabledParam"
                  >
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="样品份数">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input-number
                    v-model="planForm.sampleRequest[scope.$index].sampleCopyNum"
                    :min="1"
                    :max="10"
                    :size="table_input"
                    v-bind:class="{ fontMainBlack: disabledParam }"
                    :disabled="disabledParam"
                  ></el-input-number>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150"
              v-if="!disabledParam"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="copy_row(scope.$index, scope.row)"
                >
                  复制
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handler_row(scope.$index, scope.row)"
                  >{{ scope.row.action }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <el-collapse v-model="activeNameUpload" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <span class="sub-tit">文件上传</span>
        </template>
        <!--<el-row>
          <el-col :span="6">-->
        <div class="clearfix">
          <el-upload
            class="upload-demo floatLeft"
            ref="upload"
            action=""
            :auto-upload="false"
            name="fileList"
            :on-change="loadFiles"
            :on-remove="loadFiles"
            :file-list="planForm.fileList"
          >
            <el-button size="small" type="primary" v-if="!disabledParam">
              点击上传
            </el-button>
          </el-upload>
        </div>
        <!-- </el-col>
        </el-row>-->
      </el-collapse-item>
    </el-collapse>

    <!--  指定委托单位 -->
    <!--<el-dialog
      :close-on-click-modal="false"
      title="指定委托单位"
      :visible.sync="dialog_entrustOrg"
      class="dialog_area"
      v-if="dialog_entrustOrg"
      :top="mg_top"
      :width="dilogWith"
      :append-to-body="true"
    >
      <entrustOrg @transfEntrustOrg="getEntrustOrg"></entrustOrg>
    </el-dialog>-->
  </div>
</template>

<script>
/*import entrustOrg from "./entrustOrg";*/

export default {
  name: "planStockMsg",
  data() {
    return {
      // title: "",
      products: [],
      table_input: "mini",
      rules: {
        name: {
          required: true,
          message: "计划标题不得为空",
          trigger: "change"
        },
        adminLevel: {
          required: true,
          message: "请选择监测级别",
          trigger: "change"
        },
        sampleWay: {
          required: true,
          message: "扦样方式不得为空",
          trigger: "change"
        },
        publishDtStr: {
          required: true,
          message: "请选择下发时间",
          trigger: "change"
        },
        startDtStr: {
          required: true,
          message: "请选择开始时间",
          trigger: "change"
        },
        deadlineDtStr: {
          required: true,
          message: "请选择完成时间",
          trigger: "change"
        },
        entrustOrg: {
          required: true,
          message: "委托单位不得为空",
          trigger: "change"
        }
      },
      fileList: [],
      typeOP_model: this.$store.getters.products[0]
        ? this.$store.getters.products[0].children
          ? this.$store.getters.products[0].children
          : []
        : [],
      type_model: this.$store.getters.products[0]
        ? this.$store.getters.products[0].children
          ? this.$store.getters.products[0].children[0].id
          : ""
        : "",
      grainBreed: [
        this.$store.getters.products[0]
          ? this.$store.getters.products[0].children
            ? this.$store.getters.products[0].children
            : []
          : []
      ],
      grades: [], //判定等级来源数据
      activeName: "1",
      activeNameUpload: "1",
      natureName: this.$store.getters.natures[0]
        ? this.$store.getters.natures[0].text
        : "", //计划性质选中文本
      adminName: this.$store.getters.admins[0]
        ? this.$store.getters.admins[0].text
        : "", //检测级别选中文本
      modes: [],
      planForm: {
        nature: this.$store.getters.natures[0]
          ? this.$store.getters.natures[0].value
          : "",
        name: "",
        adminLevel: this.$store.getters.admins[0]
          ? this.$store.getters.admins[0].value
          : "", //监测级别,
        sampleWay: "",
        startDtStr: this.$dateUtl.getNowTime(),
        publishDtStr: this.$dateUtl.getNowTime(),
        deadlineDtStr: "",
        track: false,
        entrustOrg: "", //委托单位
        sync: true,
        fileList: [], //上传文件数据列表绑定值
        sampleRequest: [
          {
            qasPlanSampleRequestId: "",
            productName: this.$store.getters.products[0]
              ? this.$store.getters.products[0].text
              : "",
            productId: this.$store.getters.products[0]
              ? this.$store.getters.products[0].id
              : "",
            grainbreedId: this.$store.getters.products[0]
              ? this.$store.getters.products[0].children
                ? this.$store.getters.products[0].children[0].id
                : ""
              : "",
            samplingRequire: "",
            sampleWeight: "",
            sampleCopyNum: "",
            requiredGrade: ""
            //action: "删除"
          }
        ],
        stdSuitsDataSource: []
      },
      //=============指定委托单位
      mg_top: "4%",
      dilogWith: "70%",
      dialog_entrustOrg: false,
      qasPlanId: 0,
      pickerOptions: {
        disabledDate(time) {
          let time1 = time.toLocaleDateString().replace(/\//g, "-");
          let time1Array = time1.split("-");
          time1Array[1] =
            time1Array[1] > 9 ? time1Array[1] : "0" + time1Array[1];
          time1Array[2] =
            time1Array[2] > 9 ? time1Array[2] : "0" + time1Array[2];
          time1 = time1Array.join("-");
          let time2 = new Date().toLocaleDateString().replace(/\//g, "-");
          let time2Array = time2.split("-");
          time2Array[1] =
            time2Array[1] > 9 ? time2Array[1] : "0" + time2Array[1];
          time2Array[2] =
            time2Array[2] > 9 ? time2Array[2] : "0" + time2Array[2];
          time2 = time2Array.join("-");
          return time1 < time2;
        }
      },
      stdSuitsDataSource: [],
      restaurants: [] //搜索的数据源
    };
  },
  components: {
    /*entrustOrg: entrustOrg*/
  },
  methods: {
    //组件初始化
    init() {
      let vm = this;
      this.planForm.sampleRequest.length = 1; //重置表格数据
      this.grainBreed.length = 1;
      //扦样方式
      this.$Api.getDic("qas_sample_way").then(data => (vm.modes = data));
      this.products = this.$store.getters.products;
      //获取判定等级
      this.$Api.getDic(this.$constants.GRAINRANK).then(data => {
        vm.grades = data;
      });
      //获取判定结果标准
      this.$Api.getDic(this.$constants.STDSUITSTYPE).then(data => {
        vm.stdSuitsDataSource = data;
      });
      this.restAurants();
    },
    restAurants() {
      const $this = this;
      let userInfo = this.$store.getters.get_userInfo;
      this.$get({
        url:
          "/_data/base/org/listByTypes?types=" +
          this.$constants.ORGTYPE_ID001 +
          "&types=" +
          this.$constants.ORGTYPE_ID005 +
          "&orgid=" +
          (userInfo && userInfo.orgId ? userInfo.orgId : "") +
          "&scope=1",
        fnc: data => {
          if (!data.success || !data.data || data.data.length == 0) {
            return false;
          }
          $this.restaurants = data.data;
        }
      });
    },
    //检测级别下拉框事件
    admin_change() {
      let admins = this.$store.getters.admins;
      for (let i = 0; i < admins.length; i++) {
        if (this.planForm.adminLevel == admins[i].value) {
          this.adminName = admins[i].text;
          break;
        }
      }
      this.titleCreate();
    },
    //计划性质点击事件
    planClick() {
      let nameGroup = this.$store.getters.natures;
      for (let i = 0; i < nameGroup.length; i++) {
        if (this.planForm.nature == nameGroup[i].value) {
          this.natureName = nameGroup[i].text;
          break;
        }
      }
      this.titleCreate();
    },
    doSearchEntrustOrg() {
      //查询委托单位
      this.dialog_entrustOrg = true;
    },
    //获得选中的委托单位信息
    getEntrustOrg(obj) {
      this.planForm.entrustOrg = obj.entrustOrgName;
      this.dialog_entrustOrg = false;
    },
    //新增&删除行方法
    handler_row(index, row) {
      let temp = {
        qasPlanSampleRequestId: "",
        productName: this.products[0].text,
        productId: this.products[0].id,
        grainbreedId: this.type_model,
        samplingRequire: "",
        sampleWeight: "",
        sampleCopyNum: "",
        requiredGrade: "",
        action: "删除"
      };
      if ("删除" == row.action) {
        this.planForm.sampleRequest.splice(index, 1);
        this.grainBreed.splice(index, 1);
        if (this.planForm.sampleRequest.length == 1) {
          this.planForm.sampleRequest[0].action = "";
        }
      } else {
        this.planForm.sampleRequest.push(temp);
        this.grainBreed.push(this.typeOP_model);
        if (this.planForm.sampleRequest.length > 1) {
          for (let index in this.planForm.sampleRequest) {
            this.planForm.sampleRequest[index].action = "删除";
          }
        }
      }
    },
    //复制行
    copy_row(index, row) {
      let vm = this;
      let temp = {
        qasPlanSampleRequestId: "",
        productName: "",
        productId: "",
        grainbreedId: "",
        samplingRequire: "",
        sampleWeight: "",
        sampleCopyNum: "",
        requiredGrade: ""
      };
      this.products.map(p => {
        if (row.productId == p.id) {
          vm.grainBreed.push(p.children);
        }
      });
      for (let r in temp) {
        temp[r] = row[r];
      }
      //id设置为kong
      temp.qasPlanSampleRequestId = "";
      temp.action = "删除";
      this.planForm.sampleRequest.push(temp);
    },
    row_key() {},
    loadFiles(file, fileList) {
      this.planForm.fileList = fileList;
    },
    submitUpload() {},
    productHandle(newValue, index) {
      let vm = this;
      this.products.map(p => {
        if (newValue == p.id && p.children && p.children.length) {
          if (vm.grainBreed[index]) {
            vm.grainBreed[index] = p.children;
          }
          if (vm.planForm.sampleRequest[index]) {
            vm.planForm.sampleRequest[index].grainbreedId = p.children[0].id;
          }
          if (vm.planForm.sampleRequest[index]) {
            vm.planForm.sampleRequest[index].productName = p.text;
          }
        }
      });
    },
    findPlanFiles() {
      if (this.qasPlanId == 0) {
        return false;
      }
      //获取附件信息
      let pageParam = {
          qasPlanId: this.qasPlanId
        },
        $this = this;
      $this.$get({
        url: "/_data/task/plan/findFileList",
        fnc: data => {
          if (!data.data) {
            return false;
          }
          let fileArray = [];
          data.data.map(item => {
            let fileObject = {
              name: item.fileName,
              url: ""
            };
            fileArray.push(fileObject);
          });
          $this.planForm.fileList = fileArray;
        },
        param: pageParam
      });
    },
    titleCreate() {
      let titleName =
        this.$dateUtl.getYear() + "库存承储" + this.adminName + this.natureName;
      this.planForm.name = titleName;
    },
    querySearchAsync(queryString, cb) {
      if (!queryString) {
        return false;
      }
      let restaurants = this.restaurants;
      let results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      cb(results);
    },
    createStateFilter(queryString) {
      return restaurant => {
        return (
          restaurant.orgname.toLowerCase().indexOf(queryString.toLowerCase()) >
          -1
        );
      };
    },

    handleSelect(item) {
      console.log("handleSelect:" + item);
    }
  },
  beforeMount() {
    this.findPlanFiles();
  },
  /*  computed: {
    title() {
      /!*if (this.planForm.name) {
          return this.planForm.name;
        }*!/
      let titleName =
        this.$dateUtl.getYear() +
        "-库存承储" +
        this.adminName +
        this.natureName;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.planForm.name = titleName;
      return titleName;
    }
  },*/
  created() {
    this.init();
  },
  watch: {
    selectedQasPlanId: {
      handler(newVal) {
        this.qasPlanId = newVal;
      },
      immediate: true
    }
  },
  props: {
    selectedQasPlanId: {
      type: Number,
      default: 0
    },
    disabledParam: {
      type: Boolean,
      default: false
    }
  }
};
</script>
