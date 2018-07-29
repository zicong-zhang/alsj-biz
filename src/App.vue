<template>
  <div id="app"
    v-cloak>
    <transition :name="$store.state.root.turn">
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
      // 排除缓存
      exclude: [
        "OrderEditCustomer", // 编辑客户信息
        "EditHouseType",  // 编辑户型信息
        "OrderDetail", // 订单详情
        "EditContract", // 录入合同信息
      ]
    };
  },
  created() {
  },
  mounted() {}
};
</script>

<style>
</style>
