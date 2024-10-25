/** 验证手机号（宽松模式只要是1开头即可） */
export const validatePhone = (phone: string) =>
  /^(?:(?:\+|00)86)?1\d{10}$/.test(phone + '')
