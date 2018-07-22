
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

      <div class="upload-component">
        <ul>
          <li v-for="(item, idx) in fileList"
            :key="idx">
            <img :src="item.path" />
            <div class="upload-progress"
              v-if="item.progress != 100">
              <p>{{ item.progress }}%</p>
              <span>正在上传</span>
            </div>
          </li>
        </ul>
        <div class="upload-btn">
          <i class="iconfont icon-btn_article_share"></i>
          <span>上传</span>
          <input type="file"
            accept="image/*"
            capture="camera"
            multiple="multiple"
            @change="takePhoto"
            v-if="showFileInput" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import H2 from "./order-detail-item-h2";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "OrderDetailItemContract",
  components: {
    H2
  },
  data() {
    return {
      fileList: [],
      showFileInput: true
    };
  },
  computed: {
    ...mapGetters(["designList", "orderDetailStatus"])
  },
  methods: {
    takePhoto(e) {
      this.showFileInput = false;
      for (const pic of e.target.files) {
        this.compressImg(pic);
      }
    },
    // 判断是否图片
    judgePic(file) {
      // 拦截图片格式
      var type = file.type;
      if (
        type.indexOf("png") == -1 &&
        type.indexOf("jpg") == -1 &&
        type.indexOf("jpeg") == -1
      ) {
        this.showFileInput = true;
        this.$toast("请上传正确的图片");
        return false;
      } else {
        return true;
      }
    },
    compressImg(pic) {
      if (!this.judgePic(pic)) return;
      const len = this.fileList.length;
      this.$set(this.fileList, len, {
        path: window.URL.createObjectURL(pic),
        progress: 0
      });

      var size = pic.size / 1024;
      if (size > 500) {
        this.$utils.photoCompress(pic, (500 / size).toFixed(2), base64Codes => {
          var bl = this.$utils.convertBase64UrlToBlob(base64Codes);
          this.uploadImg(bl, len);
        });
        // 小于500K直接上传
      } else {
        this.uploadImg(pic, len);
      }
    },
    uploadImg(pic, length) {
      this.showFileInput = true;
      let fd = new FormData();
      fd.append("files", pic);
      fd.append(
        "token",
        "YWxhc2dhLmFwcC5nYXRld2F5LTExLTE1MzAxNjUxOTIwNjYtMTEtYWJj"
      );

      axios
        .post("/img", pic, {
          onUploadProgress: progressEvent => {
            // 约0.1s执行一次
            // 实现数字一直加的动画效果
            // https://www.jb51.net/article/131701.htm
            if (progressEvent.lengthComputable) {
              console.log(":_____", progressEvent.loaded, progressEvent.total);
              //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
              //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
              // callback1(progressEvent);
              const { loaded, total } = progressEvent;
              this.fileList[length].progress = parseInt((loaded / total) * 100);
            }
          }
        })
        .then(res => {
          console.log("res:_____", res);
        });
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
    align-items: center;
  }
  li {
    flex: none;
    width: e(240px);
    height: e(160px);
    box-sizing: border-box;
    border: e(2px) solid #e5f2ff;
    border-radius: e(16px);
    margin-right: e(16px);
    position: relative;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: auto;
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
    padding-top: e(22px);
    padding-bottom: e(36px);
}
.upload-component {
  display: flex;
  align-items: center;
  ul {
    padding: 0;
  }
  li {
    border: 4px solid #e5f2ff;
  }
}
.upload-btn {
  flex: none;
  width: 240px;
  height: 160px;
  box-sizing: border-box;
  border: 2px solid #e5f2ff;
  border-radius: 16px;
  background: #e5f2ff;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  i {
    color: #3380cc;
    font-size: 42px;
    margin-bottom: 16px;
  }
  span {
    font-size: 24px;
    color: #3380cc;
  }
  input {
    position: absolute;
    right: 0;
    bottom: 0px;
    width: 150%;
    height: 150%;
  }
}
.upload-progress {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background: RGBA(51, 153, 255, 0.8);
  p {
    font-size: 32px;
    margin-bottom: 12px;
  }
  span {
    color: #fff;
    font-size: 24px;
  }
}
</style>
