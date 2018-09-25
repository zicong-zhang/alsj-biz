<template>
  <div class="v-picker" v-if="isShow">

    <transition name="v-cover">
      <v-cover v-show="isShowContainer" />
    </transition>

    <transition name="v-picker"
      @after-leave="transitionEnd">

      <div class="v-picker-container"
        v-show="isShowContainer"
        @click="cancel">

        <van-picker :show-toolbar="true"
          :title="title"
          :columns="list"
          :value-key="key"
          @cancel="cancel"
          @confirm="confirm" />
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'v-v-picker',
  data() {
    return {
      list: [],
      title: '',
      isShow: true,
      isShowContainer: false,
      key: 'text',
      isShowToolBar: true,
      onCancel: '',
      onConfirm: '',
    };
  },
  methods: {
    transitionEnd(el) {
      this.isShow = false;
    },
    cancel() {
      this.isShowContainer = false;
      if (typeof this.onCancel === 'function') this.onCancel();
    },
    confirm(value, idx) {
      if (typeof this.onConfirm === 'function') this.onConfirm(value, idx);
    },
  },
};
</script>
<style lang="scss">
.v-picker {
  .v-picker-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 32;
  }
  .van-picker {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
  }
  .van-picker__toolbar {
    height: 98px;
    line-height: 98px;
    font-size: 32px;
  }
  .van-picker__cancel,
  .van-picker__confirm {
    color: $main;
    padding: 0 36px;
  }
  .van-picker-column__item--selected {
    color: #333;
  }
}
</style>
