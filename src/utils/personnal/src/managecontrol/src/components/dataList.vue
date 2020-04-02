<template>
  <div class="data-list">
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange">
      <ul>
        <li
          class="data-item"
          v-for="listItem in listData"
          :key="listItem.id"
          @click="listItemTap(listItem)"
        >
          {{ listItem.title }}
        </li>
      </ul>
      <div slot="top" class="mint-loadmore-top">
        <span
          v-show="topStatus !== 'loading'"
          :class="{ rotate: topStatus === 'drop' }"
        >
          ↓
        </span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  name: "dataList",
  props: {
    listData: Array
  },
  components: {
    // Group,
    // CellBox
  },
  data() {
    return {
      topStatus: ""
    };
  },
  methods: {
    loadTop() {
      alert(1);
    },
    handleTopChange(status) {
      this.topStatus = status;
    },
    listItemTap(data) {
      this.$emit("childItem", data);
    }
  }
};
</script>
