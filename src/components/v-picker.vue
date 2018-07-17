<template>
  <div class="v-picker">
    <div class="cover"
      v-stop-cover
      @click="hidePicker"
      v-show="isShowPicker"></div>

    <div class="label">
      <label v-if="label">{{ label }}</label>
      <transition name="input-warn">
        <p v-show="warn">{{ warn }}</p>
      </transition>
    </div>

    <div class="input-container">
      <p :class="{placeholder: !value}" @click="showPicker">{{ value || $attrs.placeholder }}</p>
      <i class="iconfont icon-bottomnew"></i>
    </div>

    <transition name="v-picker">
      <div class="v-picker-container"
        v-if="isShowPicker">

        <header>
          <div>
            <p class="close-btn"
              @click="hidePicker">
              <i class="iconfont icon-btn_all_close1"></i>
            </p>
            <h5>{{ title }}</h5>
            <p class="save-btn"
              @click="onSelect">
              <span>保存</span>
            </p>
          </div>
          <i class="horizon-bar"></i>
        </header>

        <mt-picker value-key="value"
          :defaultIndex="index"
          :slots="list"
          :visibleItemCount="showQty"
          @change="pickChange"></mt-picker>
      </div>

    </transition>

  </div>
</template>

<script>
export default {
  name: "VPicker",
  props: {
    label: String,
    warn: String,
    list: {
      type: Array
    },
    index: {
      default: 0
    },
    showQty: {
      default: 5
    },
    title: {
      default: ""
    }
  },
  data() {
    return {
      isShowPicker: false,
      value: '',
      select: {}
    };
  },
  methods: {
    showPicker() {
      this.isShowPicker = true;
    },
    hidePicker() {
      this.isShowPicker = false;
    },
    pickChange(picker, valArr) {
      this.select = valArr[0];
    },
    onSelect() {
      this.hidePicker();
      this.value = this.select.value;
      this.$emit("select", this.select);
    }
  }
};
</script>
<style lang="scss">
.v-picker {
  .label {
    display: flex;
    align-items: flex-end;
    padding-top: e(35px);
    padding-bottom: e(24px);
    label {
      font-size: e(24px);
      color: #999;
      margin-right: e(8px);
    }
    p {
      color: #f5594e;
      font-size: e(20px);
    }
  }
  .input-container {
      color: #333;
    position: relative;
    p {
      display: block;
      width: 100%;
      height: e(72px);
      line-height: e(72px);
      font-size: e(24px);
      background: #f5f5f5;
      box-sizing: border-box;
      border: e(1px) solid transparent;
      border-radius: e(8px);
      transition: all 0.2s;
      padding: 0 e(24px);
    }
    i {
      position: absolute;
      right: e(24px);
      top: 50%;
      transform: translateY(-50%);
      color: #c7c7c7;
    }
  }
  .cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 20;
    background: rgba(0, 0, 0, 0.6);
  }
  .placeholder {
    color: #c7c7c7;
  }
}
.v-picker-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 22;
  background: #fff;
  box-shadow: 0 0 e(30px) 0 rgba(0, 0, 0, 0.3);
  padding-bottom: e(36px);
  header {
    margin-bottom: e(36px);
    div {
      height: e(98px);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    p {
      width: e(200px);
      height: e(98px);
      line-height: e(98px);
      display: flex;
      align-items: center;
    }
  }
  .horizon-bar {
    background: #eee;
  }
  h5 {
    font-size: e(32px);
    text-align: center;
    flex: 1;
  }
  .close-btn {
    flex: none;
    padding-left: e(36px);
    i {
      color: #999;
      font-size: e(20px);
    }
  }
  .save-btn {
    justify-content: flex-end;
    flex: none;
    padding-right: e(36px);
    span {
      display: block;
      width: e(120px);
      height: e(48px);
      line-height: e(48px);
      border: 1px solid $main;
      border-radius: e(8px);
      color: $main;
      font-size: e(24px);
      text-align: center;
    }
  }
}
</style>
