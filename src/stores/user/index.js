/**
 * 模块依赖
 * **/
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/api/index.js'

/**
 * 数据管理逻辑
 * **/
export const useUserStore = defineStore('user', () => {
    // TODO:用户登录
    // 1. 定义管理用户数据的 state
    const userInfo = ref({})
    // 2. 定义获取接口数据的 action 函数
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
    }
    // 4. 退出时清除用户信息
    const clearUserInfo = () => {
        userInfo.value = {}
    }
    // 3. 以对象格式把 state 和 action return 出去
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
    },{
        persist: true
    },)