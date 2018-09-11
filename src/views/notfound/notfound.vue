<template>
  <div class="view-notfound">
    <v-header />
    <div class="content">
      <img src="~~img/404/image_error_blue@2x.png" />
      <p>出错啦！你访问的页面不见了</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "view-notfound"
};
</script>
<style lang="scss">
.view-notfound {
  .content {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 312px;
      height: auto;
      padding-top: 300px;
      margin-bottom: 48px;
    }
    p {
      font-size: 24px;
      color: #8c8c8c;
    }
  }
}
</style>
