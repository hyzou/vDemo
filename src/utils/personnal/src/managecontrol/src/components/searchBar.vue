<template>
  <div class="searchBar">
    <mt-search v-model="value"></mt-search>
  </div>
</template>

<script>
// import { Search } from "vux";

export default {
  name: "searchBar",
  props: {
    listData: Array
  },
  components: {
    // Search
  },
  data() {
    return {
      result: [
        {
          title: "test",
          value: "1"
        }
      ],
      value: "test"
    };
  },
  methods: {
    resultClick(item) {
      window.alert("you click the result item: " + JSON.stringify(item));
    },
    getResult(val) {
      console.log("on-change", val);
    },
    onSubmit() {
      this.$refs.search.setBlur();
      this.$vux.toast.show({
        type: "text",
        position: "top",
        text: "on submit"
      });
    },
    onFocus() {
      console.log("on focus");
    },
    onComplete() {
      console.log("on focus");
    },
    onCancel() {
      console.log("on cancel");
    }
  }
};
</script>
