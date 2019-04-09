/**
 * 手机正则表达式
 * 表示以1开头，第二位可能是3/4/5/7/8等的任意一个，在加上后面的\d表示数字[0-9]的9位，总共加起来11位结束
 * @param str
 * @returns {boolean}
 */
export function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8]\d{9}$/
  return reg.test(str)
}

/***
 * 密码正则表达式：数字+字母
 * @param str
 * @returns {boolean}
 */
export function isvalidPass (str) {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
  return reg.test(str)
}
