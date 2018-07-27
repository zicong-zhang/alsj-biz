<template>
  <div class="edit-contract-item-upload">
     <VFormLabel :label="$attrs.label"
        :warn="$attrs.warn" />

      <VUpload :files="$attrs.files"
        :width="160" />
  </div>
</template>

<script>
export default {
  name: 'EditContractItemUpload',
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.edit-contract-item-upload {
  .upload-component {
    margin: 0 -36px;
  }
}
</style>
