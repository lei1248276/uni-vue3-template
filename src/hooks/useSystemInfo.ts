let SYSTEM_INFO: ReturnType<typeof uni.getSystemInfoSync> | undefined

export default function useSystemInfo() {
  return SYSTEM_INFO || (SYSTEM_INFO = markRaw(uni.getSystemInfoSync()))
}
