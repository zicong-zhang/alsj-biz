<template>
  <p class="toast-component"
    v-if="showToast">
    <transition name="toast-component">
      <span v-show="showText">{{ text }}</span>
    </transition>
  </p>
</template>

<script>
export default {
  name: "VToast",
  data() {
    return {
      text: "",
      showToast: false,
      showText: false,
      timer: null
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.toast-component {
  width: 100%;
  height: r(80px);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1100;
  transform: translate(-50%, -50%);
  display: -webkit-box;
  display: flex;
  /* space-around | start | end | center | justify */
  -webkit-box-pack: center;
  justify-content: center;
  span {
    display: inline-block;
    height: r(80px);
    line-height: r(80px);
    background: rgba(0, 0, 0, 0.6);
    border-radius: r(8px);
    font-size: r(24px);
    color: #fff;
    font-weight: normal;
    padding: 0 r(40px);
    margin: 0 auto;
  }
}
/* toast */

.toast-component-enter-active,
.toast-component-leave-active {
  transition: all 0.15s;
}

.toast-component-enter {
  opacity: 0.4;
  transform: translateY(r(30px));
}

.toast-component-leave-active {
  opacity: 0;
}
</style>
