import CryptoJS from 'crypto-js';

const CryptoSecret = '__Crypto_Secret__';
const DEFAULT_CACHE_TIME = 28800; // 缓存有效期 8h

export function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

// 数据加密
function encrypt(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), CryptoSecret).toString();
}

// 数据解密
function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, CryptoSecret);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  if (!decryptedData) return null;
  return JSON.parse(decryptedData);
}

export function setLocal(key, value, expired = DEFAULT_CACHE_TIME) {
  const storageData = {
    value,
    expired: expired !== null ? Date.now() + expired * 1000 : null
  };
  window.localStorage.setItem(key, encrypt(storageData));
}

export function getLocal(key) {
  const val = window.localStorage.getItem(key);
  if (!val) return null;
  let storageData = null;
  try {
    storageData = decrypt(val);
  } catch (_) {
    // 防止解密失败
  }
  if (storageData) {
    const { value, expired } = storageData;
    if (expired === null || Date.now() <= expired) {
      return value;
    }
  }
  removeLocal(key); // 解密失败的和过期的都清掉
  return null;
}

export function removeLocal(key) {
  window.localStorage.removeItem(key);
}

export function clearLocal() {
  window.localStorage.clear();
}
