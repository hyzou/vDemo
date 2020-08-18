import tableList from "@/components/tableList";
import pagination from "@/components/pagination";
import operateButtonsGroup from "@/components/operateButtonsGroup";
import dialogForm from "@/components/dialog";
import commonTitleWithBorder from "@/components/commonTitleWithBorder";
import formGroup from "@/components/formGroup";
import tabCard from "@/components/tabCard";
import VueUeditorWrap from "vue-ueditor-wrap";
import VueECharts from "vue-echarts";

export default {
  install(Vue) {
    Vue.component("vChart", VueECharts);
    Vue.component("tableList", tableList);
    Vue.component("pagination", pagination);
    Vue.component("operateButtonsGroup", operateButtonsGroup);
    Vue.component("dialogForm", dialogForm);
    Vue.component("commonTitleWithBorder", commonTitleWithBorder);
    Vue.component("formGroup", formGroup);
    Vue.component("tabCard", tabCard);
    Vue.component("vue-ueditor-wrap", VueUeditorWrap);
  }
};
