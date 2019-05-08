<template>
  <div class="view-login">
    <!-- <span class="close-button"><i class="icon i-guanbi"></i></span> -->

    <img
      src="~~img/login/icon_loginin_logo@2x.png"
      class="logo"
    >
    <h2 class="slogan">做家具定制生意，上阿拉私家</h2>

    <form class="login-form">

      <!-- 手机号 -->
      <label class="login-form-input-wrapper">
        <i class="icon i-shouji"></i>
        <input
          class="login-form-input"
          type="text"
          v-model="phone"
          placeholder="请输入手机号"
          maxlength="11"
          @input="limit('phone')"
        />
        <i
          class="icon i-guanbi"
          v-button
          @click="empty"
        ></i>
      </label>

      <!-- 验证码 -->
      <label class="login-form-input-wrapper">
        <i class="icon i-mima"></i>
        <input
          class="login-form-input captcha"
          type="text"
          v-model="captcha"
          placeholder="请输入验证码"
          maxlength="4"
          @input="limit('captcha')"
        />
      </label>

      <span
        class="login-form-submit-button"
        v-button
        @click="submit"
      >登录</span>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import utils from '~tools/utils';

export default {
  name: 'view-login',
  data() {
    return {
      phone: '15812345678',
      captcha: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    limit(type) {
      const text = this[type];
      this[type] = utils.limitInput(text, 'number');
    },
    empty() {
      this.phone = '';
    },
    submit() {
      const phone = this.phone;
      const captcha = this.captcha;

      if (!phone) return this.$Toast('请输入手机号');
      if (!utils.regExpText(phone, 'mobile')) return this.$Toast('请输入正确的手机号');
      if (!captcha) return this.$Toast('请输入验证码');

      this.login({
        phone,
        captcha
      }).then(() => {
        this.$utils.go({
          path: '/'
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  .view-login {
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
    padding-top: 120px;
  }
  .close-button {
    position: absolute;
    left: 36px;
    top: 36px;
    width: 48px;
    height: 48px;
    .icon:before {
      font-size: 48px;
      opacity: 0.3;
    }
  }
  .logo {
    width: 176px;
    height: auto;
    margin-bottom: 22px;
  }
  .slogan {
    font-size: 24px;
    color: $main;
    font-weight: normal;
    margin-bottom: 96px;
  }
  .login-form {
    display: flex;
    flex-flow: column;
    align-items: center;

    &-input-wrapper {
      position: relative;
      display: flex;
      justify-content: space-between;
      width: 630px;
      height: 88px;
      line-height: 88px;
      background: #f0f0f0;
      box-sizing: border-box;
      border-radius: 44px;
      font-size: 30px;
      padding-left: 78px;
      padding-right: 40px;
      margin-bottom: 24px;
      &:nth-of-type(2) {
        margin-bottom: 72px;
      }
      .icon {
        position: absolute;
        top: 50%;
        left: 36px;
        transform: translate(-50%, -50%);
        font-size: 32px;
        color: $font;
      }
      .i-guanbi {
        top: calc(50% + 2px);
        right: 0px;
        left: auto;
        width: 50px;
        text-align: right;
        font-size: 32px;
        padding: 10px;
        &:before {
          opacity: 0.2;
        }
      }
    }

    &-input {
      display: block;
      flex: 1;
      background: #eee;
      color: $font;
    }
    &-submit-button {
      width: 630px;
      height: 88px;
      line-height: 88px;
      background: $main;
      border-radius: 44px;
      color: #fff;
      text-align: center;
      font-size: 30px;
    }
  }
</style>
