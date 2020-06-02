import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import dialogForm from "@/components/dialog";
import formGroup from "@/components/formGroup";
import { videoPlayer } from "vue-video-player";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  install(Vue) {
    Vue.component("tableList", tableList);
    Vue.component("pagination", pagination);
    Vue.component("operateButtonsGroup", operateButtonsGroup);
    Vue.component("dialogForm", dialogForm);
    Vue.component("formGroup", formGroup);
    Vue.component("videoPlayer", videoPlayer);
    Vue.component("vue-ueditor-wrap", VueUeditorWrap);
    Vue.component("chart", ECharts);
  }
};
