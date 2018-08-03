<template>
  <div class="sale-rank-item-empty-module">
    <img src="~~img/sale-rank/icon_null_info_medium.png" />
    <p>暂无数据，继续加油！</p>
  </div>
</template>
<script>
export default {
  name: "sale-rank-item-empty-module"
};
</script>
<style lang="scss">
.sale-rank-item-empty-module {
  height: 272px;
  background: #fff;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  img {
    flex: none;
    width: 80px;
    height: 80px;
    margin-bottom: 24px;
  }
  p {
    color: #8c8c8c;
    font-size: 24px;
  }
}
</style>
