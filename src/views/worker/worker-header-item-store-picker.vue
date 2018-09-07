<template>
  <div class="worker-header-item-store-picker">
    <v-cover/>
    <div class="store-list-container">
      <ul v-if="list"
        class="store-list">
        <li v-for="(item, idx) in list"
          :class="{
          active: item.merchantExt.id === storeId, 
          'list-item': true
        }"
          :key="idx"
          @click.stop="select(item)">
          <img src="~~img/home/icon_tap_home_normal@2x.png" />
          <h4>{{ item.merchantExt.merchantName }}</h4>
          <span>{{ item.merchantStaffExt.roleId }}</span>
        </li>
      </ul>
      <div class="create-store-btn">
        <img src="~~img/home/icon_shop_add_blue@2x.png" />
        <span>创建新店铺</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "worker-header-item-store-picker",
  props: {
    list: {
      type: Array
    }
  },
  computed: {
    ...mapState({
      storeId: state => state.root.storeId
    })
  },
  methods: {
    select(item) {
      this.$emit("select", item);
    }
  }
};
</script>
<style lang="scss">
.worker-header-item-store-picker {
  position: fixed;
  top: 112px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  .v-cover {
    top: 113px;
  }
  .store-list-container {
    max-height: 100%;
    background: #fff;
    @include scroll(y);
    position: relative;
    z-index: 31;

  }
  .store-list {
    border-top: 1px solid #eaeaea;

    span {
      flex: none;
      display: block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      color: #fff;
      background: $main;
      border-radius: 50%;
      font-size: 20px;
      text-align-last: center !important;
    }
    img {
      width: 48px;
      height: 48px;
      margin-right: 24px;
    }
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    font-size: 30px;
    border-bottom: 1px solid #eaeaea;
    padding: 0 36px;
    position: relative;
    &:after {
      content: "";
      display: block;
      width: 8px;
      height: 100px;
      background: none;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }
  h4 {
    font-weight: normal;
  }
  .active {
    h4 {
      font-weight: bold;
    }
    &:after {
      background: #404040;
    }
  }
  h4 {
    flex: 1;
  }
  .create-store-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    line-height: 100px;
    font-size: 24px;
    color: $main;
    img {
      width: 24px;
      height: 24px;
    }
    span {
      flex: none;
      margin-left: 0;
      // text-align-last: center;
    }
  }
}
</style>
