import store from '../store';

/**
 *
 * @param {string} path 待验证的路径
 * @returns 该路径是否需要登录态才能访问
 */
export function verifyLogin(path) {
  const {
    base: { info }
  } = store.getState();
  const verified = ['/personal', '/store', '/update'];
  return !info && verified.includes(path);
}
