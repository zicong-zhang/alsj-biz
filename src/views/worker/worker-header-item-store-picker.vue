<template>
  <div class="worker-header-item-store-picker">
    <v-cover/>
    <ul class="store-list">
      <li v-for="(item, idx) in 10"
        :key="idx"
        class="list-item">
        <img src="~~img/home/icon_tap_home_normal@2x.png" />
        <h4>壹家壹品天河店</h4>
        <span>22</span>
      </li>
    </ul>
  </div>

</template>
<script>
export default {
  name: "worker-header-item-store-picker"
};
</script>
<style lang="scss">
.worker-header-item-store-picker {
  
}
</style>
