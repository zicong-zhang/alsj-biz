<template>
  <p class="toast-component"
    v-if="showToast">
    <transition name="toast-component"
      @after-leave="transitionEnd">
      <span v-show="showText">{{ text }}</span>
    </transition>
  </p>
</template>

<script>
export default {
  name: 'VToast',
  data() {
    return {
      text: '',
      showText: false,
      showToast: true,
      timeout: 1500,
      resolve: '',
    };
  },
  mounted() {},
  methods: {
    onShowText(text) {
      this.text = text;
      this.showText = true;
      this.bindTimeout();
    },
    bindTimeout() {
      let timer = setTimeout(() => {
        this.showText = false;
      }, this.timeout);

      this.$once('hook:beforeDestroy', () => {
        clearTimeout(timer);
        timer = null;
      });
    },
    transitionEnd() {
      this.resolve();
      this.showToast = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.toast-component {
  width: 100%;
  height: r(80px);
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2200;
  transform: translate(-50%, -50%);
  display: flex;
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
  transform: translateY((30px));
}

.toast-component-leave-active {
  opacity: 0;
}
</style>
