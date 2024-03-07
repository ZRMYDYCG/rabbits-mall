import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user/index.js'
import router from '@/router/index.js'

const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// TODO:配置拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    // 1. 从 pinia 获取 token 数据
    // 2. 按照后端的要求拼接token数据
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if(token){
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  // 统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  // 401token失效处理
  // 1. 清除本地用户数据
  // 2. 跳转到登录页
  if(e.response.status === 401) {
    userStore.clearUserInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})

// TODO:首页页面接口
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

/**
 * @desc 获取轮播图数据
 * @param { @distributionSite } @distributionSite string 可选  广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 * @data 无
 * @return Object
 */
export const getBannerAPI = (params = {}) => {
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}

/**
 * @desc 获取新鲜好物数据
 * @param 无
 * @data 无
 * @return Object
 */
export const getFindNewAPI = () => {
  return httpInstance({
    url:'/home/new'
  })
}

/**
 * @desc 获取人气推荐数据
 * @param 无
 * @data 无
 * @return Object
 */
export const getPopularAPI = () => {
  return httpInstance({
    url:'/home/hot'
  })
}

/**
 * @desc 获取所有商品模块
 * @param 无
 * @data 无
 * @reurn Object
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}

// TODO:分类页面接口
/**
 * @desc 获取二级分类列表
 * @param { @id } @id 一级分类id 必需
 * @data 无
 * @reurn Object
 */
export const getSubCategoryAPI = (id) => {
  return httpInstance({
    url: '/category',
    params: {
      id
    }
  })
}

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
  return httpInstance({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}

/**
 * @description: 获取导航数据
 * @params 无
 * @data {
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   }
 * @return {*}
 */
export const getSubCategoryGoodsAPI = (data) => {
  return httpInstance({
    url:'/category/goods/temporary',
    method:'POST',
    data
  })
}


// TODO:商品详情页面接口
/**
 * @description: 获取商品详情
 * @params { @id } id: 商品项的 id
 * @data 无
 * @return {*}
 */
export const getDetailAPI = (id) => {
  return httpInstance({
    url: '/goods',
    params: {
      id
    }
  })
}

/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return httpInstance({
    url:'/goods/hot',
    params:{
      id,
      type,
      limit
    }
  })
}

// TODO:用户相关接口
export const loginAPI = ({ account, password }) => {
  return httpInstance({
    url: '/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}


// TODO:购物车相关接口
// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
  return httpInstance({
    url: '/member/cart',
    method: 'post',
    data: {
      skuId,
      count
    }
  })
}

// 获取最新购物车列表
export const findNewCartListAPI = () => {
  return httpInstance({
    url: '/member/cart'
  })
}

// 删除购物车商品
export const delCartAPI = (ids) => {
  return httpInstance({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

// 合并购物车
export const mergeCartAPI = (data) => {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}
