import Vue from 'vue';


import {
  DatetimePicker,
  Picker,
  List,
  PullRefresh,
} from 'vant';

import VHeader from '~components/v-header';
import VFooter from '~components/v-footer';
import VPopup from '~components/v-popup';
import VCell from '~components/v-cell';
import VInput from '~components/v-input';
import VPicker from '~components/v-picker';
import VForm from '~components/v-form';
import VUpload from '~components/v-upload';
import VDialog from '~components/v-dialog';
import VCover from '~components/v-cover';
import VDatePicker from '~components/v-date-picker';
import VFormLabel from '~components/v-form-label';
import VLoading from '~components/v-loading';
import VScroll from '~components/v-scroll2';
import VList from '~components/v-list';
import VImg from '~components/v-img';

import $Picker from './v-v-picker/v-picker';
import $DatePicker from './v-date-picker/v-date-picker';
import $Toast from './v-toast/v-toast';

Vue.use(DatetimePicker)
  .use(Picker)
  .use(List)
  .use(PullRefresh);

Vue.component('v-header', VHeader);
Vue.component('v-footer', VFooter);
Vue.component('v-popup', VPopup);
Vue.component('v-cell', VCell);
Vue.component('v-form', VForm);
Vue.component('v-input', VInput);
Vue.component('v-picker', VPicker);
Vue.component('v-upload', VUpload);
Vue.component('v-dialog', VDialog);
Vue.component('v-cover', VCover);
Vue.component('v-date-picker', VDatePicker);
Vue.component('v-form-label', VFormLabel);
Vue.component('v-loading', VLoading);
// Vue.component('v-scroll', VScroll);
Vue.component('v-scroll', VList);
Vue.component('v-img', VImg);

Vue.prototype.$Toast = $Toast;
Vue.prototype.$Picker = $Picker;
Vue.prototype.$DatePicker = $DatePicker;
