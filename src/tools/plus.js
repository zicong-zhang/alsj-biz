const plusHandler = (fn) => {
  if (window.plus) {
    fn();
  } else {
    document.addEventListener('plusready', fn, false);
  }
};

/**
 * 振动
 * @param {Number} milliseconds 时间长短
 */
export default (milliseconds = 2000) => {
  try {
    plusHandler(plus.device.vibrate(milliseconds));
  } catch (err) {
    console.log('plusError:_____', err);
  }
};
