const request = useRequest.create({
  baseURL: import.meta.env.VITE_BASE_API
})

request.interceptors.request.use(
  (config) => {
    // console.log('🚀 ~ file: request.ts:31 ~ config:', config)
    return config
  }, (err) => {
    toast.fail()
    return Promise.reject(err)
  })

request.interceptors.response.use(
  (response) => {
    // console.log('🚀 ~ file: request.ts:20 ~ response:', response)

    return response.data
  }, (err) => {
    console.error(err)

    return (toast.fail('请求失败'), Promise.reject(err))
  })

export default request
