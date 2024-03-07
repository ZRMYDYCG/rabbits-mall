/**
 * 模块依赖
 * **/
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from '../user/index.js'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/api/index.js'

/**
 * 数据管理逻辑
 * **/
export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    // 1. 定义 state  -  cartList
    const cartList = ref([])
    // 2. 定义action  -  addCart
    // 获取最新的购物车列表
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }
    const addCart = async (goods) => {
        const { skuId, count } = goods
        if(isLogin.value) {
            // 登录后的购物车逻辑
            await insertCartAPI({ skuId, count })
            await updateNewList()
        } else {
            // 添加购物车操作
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            // 是否已添加该商品
            if(item) {
                item.count+= goods.count
            } else {
                // 没有添加过 - 直接 push
                cartList.value.push(goods)
            }
        }
    }
    // 删除购物车
    const delCart = async (skuId) => {
        if(isLogin.value) {
            await delCartAPI([skuId])
            await updateNewList()
        } else {
            const index = cartList.value.findIndex(item => item.skuId === skuId)
            cartList.value.splice(index, 1)
        }
    }

    // 清除购物车
    const clearCart = () => {
        cartList.value = {}
    }
    // 计算属性
    // 总数量
    const allCount = computed(() => cartList.value.reduce((a, c) => a+c.count, 0))
    // 总价
    const allPrice = computed(() => cartList.value.reduce((a, c) => a+c.price*c.count, 0))
    // 单选功能
    const singleCheck = (skuId, selected) => {
        // 通过 skuId 找到需要修改的项
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }
    // 全选功能 将 cartList 的每一项都修改为全选状态
    const allCheck = (selected) => {cartList.value.forEach(item => item.selected = selected)}
    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    // 已选择的数量
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a+c.count, 0))
    // 已选商品的总价格
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a+c.count*c.price, 0))
    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allCheck,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
},{
    persist: true
})
