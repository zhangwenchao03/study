/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
import { permissionToUrl } from '@/constants/account';
import { headerList } from '@/constants/home';
import { arrayIncludesOtherArray } from '@/utils/arrayUtil';

export const getBlingsByNumber = number => {
  let str = '';
  for (let i = 0; i < number; i += 1) {
    str += '*';
  }
  return str;
};
// 邮箱或者手机掩码
// eslint-disable-next-line consistent-return
export const getHiddenAccount = str => {
  if (!str || str.length === 0) {
    return '';
  }
  if (str.indexOf('@') > -1) {
    // 账户为邮箱
    const needHiddenStr = str.substring(0, str.indexOf('@'));
    const endStr = str.substring(str.indexOf('@'));
    const { length } = needHiddenStr;
    if (length === 1) {
      return `*${endStr}`;
    }
    if (length === 2) {
      return `${needHiddenStr.substring(0, 1)}*${endStr}`;
    }
    if (length > 2 && length < 5) {
      return needHiddenStr.substring(0, 2) + getBlingsByNumber(length - 2) + endStr;
    }
    if (length > 4 && length < 7) {
      return needHiddenStr.substring(0, 3) + getBlingsByNumber(length - 3) + endStr;
    }
    return (
      needHiddenStr.substring(0, 3) +
      getBlingsByNumber(length - 6) +
      needHiddenStr.slice(-3) +
      endStr
    );
    // eslint-disable-next-line no-else-return
  } else {
    return `${str.substring(0, 3)}****${str.substring(7)}`; // 账户为手机号
  }
};

export const isEqualArray = (firstArray, secondArray) => {
  if (!firstArray || !secondArray) return false;
  if (firstArray.length !== secondArray.length) return false;
  for (let i = 0; i < firstArray.length; i += 1) {
    if (firstArray[i] !== secondArray[i]) {
      return false;
    }
  }
  return true;
};

export const generatorNewValue = (obj, key, newValue, t) => {
  if (!obj[key]) {
    // eslint-disable-next-line no-param-reassign
    obj[key] = newValue.bind(t);
  }
};

export const normFile = e => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.file && e.file.originFileObj;
};

const urlNeedChanged = ({ currentUserPermission, pathname }) => {
  const codeList = [];
  for (const key in permissionToUrl) {
    if (permissionToUrl[key] === pathname) {
      codeList.push(key);
    }
  }
  let hasRight = false;
  if (arrayIncludesOtherArray(currentUserPermission, codeList)) {
    hasRight = true;
  }
  return hasRight;
};

const getRealUrl = currentUserPermission => {
  let realUrl = '';
  currentUserPermission.forEach(item => {
    const pathname = permissionToUrl[item];
    const hasChanged = urlNeedChanged({ currentUserPermission, pathname });
    if (hasChanged) {
      realUrl = pathname;
      return realUrl;
    }
  });
  return realUrl;
};

export const getCurrentUrl = ({ currentUserPermission, pathname }) => {
  const hasRight = urlNeedChanged({ currentUserPermission, pathname });
  if (!hasRight) {
    return { url: getRealUrl(currentUserPermission), hasChanged: true };
  }
  return { url: pathname, hasChanged: false };
};

export const getHeaderChildren = key => {
  let menuList = null;
  let moduleData = null;
  headerList.forEach(item => {
    if (item.key === key) {
      menuList = item.children;
      moduleData = item;
    }
  });
  return { menuList, moduleData };
};

export const lazyLoadOnScroll = (e, pageOptions, callback) => {
  if (typeof pageOptions === 'function') {
    if (e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 5 && pageOptions()) {
      callback && callback();
    }
  } else if (
    e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 5 &&
    pageOptions.total > pageOptions.pageSize * pageOptions.pageNum
  ) {
    callback && callback();
  }
};

export const getCurrentMedalMatch = () => {
  if (window.matchMedia('(min-width: 1922px)')) {
    return 18;
  }

  if (window.matchMedia('(min-width: 1599px)')) {
    return 16;
  }

  if (window.matchMedia('(min-width: 1359px)')) {
    return 14;
  }

  if (window.matchMedia('(min-width: 1279px)')) {
    return 12;
  }

  if (window.matchMedia('(min-width: 1024px)')) {
    return 12;
  }

  if (window.matchMedia('(max-width: 1024px)')) {
    return 12;
  }
};
