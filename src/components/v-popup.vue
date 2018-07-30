<template>
  <div class="v-popup">
    <div class="popup-cover"
      v-stop-cover></div>
    <ul>
      <li v-for="(item, idx) in list"
        :key="`v-popup${idx}`"
        @click.stop="select(item, idx)">
        <p>{{ showValue(item) }}</p>
        <!-- <i class="horizon-bar"></i> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "VPopup",
  props: {
    list: {
      type: Array,
      required: true
    },
    textOne: String,
    textTwo: String
  },
  data() {
    return {
    }
  },
  methods: {
    select(item, idx) {
      this.$emit('select', item, idx);
    },
    showValue(item) {
      switch(true) {
        case !!this.textTwo:
          return item[this.textOne][this.textTwo];
        case !!this.textOne:
          return item[this.textOne];
        default:
          return item;
      }
    }
  }
};
</script>
<style lang="scss">
.v-popup {
  .popup-cover {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
  }
  ul {
    position: absolute;
    right: 36px;
    bottom: 0;
    z-index: 20;
    transform: translateY(100%);
    width: 264px;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    &:before {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-bottom-color: #fff;
      position: absolute;
      right: 24px;
      top: 0;
      z-index: 10;
      transform: translateY(-95%);
    }
  }
  li {
    height: 80px;
    font-size: 24px;
    color: #404040;
    border-bottom:e(1px) solid #f5f5f5;
    padding-left: 36px;
  }
  p {
    line-height: 80px;
  }
}
</style>
