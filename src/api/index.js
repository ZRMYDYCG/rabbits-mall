import axios from 'axios'

const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// TODO: 配置拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
  }, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
return Promise.reject(e)
})

// TODO: Layout 模块
/**
 * @desc 获取全部分类(包含推荐商品) 注意: 可以认为获取的是一级分类列表
 * @param 无
 * @data 无
 * @return Object
 */
export const getCategoryAPI = () => {
  return httpInstance({
    url: "/home/category/head",
    method: 'get'
  })
}

// TODO: Home 模块
/**
 * @desc 获取轮播图数据
 * @param 无
 * @data 无
 * @return Object
 */

export const getBannerAPI = () => {
  return httpInstance({
    url: '/home/banner'
  })
}