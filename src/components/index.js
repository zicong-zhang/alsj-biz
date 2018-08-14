import Vue from 'vue';


import { DatetimePicker , Picker } from 'vant';
Vue.use(DatetimePicker)
  .use(Picker)

import VHeader from '~components/v-header';
import VFooter from '~components/v-footer';
import VPopup from '~components/v-popup';
import VInfoList from '~components/v-info-list';
import VInput from '~components/v-input';
import VPicker from '~components/v-picker';
import VForm from '~components/v-form';
import VUpload from '~components/v-upload';
import VDialog from '~components/v-dialog';
import VCover from '~components/v-cover';
import VDatePicker from '~components/v-date-picker';
import VFormLabel from '~components/v-form-label';

Vue.component('VHeader', VHeader);
Vue.component('VFooter', VFooter);
Vue.component('VPopup', VPopup);
Vue.component('VInfoList', VInfoList);
Vue.component('VForm', VForm);
Vue.component('VInput', VInput);
Vue.component('VPicker', VPicker);
Vue.component('VUpload', VUpload);
Vue.component('VDialog', VDialog);
Vue.component('VCover', VCover);
Vue.component('VDatePicker', VDatePicker);
Vue.component('VFormLabel', VFormLabel);

import $Picker from './v-v-picker/v-picker';
import $DatePicker from './v-date-picker/v-date-picker';
import $Toast from './v-toast/v-toast'

Vue.prototype.$Toast = $Toast;
Vue.prototype.$Picker = $Picker;
Vue.prototype.$DatePicker = $DatePicker;