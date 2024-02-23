<script setup>
/**
 * 责任人：Array
 * ['曾日闽']
 * **/

/***
 * 组件依赖
 * **/
import { getCategoryFilterAPI, getSubCategoryGoodsAPI } from '@/api/index.js'
import GoodsItem from '@/components/GoodsItem/index.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

/***
 * 脚本主体逻辑
 * **/
// TODO: 获取面包屑导航数据
const categoryData = ref({})
const getCategoryFilter = async () => {
    const res = await getCategoryFilterAPI(route.params.id)
    categoryData.value = res.result
}

// TODO: 基础列表数据渲染 -> 列表筛选 -> 列表无限加载
const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortFiled: 'publishTime'
})
// STEPS1: 基础列表数据渲染
const getSubCategoryGoods = async () => {
  const res = await getSubCategoryGoodsAPI(reqData)
  goodList.value = res.result.items
}
// STEPS2: 列表筛选
const tabChange = () => {
  reqData.value.page = 1
  getSubCategoryGoods()
}
// STEPS3: 列表无限加载
const disabled = ref(false)
const loadMore = async () => {
  // IMPORTANT: 获取下一页的数据
  reqData.value.page++
  const res = await getSubCategoryGoodsAPI(reqData)
  goodList.value = [...goodList.value, ...res.result.items]
  // 加载完毕，停止监听
  if(res.result.items.length === 0) {
    disabled.value = true
  }
}

/***
 * 声明周期钩子
 * **/
onMounted(() => {
  getCategoryFilter()
  getSubCategoryGoods()
 })
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '`/category/${categoryData.parentId}`' }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!-- IMPORTANT: sortFiled 双向绑定 -->
      <el-tabs v-model="reqData.sortFiled" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="loadMore" :infinite-scroll-disabled="disabled">
         <!-- 商品列表-->
         <GoodsItem v-for="good in goodList" :key="good.id" :good="good" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>