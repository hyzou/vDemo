<template>
  <div>
    <mt-cell
      :title="mySelectOption.cellTitle"
      :icon="mySelectOption.cellIcon"
      :value="mySelectOption.cellValue"
      @click.native="onCellClick"
    ></mt-cell>
    <mt-popup v-model="popupVisible" position="bottom" class="width100">
      <mt-picker
        :slots="mySelectOption.slots"
        @change="onValuesChange"
        :valueKey="mySelectOption.valueKey"
      ></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: "mySelect",
  props: {
    mySelectOption: {
      type: Object,
      default() {
        return {
          cellTitle: "标题文字",
          cellIcon: "more",
          cellValue: "▼",
          valueKey: "",
          slots: [
            {
              flex: 1,
              values: [
                "2015-01",
                "2015-02",
                "2015-03",
                "2015-04",
                "2015-05",
                "2015-06"
              ],
              className: "slot1",
              textAlign: "right"
            },
            {
              divider: true,
              content: "-",
              className: "slot2"
            },
            {
              flex: 1,
              values: [
                "2015-01",
                "2015-02",
                "2015-03",
                "2015-04",
                "2015-05",
                "2015-06"
              ],
              className: "slot3",
              textAlign: "left"
            }
          ]
        };
      }
    }
  },
  data() {
    return {
      popupVisible: false
    };
  },
  methods: {
    onCellClick() {
      this.popupVisible = true;
    },
    onValuesChange: function(picker, values) {
      this.$emit("myselectChange", values);
    }
  }
};
</script>
