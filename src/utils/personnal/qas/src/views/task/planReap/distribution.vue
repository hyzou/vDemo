<template>
  <div style="position: relative">
    <el-collapse v-model="activeName" accordion @change="show_bar()">
      <div class="float_bar" v-if="bar_show">
        <!--<input type="text" v-model="keyWord"/>-->
        <el-input
          placeholder="请输入内容"
          v-model="keyWord"
          class="map-select"
          size="small"
          clearable
          @clear="remove_all_overlay()"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            class="map-select-icon"
            size="small"
            @click="mapSearch()"
          ></el-button>
        </el-input>
        <el-button
          size="small"
          type="s-tool-btn"
          @click="getAllMarker_rangeSearch('南昌市')"
          >南昌市
        </el-button>
        <el-button
          size="small"
          type="s-tool-btn"
          @click="getAllMarker_rangeSearch('景德镇市')"
          >景德镇
        </el-button>
        <el-button
          size="small"
          type="s-tool-btn"
          @click="getAllMarker_rangeSearch('萍乡市')"
          >萍乡市
        </el-button>
        <el-button
          size="small"
          type="s-tool-btn"
          @click="getAllMarker_rangeSearch('九江市')"
          >九江市
        </el-button>
        <el-button
          size="small"
          type="s-tool-btn"
          @click="getAllMarker_rangeSearch('新余市')"
          >新余市
        </el-button>
        <el-button
          size="small"
          type="s-tool-btn"
          @click="getAllMarker_rangeSearch('鹰潭市')"
          >鹰潭市
        </el-button>
        <el-button
          size="small"
          type="s-tool-btn"
          @click="getAllMarker_rangeSearch('赣州市')"
          >赣州市
        </el-button>
        <el-button
          size="small"
          type="s-tool-btn"
          @click="getAllMarker_rangeSearch('吉安市')"
          >吉安市
        </el-button>
        <el-button
          size="small"
          type="s-tool-btn"
          @click="getAllMarker_rangeSearch('宜春市')"
          >宜春市
        </el-button>
        <el-button
          size="small"
          type="s-tool-btn"
          @click="getAllMarker_rangeSearch('抚州市')"
          >抚州市
        </el-button>
        <el-button
          size="small"
          type="s-tool-btn"
          @click="getAllMarker_rangeSearch('上饶市')"
          >上饶市
        </el-button>
      </div>
      <el-collapse-item name="1">
        <template slot="title">
          <span>精确布点地图</span>
        </template>
        <div id="mapDiv" class="dis_map_container"></div>
      </el-collapse-item>
    </el-collapse>
    <div class="tool-bar bgfff">
      <span class="search_btn">通过地区筛选:</span>
      <el-cascader
        :options="regions"
        :props="{
          expandTrigger: 'hover',
          label: 'text',
          value: 'id',
          checkStrictly: true
        }"
        clearable
        ref="searchArea"
        @change="searchAreaChange"
        placeholder="选择区域"
      ></el-cascader>
      <el-button
        type="primary"
        class="search_btn"
        :disabled="btnDisabled"
        @click="dialog_samp = true"
        >批量指定扦样人
      </el-button>
      <el-button
        type="primary"
        class="search_btn"
        :disabled="btnDisabled"
        @click="dialog_checker = true"
        >批量指定质检人
      </el-button>
      <span class="search_btn">允许偏离半径:</span>
      <el-input-number
        v-model="r"
        controls-position="right"
        :min="1"
        :max="5000"
      ></el-input-number>
    </div>
    <template>
      <el-table
        ref="multipleTable"
        :data="filtedData"
        tooltip-effect="dark"
        style="width: 100%"
        :border="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-if="show" prop="markerId"></el-table-column>
        <el-table-column label="扦样单位/人" width="120">
          <template slot-scope="scope">
            {{ scope.row.performerName || scope.row.samplingOrgName }}
          </template>
        </el-table-column>
        <el-table-column prop="qaOrgName" label="检测单位/人" width="120">
        </el-table-column>
        <el-table-column prop="longitude" label="目的地经度"></el-table-column>
        <el-table-column prop="latitude" label="目的地维度"></el-table-column>
        <el-table-column prop="address" label="目的地地址"></el-table-column>
        <el-table-column prop="deviationRadius" label="允许偏离半径">
        </el-table-column>
        <el-table-column prop="province" label="扦样省"></el-table-column>
        <el-table-column prop="city" label="扦样市"></el-table-column>
        <el-table-column prop="county" label="扦样县(区)"></el-table-column>
        <el-table-column prop="town" label="街道"></el-table-column>
        <el-table-column prop="district" label="district"></el-table-column>
        <el-table-column prop="product" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDtl(scope.$index)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template>
      <div class="block">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="0"
          :layout="$constants.paginationlayout"
          :total="0"
        >
        </el-pagination>
      </div>
    </template>

    <!--批量指定扦样人弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      title="批量指定扦样人"
      :visible.sync="dialog_samp"
      class="dialog_dis"
      v-if="dialog_samp"
      :top="mg_top"
      :width="dilogWith"
      :append-to-body="true"
    >
      <sampler @transfSampler="getSampler" :sourceD="sourceD"></sampler>
    </el-dialog>
    <!--批量指定质检人弹窗-->
    <el-dialog
      :close-on-click-modal="false"
      title="批量指定质检人"
      :visible.sync="dialog_checker"
      class="dialog_dis"
      v-if="dialog_checker"
      :top="mg_top"
      :width="dilogWith"
      :append-to-body="true"
    >
      <checker @transfChecker="getChecker" :sourceD="sourceD"></checker>
    </el-dialog>
  </div>
</template>
<style scoped>
.float_bar {
  position: absolute;
  z-index: 99999;
  width: 100%;
  height: 50px;
  top: 65px;
}

.map-select {
  width: 20%;
  margin-right: 13%;
}

.map-select-icon {
  color: #fff !important;
  background-color: #409eff !important;
}
</style>
<script>
// 引入本地图片
import markerIcon from "@/static/img/dis-icon.png";
import areaJsons from "@/static/js/area.json";
import sampler from "../../common/sampler";
import checker from "../../common/checker";

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
  name: "distribution",
  data() {
    return {
      activeName: "1",
      bar_show: true,
      r: 2000,
      regions: [], //查询地区
      reg: "",
      currentPage: 1,
      tableData: [],
      show: false,
      btnDisabled: true, //true,
      dialog_dis: false,
      dialog_samp: false,
      dialog_checker: false,
      mg_top: "4%",
      dilogWith: "70%",
      selectNum: 0,
      sourceD: "sourceD",
      markers: [],
      polygonarray: [],
      keyWord: "",
      areaColor: "#FFCCCC",
      areaJson: areaJsons
    };
  },
  components: {
    sampler,
    checker
  },
  methods: {
    show_bar() {
      if (1 == this.activeName) {
        this.bar_show = true;
      } else {
        this.bar_show = false;
      }
    },
    handleSelectionChange(val) {
      this.btnDisabled = val.length > 0 ? false : true;
      this.selectNum = val.length;
    },
    loadMap() {
      let T = mapConst.T;
      mapConst.map = new T.Map("mapDiv");
      mapConst.map.centerAndZoom(new T.LngLat(115.82062, 28.68095), 12);
      mapConst.map.addEventListener("click", this.MapClick);
      let LocalSearchOptions = {
        pageCapacity: 10,
        onSearchComplete: this.localSearchResult //回调函数
      };
      mapConst.localsearch = new T.LocalSearch(
        mapConst.map,
        LocalSearchOptions
      );
    },
    MapClick(e) {
      let T = mapConst.T;
      mapConst.icon = new T.Icon({
        iconUrl: markerIcon,
        iconSize: new T.Point(25, 40),
        iconAnchor: new T.Point(10, 25)
      });
      let icon = mapConst.icon;
      let MarkToolOptions = {
        icon: icon,
        follow: true
      };
      let handle = new T.MarkTool(mapConst.map, MarkToolOptions);
      mapConst.handle = handle;
      handle.open();
      handle.addEventListener("mouseup", this.getPointAndMarker);
    },
    getPointAndMarker(e) {
      let marker;
      let T = mapConst.T;
      let p = e.target;
      let point = p.getMarkControlPoint();
      marker = new T.Marker(point, { icon: mapConst.icon });
      let timestamp = new Date().getTime();
      marker.id = timestamp;
      mapConst.marker = marker;
      this.markers.push(mapConst.handle);
      let lnglat = marker.getLngLat();
      mapConst.lnglat = lnglat;
      /*document.getElementById("lnglatStr").value =  lnglat.getLng().toFixed(6) + "," + lnglat.getLat().toFixed(6);*/
      let geocode = new T.Geocoder();
      geocode.getLocation(lnglat, this.searchResult);
    },
    searchResult(result) {
      if (result.getStatus() == 0) {
        var addressComponent = result.getAddressComponent();
        let lnglat = mapConst.lnglat;
        let district =
          addressComponent &&
          addressComponent.addressComponent &&
          addressComponent.addressComponent.county_code
            ? addressComponent.addressComponent.county_code.substring(3)
            : "";
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
        let markerParam = {
          markerId: mapConst.marker.id,
          address:
            province + addressComponent.city + county + result.getAddress(),
          deviationRadius: this.r,
          longitude: lnglat.getLng().toFixed(6),
          latitude: lnglat.getLat().toFixed(6),
          province: province,
          city: addressComponent.city,
          county: county,
          town: addressComponent.poi,
          district: district
        };
        this.tableData.push(markerParam);
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
    },
    handleDtl(index) {
      this.tableData.splice(index, 1);
      let lays = mapConst.map.getOverlays();
      mapConst.map.removeLayer(lays[index]);
    },
    getSampler(samplerParam) {
      const $this = this;
      //指定扦样单位/人
      let multipleTableArray = this.$refs.multipleTable.selection;
      if (multipleTableArray) {
        multipleTableArray.forEach(item => {
          if (samplerParam.activeName === "first") {
            $this.$set(item, "samplingOrgName", samplerParam.samplingOrgName);
            $this.$set(item, "samplingOrgId", samplerParam.samplingOrgId);
            $this.$set(item, "performerName", "");
            $this.$set(item, "performerId", "");
          } else {
            $this.$set(item, "samplingOrgName", "");
            $this.$set(item, "samplingOrgId", "");
            $this.$set(item, "performerName", samplerParam.performerName);
            $this.$set(item, "performerId", samplerParam.performerId);
          }
        });
      }
      this.dialog_samp = false;
    },

    getChecker(checlerParam) {
      const $this = this;
      let multipleTableArray = this.$refs.multipleTable.selection;
      if (multipleTableArray) {
        multipleTableArray.forEach(item => {
          $this.$set(item, "qaOrgName", checlerParam.qaOrgName);
          $this.$set(item, "qaOrgId", checlerParam.qaOrgId);
        });
      }
      this.dialog_checker = false;
    },
    searchAreaChange() {
      let areas = this.$refs["searchArea"].getCheckedNodes();
      let nameArray =
        areas[0] && areas[0].pathLabels ? areas[0].pathLabels : [];
      let areaName = "";
      for (let index in nameArray) {
        areaName += nameArray[index];
      }
      this.reg = areaName;
    },
    mapSearch() {
      mapConst.localsearch.search(this.keyWord);
    },
    getAllMarker_rangeSearch(city) {
      this.load_area_color_city(city);
      //mapConst.localsearch.search(city);
    },
    remove_all_overlay() {
      mapConst.map.clearOverLays();
      mapConst.map.centerAndZoom(
        new mapConst.T.LngLat(115.82062, 28.68095),
        12
      );
      this.keyWord = "";
    },
    localSearchResult(result) {
      mapConst.map.clearOverLays();
      switch (parseInt(result.getResultType())) {
        case 1:
          //解析点数据结果
          this.pois(result.getPois());
          break;
        case 3:
          //解析行政区划边界
          //this.area(result.getArea());
          this.area_color(result.getArea(), this.areaColor);
          break;
      }
    },

    pois(obj) {
      if (obj) {
        //坐标数组，设置最佳比例尺时会用到
        var zoomArr = [];
        for (var i = 0; i < obj.length; i++) {
          //闭包
          (function(i) {
            //名称
            let name = obj[i].name;
            //地址
            let address = obj[i].address;
            //坐标
            let lnglatArr = obj[i].lonlat.split(" ");
            let lnglat = new mapConst.T.LngLat(lnglatArr[0], lnglatArr[1]);
            let winHtml = "名称:" + name + "<br/>地址:" + address;
            let marker = new mapConst.T.Marker(lnglat);
            mapConst.map.addOverLay(marker);
            let markerInfoWin = new mapConst.T.InfoWindow(winHtml, {
              autoPan: true
            });
            marker.addEventListener("click", function() {
              marker.openInfoWindow(markerInfoWin);
            });

            zoomArr.push(lnglat);

            let a = document.createElement("a");
            a.href = "javascript://";
            a.innerHTML = name;
            a.onclick = function() {
              this.showPosition(marker, winHtml);
            };
          })(i);
        }
        mapConst.map.setViewport(zoomArr);
      }
    },
    /*  showPosition(marker, winHtml) {
              var markerInfoWin = new mapConst.T.InfoWindow(winHtml, { autoPan: true });
              marker.openInfoWindow(markerInfoWin);
            },*/

    showPosition(marker, name) {
      let infoWin;
      if (infoWin) {
        mapConst.map.removeOverLay(infoWin);
        infoWin = null;
      }
      let html = "<h5>" + name + "</h5>";
      infoWin = new mapConst.T.InfoWindow(html, new mapConst.T.Point([0, 0]));
      marker.openInfoWindow(infoWin);
    },
    area(obj) {
      if (obj) {
        if (obj.lonlat) {
          let regionArr = obj.lonlat.split(",");
          let pLngLat = new mapConst.T.LngLat(regionArr[0], regionArr[1]);
          mapConst.map.panTo(pLngLat);
          let sContent = "<h3>" + obj.name + "</h3>";
          mapConst.map.centerAndZoom(pLngLat, 12);
          let infoWindow = new mapConst.T.InfoWindow(sContent);
          mapConst.map.openInfoWindow(infoWindow, pLngLat); //开启信息窗口
        }
      }
    },
    load_area_color_city(city) {
      let data = this.areaJson;
      let color = this.areaColor;
      let name = data[city];
      this.area_color(name.area, color);
    },
    area_color(obj, color) {
      if (obj) {
        if (obj.points) {
          //坐标数组，设置最佳比例尺时会用到
          for (let i in this.polygonarray) {
            mapConst.map.removeOverLay(this.polygonarray[i]);
          }
          let pointsArr = [];
          let points = obj.points;
          for (let i = 0; i < points.length; i++) {
            let regionLngLats = [];
            let regionArr = points[i].region.split(",");
            for (var m = 0; m < regionArr.length; m++) {
              var lnglatArr = regionArr[m].split(" ");
              var lnglat = new mapConst.T.LngLat(lnglatArr[0], lnglatArr[1]);
              regionLngLats.push(lnglat);
              pointsArr.push(lnglat);
            }
            //创建面对象
            mapConst.polygon = new mapConst.T.Polygon(regionLngLats, {
              color: "blue",
              weight: 1,
              opacity: 0.2,
              fillColor: color,
              fillOpacity: 0.5,
              showLabel: false
            });
            mapConst.map.addOverLay(mapConst.polygon);
            let regionArr2 = obj.lonlat.split(",");
            let pLngLat = new mapConst.T.LngLat(regionArr2[0], regionArr2[1]);
            mapConst.map.centerAndZoom(pLngLat, 8);
            this.polygonarray.push(mapConst.polygon);
            /*polygon.addEventListener("click", function PolygonClick(e) {
                                        var p = e.target;
                                        console.log(p)
                                        alert("您点击了面------"+obj.name);
                                    });*/
          }
        }
      }
    }
  },
  mounted: function() {
    this.loadMap();
  },

  created() {
    this.regions = this.$store.getters.get_areaLevel;
  },
  props: {
    link: {
      type: String,
      default: ""
    }
  },
  computed: {
    filtedData() {
      return this.tableData.filter(item => {
        return !this.reg || item.address.indexOf(this.reg) > -1;
      });
    }
  }
};
</script>
