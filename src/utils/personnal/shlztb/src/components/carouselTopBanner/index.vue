<template>
  <div class="carousel-top-banner">
    <el-carousel
      :indicator-position="carouselSrcs.indicatorPosition"
      :height="carouselSrcs.height"
    >
      <el-carousel-item
        class="carousel-top-banner-item"
        v-for="(item, index) in carouselSrcs.carouselSrcs"
        :key="index"
      >
        <!-- <h3>{{ item }}</h3> -->
        <a
          class="displayBlock carousel-top-banner-item-imgbox"
          :href="item.href"
          target="_blank"
          :style="{ backgroundImage: 'url(' + item.picSrc + ')' }"
        ></a>
        <!-- <img :src="item.picSrc" :alt="item.alt"> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "carouselTopBanner",
  props: {
    carouselSrcs: Object
  }
};
</script>
