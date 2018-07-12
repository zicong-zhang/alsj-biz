<template>
  <div class="v-popup">
    <div class="popup-cover"
      v-stop-cover></div>
    <ul>
      <li v-for="(item, idx) in list"
        :key="idx"
        @click.stop="select(item)">
        <p>{{ item }}</p>
        <!-- <i class="horizon-bar"></i> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "VPopup",
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    select(item) {
      this.$emit('select', item);
    }
  }
};
</script>
<style lang="scss" scoped>
.v-popup {
  .popup-cover {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
  }
  ul {
    position: absolute;
    right: r(36px);
    bottom: 0;
    z-index: 20;
    transform: translateY(100%);
    width: r(264px);
    background: #fff;
    box-shadow: 0 0 r(20px) 0 rgba(0, 0, 0, 0.3);
    border-radius: r(12px);
    &:before {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border: r(10px) solid transparent;
      border-bottom-color: #fff;
      position: absolute;
      right: r(24px);
      top: 0;
      transform: translateY(-100%);
    }
  }
  li {
    height: r(80px);
    font-size: r(24px);
    color: #404040;
    border-bottom: 1px solid #f5f5f5;
    padding-left: r(36px);
  }
  p {
    line-height: r(80px);
  }
}
</style>
