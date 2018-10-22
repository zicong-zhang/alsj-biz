<template>
  <div class="v-cover"
    @click="$emit('click', $event)"
    v-stop-cover></div>
</template>

<script>
export default {
  name: 'VCover'
};
</script>

<style lang="scss">
.v-cover {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 31;
  background: rgba(0, 0, 0, 0.6);
}
</style>
