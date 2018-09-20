<template>
  <div class="v-img">
    <transition name="v-img">
      <img class="loaded"
        :src="src"
        v-if="status === 'loaded'"
        key="loaded" />
      <img class="loading"
        :src="loadingImg"
        v-else-if="status === 'loading'"
        key="loading" />
      <img class="error"
        :src="errorImg"
        v-else-if="status === 'error'"
        key="error" />
    </transition>
  </div>
</template>
<script>
export default {
  name: 'v-img',
  props: {
    src: {
      type: String
    },
    errorImg: {
      type: String
    },
    type: {
      type: String,
      default: 'logo'
    }
  },
  data() {
    return {
      status: 'before'
    };
  },
  computed: {
    loadingImg() {
      switch(this.type) {
        case 'logo':
          return require('~img/placeholder/store_logo.png');
      }
    }
  },
  created() {
    this.status = 'loading';
    this.loadImg();
  },
  methods: {
    loadImg() {
      let img = new Image();
      img.src = this.src;
      img.onload = () => {
        this.status = 'loaded';
      };
      img.onerror = () => {
        if (!this.error) this.error = this.loading;
        this.status = 'error';
      };
    }
  }
};
</script>
<style lang="scss">
.v-img {
  display: inline-block;
  flex: none;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100%;
    height: auto;
  }
}
</style>
