<template>
  <div class="upload-component"
    ref="uploader">
    <div class="upload-wrapper">

      <!-- 图片列表 -->
      <ul v-if="fileList.length">
        <li v-for="(item, idx) in fileList"
          :key="idx"
          :style="{width: $rem(width)}">
          <i class="iconfont icon-btn_all_close1 upload-del-btn"
            @click.prevent="showDelPicDialog(idx)"></i>

          <div class="img-container"
            @click="showPicPreview(idx)">
            <img :src="item.path" />
          </div>
          <div class="upload-progress"
            v-if="item.hasOwnProperty('progress') && item.progress !== 100">
            <p>{{ item.progress }}%</p>
            <span>正在上传</span>
          </div>
        </li>
      </ul>
      <div class="upload-btn"
        v-if="showBtn"
        :style="{width: $rem(width), paddingLeft: fileList.length ? 0 : $rem(36)}">
        <p @click="showPhoto = true">
          <i class="iconfont icon-btn_article_share"></i>
          <span>上传</span>
        </p>

      </div>
    </div>

    <!-- 上传图片菜单 -->
    <div class="photo-menu">
      <div class="photo-menu-cover"
        v-if="showPhoto"
        @click="hidePhotoMenu"></div>
      <transition name="photo-menu">
        <div class="photo-menu-container"
          v-show="showPhoto">
          <div class="photo-menu-btn">
            <h5>拍照</h5>
            <input type="file"
              accept="image/*"
              capture="camera"
              multiple="multiple"
              @change="takePhoto"
              @click="hidePhotoMenu"
              v-if="showFileInput" />
          </div>

          <div class="photo-menu-btn">
            <h5>从相册中选择</h5>
            <input type="file"
              accept="image/*"
              multiple="multiple"
              @change="takePhoto"
              @click="hidePhotoMenu"
              v-if="showFileInput" />
          </div>
          <p class="photo-menu-cancel-btn"
            @click="hidePhotoMenu">取消</p>
        </div>
      </transition>
    </div>

    <!-- 提示弹窗 -->
    <VDialog :show.sync="isShowDelDialog"
      title="提示"
      content="确定要删除这张图片？"
      @confirm="delPic"
      @cancel="cancelDialog"
      :show-cancel="true" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VUpload",
  props: {
    asyncQty: {
      default: 3
    },
    width: {
      type: Number,
      default: 240
    },
    showBtn: {
      default: true
    },
    showFile: {
      default: true
    },
    files: {
      default: []
    }
  },
  data() {
    return {
      showFileInput: true,
      showPhoto: false,
      fileList: [],
      isShowDelBtn: false,
      isShowDelDialog: false,
      delPicIdx: ""
    };
  },
  watch: {
    files(newVal) {
      this.fileList = newVal.map(item => {
        return {
          path: item
        };
      });
    }
  },
  created() {
    this.fileList = this.files.map(item => {
        return {
          path: item
        };
      });
  },
  methods: {
    // 隐藏菜单
    hidePhotoMenu() {
      this.showPhoto = false;
    },
    takePhoto(e) {
      this.showFileInput = false;
      this.showPhoto = false;
      let count = 0;
      for (const pic of e.target.files) {
        count++;
        if (count > this.asyncQty) break;
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
    // 压缩图片
    compressImg(pic) {
      if (!this.judgePic(pic)) return;
      const len = this.fileList.length;
      this.$set(this.fileList, len, {
        path: "",
        progress: 0
      });

      const size = pic.size / 1024;
      // 大于500K压缩
      if (size > 500) {
        this.$utils.photoCompress(pic, (500 / size).toFixed(2), base64Codes => {
          var bl = this.$utils.convertBase64UrlToBlob(base64Codes);
          this.uploadImg(bl, len);
        });
      } else {
        this.uploadImg(pic, len);
      }
    },
    // 图片上传
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
            if (progressEvent.lengthComputable) {
              //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
              //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
              const { loaded, total } = progressEvent;
              this.fileList[length].progress = parseInt(loaded / total * 100);
            } else {
              this.fileList[length].progress = 100;
            }
          }
        })
        .then(res => {
          let uploader = this.$refs.uploader;
          uploader.scrollLeft = uploader.scrollWidth - uploader.clientWidth;
          this.fileList[length].path = res[0];
          this.$emit("success", res[0]);
        });
    },
    // 查看大图
    showPicPreview(idx) {
      this.$createImagePreview({
        imgs: this.fileList.map(item => item.path),
        "initial-index": idx,
        loop: false
      }).show();
    },
    // 弹出删除图片对话框
    showDelPicDialog(idx) {
      this.isShowDelDialog = true;
      this.delPicIdx = idx;
    },
    // 取消弹出弹窗
    cancelDialog() {
      this.delPicIdx = "";
      this.isShowDelDialog = false;
    },
    // 删除图片
    delPic(idx) {
      this.isShowDelDialog = false;
      this.$emit("on-del", this.delPicIdx);
    }
  }
};
</script>

<style lang="scss">
.upload-component {
  ul {
    display: flex;
    padding: 0;
    padding-left: 36px;
  }
  li {
    width: 240px;
    height: 160px;
    border: 4px solid #e5f2ff;
    border-radius: 16px;
    box-sizing: border-box;
    margin-right: 16px;
    position: relative;
  }
  img {
    width: 100%;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .img-container {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    position: relative;
    overflow: hidden;
  }
}
.upload-wrapper {
  display: flex;
  align-items: center;
  // width: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  padding-top: 22px;
  &::-webkit-scrollbar {
    display: none;
  }
}
.upload-btn {
  padding-right: 36px;
  p {
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
  }
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
.upload-del-btn {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  transform: translate(-40%, -40%);
  background: $bg;
  border-radius: 50%;
  border: 4px solid $bg;
  background: $red;
  color: #fff;
  font-size: 18px;
  padding: 8px;
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
  border-radius: 16px;
  p {
    font-size: 24px;
    margin-bottom: 12px;
  }
  span {
    color: #fff;
    font-size: 24px;
  }
}
.photo-menu-cover {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 40;
}
.photo-menu {
  h5 {
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 32px;
    font-weight: normal;
    color: $main;
  }
  input {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 150%;
    height: 150%;
  }
}
.photo-menu-container {
  position: absolute;
  bottom: 36px;
  left: 0;
  right: 0;
  z-index: 41;
  padding: 0 36px;

  div {
    height: 100px;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    &:nth-of-type(1) {
      margin-bottom: 16px;
    }
    &:nth-of-type(2) {
      margin-bottom: 24px;
    }
  }
}
.photo-menu-cancel-btn {
  height: 80px;
  line-height: 80px;
  background: #fff;
  border-radius: 16px;
  font-size: 32px;
  color: #999;
  text-align: center;
}
</style>
