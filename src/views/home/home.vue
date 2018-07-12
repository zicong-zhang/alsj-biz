<template>
  <div class="view-home">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <VFooter/>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.view-home {
  height: 100%;
  display: flex;
  flex-flow: column;
  & > div {
    &:first-of-type {
      height: 100%;
    }
  }
}
</style>
