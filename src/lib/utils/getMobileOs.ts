const getMobileOS = () => {
  const userAgent = navigator.userAgent || navigator.vendor;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }

  return 'unknown';
};

const getDeviceType = () => {
  const userAgent = navigator.userAgent || navigator.vendor;

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      userAgent,
    )
  ) {
    return 'mobile';
  }

  return 'desktop';
};

const isAppleDevice = () => {
  const isIOs = /iP(ad|od|hone)/i.test(window.navigator.userAgent);
  const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
  const isMac = navigator.userAgent.indexOf('Mac OS X') !== -1;

  return isIOs || isSafari || isMac;
};

export { getMobileOS, getDeviceType, isAppleDevice };
