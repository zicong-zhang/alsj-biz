<template>
  <div class="v-loading"
    ref="loading"></div>
</template>
<script>
/**
 * doc
 * https://github.com/airbnb/lottie-web
 */
import lottie from 'lottie-web';
import loadingConfig from '~tools/lottie-config';

export default {
  name: 'v-loading',
  props: {
    autoplay: {
      default: true
    },
    play: {
      default: false
    }
  },
  data() {
    return {
      lottie: ''
    };
  },
  watch: {
    play(newVal) {
      if (newVal) {
        this.lottie.play();
      } else {
        this.lottie.stop();
      }
    }
  },
  mounted() {
    const config = {
      container: this.$refs.loading, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: this.autoplay,
      animationData: loadingConfig
      // path: '../xxx/data.json'
    };
    this.lottie = lottie.loadAnimation(config);
    this.$once('hook:beforeDestroy', () => this.lottie.destroy());
  }
};
</script>
<style lang="scss">
.v-loading {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 46px !important;
    line-height: 46px;
  }
}
</style>
