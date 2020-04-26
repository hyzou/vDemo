<template>
  <div>
    <div id="mapDiv" class="dis_map_containerLocation">
      <div class="float_bar">
        <el-button
          size="small"
          type="s-tool-btn"
          class="mapBtnClass"
          @click="backLocation"
          >返回原来的位置
        </el-button>
      </div>
    </div>
    <br />
    <!-- 内容显示框 -->
    <div>
      <!-- 内容 -->
      <el-form
        :model="qasSample"
        label-width="110px"
        :inline="true"
        ref="sampleLocationForm"
      >
        <el-form-item label="样品名称:">
          <el-input
            v-model="qasSample.name"
            class="dialog_input"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="编号:">
          <el-input
            v-model="qasSample.code"
            :disabled="true"
            class="dialog_input"
          ></el-input>
        </el-form-item>
        <el-form-item label="扦样人:">
          <el-input
            v-model="qasSample.qasSamplingTask.samplingBy"
            :disabled="true"
            class="dialog_input"
          ></el-input>
        </el-form-item>
        <el-form-item label="扦样日期:">
          <el-date-picker
            v-model="qasSample.qasSamplingTask.samplingDt"
            type="date"
            :disabled="true"
            value-format="yyyy-MM-dd"
            class="dialog_input"
            placeholder="选择日期"
            :clearable="false"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品:">
          <el-input
            v-model="qasSample.qasSamplingTask.productName"
            :disabled="true"
            class="dialog_input"
          ></el-input>
        </el-form-item>
        <el-form-item label="扦样区域:">
          <el-cascader
            :options="districts"
            :props="{
              expandTrigger: 'hover',
              label: 'text',
              value: 'id',
              checkStrictly: true
            }"
            :clearable="false"
            v-model="district"
            ref="searchArea"
            placeholder="选择区域"
            class="dialog_input"
            @change="districtChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="扦样地点:">
          <el-input
            v-model="qasSample.qasSamplingTask.address"
            class="dialog_input"
          ></el-input>
        </el-form-item>
        <el-form-item label="乡/镇:">
          <el-input
            v-model="qasSample.qasSamplingTask.town"
            class="dialog_input"
          ></el-input>
        </el-form-item>
        <el-form-item label="村:">
          <el-input
            v-model="qasSample.qasSamplingTask.village"
            class="dialog_input"
          ></el-input>
        </el-form-item>
        <el-form-item label="经度:">
          <el-input
            v-model="qasSample.qasSamplingTask.longitude"
            class="dialog_input"
          ></el-input>
        </el-form-item>
        <el-form-item label="纬度:">
          <el-input
            v-model="qasSample.qasSamplingTask.latitude"
            class="dialog_input"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import markerIcon from "@/static/img/dis-icon.png";
const mapConst = {
  T: require("T"),
  handle: "",
  icon: "",
  map: "",
  lnglat: "",
  marker: "",
  localsearch: "",
  polygon: ""
};
export default {
  name: "sampleLocation",
  data() {
    return {
      qasSample: {
        qasSamplingTask: {}
      },
      lng: 115.82062, //默认经度
      lat: 28.68095, //默认纬度
      districts: [],
      district: ""
    };
  },
  methods: {
    districtChange() {
      let areas = this.$refs["searchArea"].getCheckedNodes();
      this.district = areas[0] && areas[0].value ? areas[0].value : "";
      this.qasSample.qasSamplingTask.district = this.district;
    },
    loadMap() {
      let T = mapConst.T;
      mapConst.map = new T.Map("mapDiv");
      mapConst.map.centerAndZoom(new T.LngLat(this.lng, this.lat), 12);
      mapConst.icon = new T.Icon({
        iconUrl: markerIcon,
        iconSize: new T.Point(25, 40),
        iconAnchor: new T.Point(10, 25)
      });
      //清楚地图上的标注物
      mapConst.map.clearOverLays();
      mapConst.marker = new T.Marker(new T.LngLat(this.lng, this.lat), {
        icon: mapConst.icon
      });
      //向地图上添加标注
      mapConst.map.addOverLay(mapConst.marker);
      //标注拖动事件
      this.addMarkerDrag();
    },
    //添加标注拖动事件
    addMarkerDrag() {
      //移除标注的点击事件，防止多次注册
      this.removeMarkerDrag();
      //标注可拖拽
      mapConst.marker.enableDragging();
      //注册标注的点击事件
      mapConst.marker.addEventListener("dragend", this.MarkerEndLocation);
    },
    //移除标注拖动事件
    removeMarkerDrag() {
      //移除标注的点击事件
      mapConst.marker.removeEventListener("dragend", this.MarkerEndLocation);
    },
    //获取到的结果
    MarkerEndLocation(e) {
      this.qasSample.qasSamplingTask.longitude = e.lnglat.getLng().toFixed(6);
      this.qasSample.qasSamplingTask.latitude = e.lnglat.getLat().toFixed(6);
      let lnglat = e.lnglat;
      mapConst.lnglat = e.lnglat;
      let geocode = new T.Geocoder();
      geocode.getLocation(lnglat, this.getAddressdetail);
    },
    //回到原始位置
    backLocation() {
      this.loadMap();
    },
    getAddressdetail(result) {
      if (result.getStatus() == 0) {
        var addressComponent = result.getAddressComponent();
        let lnglat = mapConst.lnglat;
        let adddistrict =
          addressComponent &&
          addressComponent.addressComponent &&
          addressComponent.addressComponent.county_code
            ? addressComponent.addressComponent.county_code.substring(3)
            : "";
        console.log(adddistrict);
        let province =
          addressComponent &&
          addressComponent.addressComponent &&
          addressComponent.addressComponent.province
            ? addressComponent.addressComponent.province
            : "";
        let county =
          addressComponent &&
          addressComponent.addressComponent &&
          addressComponent.addressComponent.county
            ? addressComponent.addressComponent.county
            : "";
        this.district = adddistrict;
        this.qasSample.qasSamplingTask.town = addressComponent.poi;
        this.qasSample.qasSamplingTask.address = result.getAddress();
        this.qasSample.qasSamplingTask.district = adddistrict;
        this.qasSample.qasSamplingTask.longitude = lnglat.getLng().toFixed(6);
        this.qasSample.qasSamplingTask.latitude = lnglat.getLat().toFixed(6);
      } else {
        this.$message({
          type: "error",
          message:
            "服务器返回状态：" +
            result.getStatus() +
            "服务器返回响应信息：" +
            result.getMsg()
        });
      }
    }
  },
  created() {
    const $this = this;
    this.$get({
      url: "/_data/sample/sample/getSampleAndTask",
      param: { qasSampleId: this.qasSampleId },
      fnc: data => {
        if (data.success) {
          $this.qasSample = data.data;
          let sampleTask = data.data.qasSamplingTask;
          if (sampleTask) {
            if (sampleTask.longitude) {
              $this.lng = sampleTask.longitude;
            }
            if (sampleTask.latitude) {
              $this.lat = sampleTask.latitude;
            }
            $this.district = sampleTask.district;
          }
          this.loadMap();
        }
      }
    });
    $this.districts = this.$store.getters.get_areaLevel;
  },
  mounted: function() {},
  props: {
    qasSampleId: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style>
.dis_map_containerLocation {
  height: 400px;
  background-color: #409eff;
}
.float_bar {
  position: absolute;
  z-index: 99999;
  width: 100%;
  height: 50px;
}
.contentLayClass {
  width: 30%;
  height: 400px;
  z-index: 9999;
  border: 1px solid grey;
  background-color: white;
  opacity: 0.5;
  position: absolute;
  float: right;
  margin: -30% 70%;
}
.mapBtnClass {
  margin-left: 1%;
  margin-top: 1%;
}
</style>
