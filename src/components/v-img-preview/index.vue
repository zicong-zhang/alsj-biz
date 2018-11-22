<template>
  <transition name="zoom">
    <div
      v-if="isShow"
      class="v-img-preview"
    >

      <swiper
        :options="options"
        ref="swiper"
      >
        <swiper-slide
          v-for="(item, idx) in urls"
          :key="idx"
          class="swiper-zoom-container"
        >
          <img :src="item" />
        </swiper-slide>
      </swiper>

      <div class="swiper-pagination"></div>
    </div>
  </transition>

</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'v-img-preview',
  components: {
    swiper,
    swiperSlide
  },
  props: {},
  data() {
    return {
      options: {
        zoom: {
          toggle: false // 不允许双击缩放
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        on: {
          tap: e => {
            this.close();
          }
        }
      },

      isShow: false,
      urls: [],
      closeHandler: ''
    };
  },
  computed: {
    swiper() {
      return this.$refs.swiper.swiper;
    }
  },
  methods: {
    close() {
      this.isShow = false;

      if (this.closeHandler) closeHandler();
    }
  }
};
</script>
<style lang="scss" scoped>
  .v-img-preview {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 1);
  }
  .swiper-container {
    height: 70vh;
  }
  .swiper-slide {
    display: flex;
    align-items: center;
  }
  .swiper-pagination {
    position: absolute;
    left: 50%;
    bottom: 8%;
    transform: translate3d(-50%, 0, 0);
    width: auto;
    color: #fff;
  }
</style>
