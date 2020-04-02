<template>
  <div class="grid-content">
    <div class="grid">
      <template v-for="gridItem in gridList">
        <router-link
          v-if="gridItem.routePath"
          class="grid-item"
          :key="gridItem.id"
          :to="{ path: gridItem.routePath }"
          tag="a"
          @click.native="clickHandle(gridItem.page)"
        >
          <div v-if="gridItem.icon" class="icon-box">
            <iconSvg :iconClass="gridItem.icon" />
          </div>

          <span v-if="gridItem.name">{{ gridItem.name }}</span>
        </router-link>
        <a v-else class="grid-item" :key="gridItem.id"> </a>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name : "gridItem",
    components: {},
    props: {
      gridList: Array
    },
    data() {
      return {
      };
    },
    methods: {
      clickHandle : function(page) {
        this.$store.dispatch('setPage', page);
        localStorage.setItem("appPage",page);
      }
    }
  }
</script>
