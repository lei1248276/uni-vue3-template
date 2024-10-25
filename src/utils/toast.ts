const toast = {
  state: {
    show: false
  },
  start(message?: string) {
    if (this.state.show) return

    uni.showLoading({
      title: message || '加载中...',
      mask: true,
      success: () => { this.state.show = true }
    })
  },
  close() {
    if (!this.state.show) return

    uni.hideLoading()
    this.state.show = false
  },
  success(title: string, complete?: () => void) {
    uni.showToast({
      icon: title.length > 7 ? 'none' : 'success',
      title,
      duration: 1000,
      complete: complete,
      success: () => { this.state.show = false }
    })
  },
  fail(title: string = '请求失败', complete?: () => void) {
    uni.showToast({
      icon: title.length > 7 ? 'none' : 'error',
      title: title,
      duration: 3000,
      complete: complete,
      success: () => { this.state.show = false }
    })
  }
}

export default toast
