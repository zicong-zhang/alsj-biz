<template>
  <div class="v-date-picker"
    v-if="isShow">

    <transition name="v-cover">
      <v-cover v-show="isShowContainer" />
    </transition>

    <transition name="v-picker"
      @after-leave="transitionEnd">

      <div class="v-datetime-picker-container"
        v-show="isShowContainer"
        @click="onCancel">

        <van-datetime-picker v-model="currentDate"
          :title="title"
          :type="type"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="onCancel"
          @confirm="onConfirm"
          @change="onChange" />
      </div>
    </transition>

  </div>
</template>
<script>
export default {
  name: 'v-date-picker',
  data() {
    return {
      isShow: true,
      isShowContainer: false,
      title: '',
      type: 'date',
      currentDate: '',
      minDate: '', // type: Date
      maxDate: '', // type: Date
      loading: false, // type Boolean
    };
  },
  methods: {
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      }
    },
    transitionEnd(el) {
      this.isShow = false;
    },
    onCancel() {
      this.isShowContainer = false;
      if (typeof this.cancel === 'function') this.cancel();
    },
    onConfirm(value) {
      console.log('value:_____', value);
      if (typeof this.confirm === 'function') this.confirm(value);
    },
    onChange(instance) {
      if (typeof this.change === 'function') this.change();
    },
  },
};
</script>
<style lang="scss">
.v-date-picker {
  .v-datetime-picker-container {
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
