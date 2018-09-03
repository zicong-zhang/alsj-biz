<template>
  <div class="v-loading"
    ref="loading"></div>
</template>
<script>
import lottie from "lottie-web";
import loadingConfig from "~tools/lottie-config";

export default {
  name: "v-loading",
  mounted() {
    this.$nextTick(() => {
      lottie.loadAnimation({
        container: this.$refs.loading, // the dom element that will contain the animation
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loadingConfig // the path to the animation json
        // path: '../xxx/data.json'
      });
    });
  }
};
</script>
<style lang="scss">
.v-loading {
  height: 60px;
  line-height: 60px;
}
</style>
