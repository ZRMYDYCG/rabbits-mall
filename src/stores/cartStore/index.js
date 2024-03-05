/**
 * 模块依赖
 * **/
import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * 数据管理逻辑
 * **/
export const useCartStore = defineStore('cart', () => {
    // 1. 定义 state  -  cartList
    const cartList = ref([])
    // 2. 定义action  -  addCart
    const addCart = (goods) => {
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
    return {
        cartList,
        addCart
    }
},{
    persist: true
})