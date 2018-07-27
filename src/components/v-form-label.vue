<template>
  <div class="v-form-label">
      <label v-if="label">{{ label }}</label>
      <transition name="input-warn">
        <p v-show="warn">{{ warn }}</p>
      </transition>
    </div>
</template>
<script>
export default {
  name: 'VFormLabel',
  props: {
    label: String,
    warn: [String, Boolean]
  }
}
</script>
<style lang="scss">
.v-form-label {
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
</style>
