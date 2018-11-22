import Vue from 'vue';
import VImgPreview from './index.vue';

const VImgPreviewConstructor = Vue.extend(VImgPreview);

const $ImgPreview = (urls, onClose) => {
  if (!urls) return;

  const instance = new VImgPreviewConstructor().$mount(document.createElement('div'));

  instance.urls = urls;
  if (onClose && typeof onClose === 'function') instance.closeHandler = onClose;

  document.body.appendChild(instance.$el);
  instance.isShow = true;
}

export default $ImgPreview;
