<script setup>
/**
 * 责任人：Array
 * ['曾日闽']
 * **/

/***
 * 组件依赖
 * **/
import { onMounted, ref, computed } from 'vue'
import { getHotGoodsAPI } from '@/api/index.js'
import { useRoute } from 'vue-router'
const route = useRoute()
// 设计 props 参数，适配不同的 title 和数据
const props = defineProps({
    hotType: { // IMPORTANT: 适配不同的 title 参数
        type: Number
    }
})

const TYPEMAP = {
  1: '24小时热榜',
  2: '周热榜'
}
const title = computed(() => TYPEMAP[props.hotType])

/***
 * 脚本主体逻辑
 * **/
const hotList = ref([])
const reqData = ref({
  id: route.params.id,
  type: props.hotType,
  limit: 3
})

const getHotGoods = async () => {
    const res = await getHotGoodsAPI(reqData)
    hotList.value = res.result
}

/***
 * 声明周期钩子
 * **/
onMounted(() => {
    getHotGoods()
})
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotList" :key="item.id">
      <img :src="item.picture" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>
