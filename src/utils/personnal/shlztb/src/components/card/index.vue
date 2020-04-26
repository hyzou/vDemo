<template>
  <div class="card">
    <el-card shadow="never" class="card-container">
      <div slot="header" class="card-container-header pr20 clearfix">
        <span class="card-container-header-title clearfix">
          <div
            class="card-container-header-title-seperator mt6 mr15 floatLeft"
          ></div>
          <span class="card-container-header-title-text floatLeft">{{
            cardlistsData.cardlistTitle
          }}</span>
        </span>
        <el-button
          class="card-container-header-operateBtn pt0 pb0 mt6 floatRight"
          type="text"
          @click="
            detailOperateTap(
              cardlistsData.cardType,
              cardlistsData.cardlistTitle
            )
          "
        >
          {{ cardlistsData.cardlistOperation }}
        </el-button>
      </div>
      <div
        v-for="(cardItem, index) in cardlistsData.cardlistsArray"
        :key="index"
        class="card-container-item pt6 pb6 clearfix"
        @click="
          detailItemTap(
            cardItem,
            cardlistsData.cardlistTitle,
            cardlistsData.cardType
          )
        "
      >
        <el-col
          :span="16"
          class="card-container-item-text textEllipsis clearfix pl0"
        >
          <div
            class="card-container-item-text-icon mr10 displayInlineBlock"
          ></div>
          <div class="textEllipsis displayInline vAlignTop">
            {{ cardItem.title }}
          </div>
        </el-col>
        <el-col
          v-if="!cardItem.downloadFlag"
          :span="8"
          class="card-container-item-date textAlignRight"
        >
          {{ cardItem.showTime }}
        </el-col>
        <el-col
          v-else
          :span="8"
          class="card-container-item-download textAlignRight"
        >
          [下载]
        </el-col>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    cardlistsData: Object
  },
  methods: {
    detailOperateTap(type, title) {
      this.$emit("detailOperateTap", type, title);
    },
    detailItemTap(item, title, type) {
      let fileId = "";
      if (item.file && item.file.fileId) {
        fileId = item.file.fileId || "";
      }
      this.$emit(
        "detailItemTap",
        item.sysId,
        item.downloadFlag,
        fileId,
        title,
        type
      );
    }
  }
};
</script>
