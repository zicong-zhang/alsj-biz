<template>
  <div class="view-home">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-footer/>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.view-home {
  height: 100%;
  display: flex;
  flex-flow: column;
  & > div {
    &:first-of-type {
      flex:  1;
      // height: 100%;
    }
  }
}
</style>
