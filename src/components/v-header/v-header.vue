<template>
  <header
    v-bind="$attrs"
    :class="{
      'header-component': true,
      fixed: $attrs.fixed
    }"
  >
    <slot name="back">
      <span class="back-btn btn"
        @click="back">
        <i class="icon i-back"></i>
      </span>
    </slot>
    <slot name="right-two"></slot>
    <h1 :style="{ opacity }">{{ title }}</h1>
    <slot name="right-one"></slot>
  </header>
</template>

<script>
export default {
  name: 'v-header',
  props: {
    title: String,
    backReload: Number,
    opacity: Number,
    iconBg: Boolean,
    onBack: Function
  },
  created() {},
  methods: {
    back() {
      if (this.onBack) return this.onBack();

      this.$utils.back();
    }
  }
};
</script>

<style lang="scss">
.header-component {
  flex: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  background: #fff;
  h1 {
    width: 100%;
    height: 88px;
    line-height: 88px;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
  }
  i {
    font-size: 30px;
    color: #333;
    display: block;
    // width:50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    // background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }
}

.btn {
  position: absolute;
  left: 0;
  z-index: 51;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.back-btn {
  width: 100px;
  padding-left: 36px;
  justify-content: flex-start;
  i {
    font-size: 24px;
  }
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
}
</style>
