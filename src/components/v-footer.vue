<template>
  <div class="v-footer">
    <ul>
      <li v-for="(item, idx) in list"
        :key="idx"
        :class="{active: routeName === item.routeName}"
        @click="changeActive(item, idx)">
        <i :class="['iconfont', item.icon]"></i>
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "VFooter",
  data() {
    return {
      active: 0,
      list: [
        {
          name: "工作台",
          routeName: "worker",
          icon: "icon-classification"
        },
        {
          name: "消息",
          routeName: "home",
          icon: "icon-btn_product_comment"
        },
        {
          name: "订单",
          routeName: "order",
          icon: "icon-icon_my_orrders"
        }
      ]
    };
  },
  computed: {
    routeName() {
      return this.$route.name;
    }
  },
  methods: {
    changeActive(item, idx) {
      if (this.active === idx) return false;
      this.active = idx;
      this.$store.commit("bb", "on");
      this.$router.push({
        name: item.routeName
      });
    }
  }
};
</script>
<style lang="scss">
.v-footer {
  flex: none;
  height: r(98px);
  background: #fff;
  box-shadow: 0 0 r(20px) 0 #E9ECF4;
  position: relative;
  z-index: 20;
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  li {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: r(98px);
  }
  i {
    font-size: r(42px);
    color: #999;
    margin-bottom: r(8px);
  }
  p {
    font-size: r(20px);
    color: #999;
  }
  .active {
    i {
      color: #39f;
    }
    p {
      color: #39f;
    }
  }
}
</style>
