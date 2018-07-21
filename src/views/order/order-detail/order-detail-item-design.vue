
<template>
  <div class="order-detail-item-design"
    v-if="orderDetailStatus >= 2">
    <H2 title="上传设计方案"></H2>

    <div class="design-list">
      <ul>
        <li v-for="(item, idx) in designList"
          :key="idx">
          <img :src="item" />
        </li>
      </ul>
      <cube-upload-file v-for="(file, i) in files"
        :file="file"
        :key="i"></cube-upload-file>

      <cube-upload ref="upload"
        :max="50"
        :action="action"
        :multiple="false"
        v-model="files"
        :process-file="processFile"
        @file-success="success"
        @files-added="addedHandler"
        @file-submitted="fileSubmitted"
        @file-error="errHandler"></cube-upload>
    </div>
  </div>
</template>

<script>
import H2 from "./order-detail-item-h2";
import { mapGetters } from "vuex";

export default {
  name: "OrderDetailItemContract",
  components: {
    H2
  },
  data() {
    return {
      action: {
        target: "http://test.alasga.cn/proxy/web/gateway/api/upload",
        prop: "fd"
      },
      files: []
    };
  },
  computed: {
    ...mapGetters(["designList", "orderDetailStatus"])
  },
  methods: {
    filesAdded(files) {
      let hasIgnore = false;
      const maxSize = 1 * 1024 * 1024; // 1M
    },
    addedHandler() {
      const file = this.files[0];
      console.log("this.files:_____", this.files);
      file && this.$refs.upload.removeFile(file);
    },
    // 此处进行压缩， next回调传入处理后的file对象
    processFile(file, next) {
      console.log("file:_____", file);
      const size = file.size / 1024;
      if (size > 500) {
        this.$utils.photoCompress(
          file,
          (500 / size).toFixed(2),
          base64Codes => {
            var bl = utils.convertBase64UrlToBlob(base64Codes);
            console.log("bl:_____", bl);
            next(bl);
          }
        );
      } else {
        console.log("fi:_____");
        let fd = new FormData();
        fd.append("files", file);
        /* fd.append("token", 'YWxhc2dhLmFwcC5nYXRld2F5LTExLTE1MzAxNjUxOTIwNjYtMTEtYWJj'); */
        file.fd = fd;
        next(file);
      }
    },
    fileSubmitted(file) {
      console.log("fileSubmitted, file:_____", file);
      let fd = file.file.fd;
      console.log('fd.get("filse"):_____', fd.get("files"));
      console.log('fd.get("token"):_____', fd.get("token"));
      file.fd = file.file.fd;
    },
    success(a, b, c) {
      console.log("a, b, c:_____", a, b, c);
    },
    errHandler(file) {
      console.log("file:___eee__", file);
      // const msg = file.response.message
      this.$createToast({
        type: "warn",
        txt: "Upload fail",
        time: 1000
      }).show();
    }
  }
};
</script>

<style lang="scss">
.order-detail-item-design {
  background: #fff;
  padding: 0 e(36px);
  margin-bottom: e(16px);
  span {
    color: $main;
  }
  ul {
    display: flex;
    padding-top: e(22px);
    padding-bottom: e(36px);
  }
  li {
    flex: none;
    width: e(240px);
    height: e(160px);
    box-sizing: border-box;
    border: e(2px) solid #e5f2ff;
    border-radius: e(16px);
    margin-right: e(16px);
    margin-bottom: e(16px);
    position: relative;
    overflow: hidden;
  }
  img {
    width: auto;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.design-list {
  width: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
}
</style>
