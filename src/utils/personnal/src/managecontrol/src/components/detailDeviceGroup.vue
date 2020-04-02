<template>
  <div class="detail-device-group flex-box">
    <div
        class="detail-controller-box"
        v-for="(detail, index) in showData"
        :key="detail.deviceId"
        @click="switchWindowTap(index, detail.controllerStatus.status)"
    >
      <div class="detail-controller-title">
        <div>{{ detail.deviceName }}
          <div class="checkboxItem">
            <span :class="{ 'checkboxItem-active': detail.isChecked }"></span>
          </div>
        </div>
          <div>状态：
            <template v-for="status in detail.statusList">
              <span class="oprate-status"
                    v-if="detail.controllerStatus.status == status.type"
                    :key="status.type"
              >{{ status.value }}</span>
            </template>
          </div>
        <div
            v-if=supportDescriptor.temperature
        >设定温度:
          <span class="oprate-status">
            {{detail.controllerStatus.setTemperature ? detail.controllerStatus.setTemperature : '—'}}℃
          </span>
        </div>
        <div
            v-if=supportDescriptor.set
        >回风温度:
          <span class="oprate-status">
            {{detail.controllerStatus.windTemperature ? detail.controllerStatus.windTemperature : '—'}}℃
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'detailDeviceGroup',
        props: {
            showData: Array,
            supportDescriptor: Object
        },
        methods: {
            switchWindowTap (index, status) {
                this.$emit ('deviceCheck', index, status);
            }
        }
    };
</script>
