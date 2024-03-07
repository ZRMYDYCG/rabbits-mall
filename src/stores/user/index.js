/**
 * 模块依赖
 * **/
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI, mergeCartAPI } from '@/api/index.js'
import { useCartStore } from '../cartStore/index.js'

/**
 * 数据管理逻辑
 * **/
export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    // TODO:用户登录
    // 1. 定义管理用户数据的 state
    const userInfo = ref({})
    // 2. 定义获取接口数据的 action 函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        // 合并购物车操作
        await mergeCartAPI(cartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        await cartStore.updateNewList()
    }
    // 4. 退出时清除用户信息、清空购物车
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }
    // 3. 以对象格式把 state 和 action return 出去
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
    },{
        persist: true
    })