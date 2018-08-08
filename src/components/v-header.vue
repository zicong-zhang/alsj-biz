<template>
  <header :class="{'header-component': true, fixed: $attrs.fixed }"
    v-bind="$attrs">
    <slot name="back">
      <span class="back-btn btn"
        v-finger:tap="back">
        <i class="iconfont icon-back"></i>
      </span>
    </slot>
    <slot name="right-two"></slot>
    <h1 :style="{ opacity }">{{ title }}</h1>
    <slot name="right-one"></slot>
  </header>
</template>

<script>
export default {
  name: "VHeader",
  props: {
    title: {
      type: String
    },
    "back-reload": {
      type: Number
    },
    opacity: {
      type: Number
    },
    iconBg: {
      type: Boolean
    }
  },
  methods: {
    back() {
      this.$store.commit("TURN", "off");
      this.$router.back(-1);
    }
  }
};
</script>

<style lang="scss">
.header-component {
  display: -webkit-box;
  display: flex;
  /* space-around | start | end | center | justify */
  -webkit-box-pack: justify;
  justify-content: space-between;
  /* start | end | center | baseline | stretch */
  -webkit-box-align: center;
  align-items: center;
  height:88px;
  h1 {
    width: 100%;
    height:88px;
    line-height:88px;
    font-size:32px;
    font-weight: bold;
    background: #fff;
    // color: $font;
    text-align: center;
  }
  i {
    font-size:30px;
    color: #333;
    display: block;
    // width:50px;
    height:50px;
    line-height:50px;
    text-align: center;
    // background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }
}

.btn {
  position: absolute;
  left: 0;
  z-index: 51;
  height:88px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.back-btn {
  width:100px;
  padding-left:36px;
  justify-content: flex-start;
  i {
    font-size:24px;
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
