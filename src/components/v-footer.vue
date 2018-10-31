<template>
  <div class="v-footer">
    <ul>
      <li v-for="(item, idx) in list"
        :key="`home-footer${idx}`"
        :class="{
          active: routeName === item.routeName
        }"
        @click="changeActive(item, idx)">
        <img v-if="routeName === item.routeName" :src="item.iconActive" />
        <img v-else :src="item.icon" />
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import * as types from '~vuex/mutation-types';

export default {
  name: 'VFooter',
  data() {
    return {
      list: [
        {
          name: '工作台',
          routeName: 'worker',
          icon: require('~img/home/icon_tap_home_normal@2x.png'),
          iconActive: require('~img/home/icon_tap_home_press@2x.png')
        },
        {
          name: '消息',
          routeName: 'test-pulldown',
          icon: require('~img/home/icon_tap_msg_normal@2x.png'),
          iconActive: require('~img/home/icon_tap_msg_press@2x.png')
        },
        {
          name: '订单',
          routeName: 'order-list',
          icon: require('~img/home/icon_tap_user_normal@2x.png'),
          iconActive: require('~img/home/icon_tap_user_press@2x.png')
        }
      ]
    };
  },
  computed: {
    routeName() {
      return this.$route.name;
    }
  },
  created() {
  },
  methods: {
    changeActive(item) {
      console.log('item.routeName, idx:_____', item.routeName, this.routeName);
      if (this.routeName === item.routeName) return false;
      this.$store.commit(types.TURN, '');
      this.$router.push({
        name: item.routeName
      });
    }
  }
};
</script>
<style lang="scss">
.v-footer {
  flex: none;
  height: r(98px);
  background: #fff;
  box-shadow: 0 0 r(20px) 0 #e9ecf4;
  position: relative;
  z-index: 20;
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  li {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: r(98px);
  }
  img {
    width: 48px;
    height: 48px;
    margin-bottom: 8px;
  }
  i {
    font-size: r(42px);
    color: #999;
    margin-bottom: r(8px);
  }
  p {
    font-size: r(20px);
    color: #999;
  }
  .active {
    i {
      color: #39f;
    }
    p {
      color: #39f;
    }
  }
}
</style>
