<template>
  <div id="app"
    v-cloak>
    <transition :name="$store.state.turn">
      <keep-alive v-if="$route.meta.keep" :key="$route.name">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else :key="$route.name"></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: "App",
  created() {},
  mounted() {
  }
};
</script>

<style>
</style>
