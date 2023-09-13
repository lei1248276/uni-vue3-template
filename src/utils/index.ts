/**
 * @description: 验证手机号（宽松模式只要是1开头即可）
 */
export function validatePhone(phone: string) {
  return /^(?:(?:\+|00)86)?1\d{10}$/.test(phone + '')
}
