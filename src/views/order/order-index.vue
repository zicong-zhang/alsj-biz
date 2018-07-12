<template>
  <div class="order-index">
    <transition :name="$store.state.a">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  name: "OrderIndex",
  data() {
    return {};
  }
};
</script>
