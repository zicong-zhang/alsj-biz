<template>
  <div id="app"
    v-cloak>
    <transition :name="$store.state.a">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
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
