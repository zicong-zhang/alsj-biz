<template>
  <div id="app"
    v-cloak>
    <transition :name="$store.state.turn">
      <keep-alive :exclude="exclude">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // 排除缓存路由
      exclude: ["OrderEditCustomer"]
    };
  },
  created() {},
  mounted() {}
};
</script>

<style>
</style>
