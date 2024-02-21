<script setup>
/**
 * 责任人：Array
 * ['曾日闽']
 * **/

/***
 * 组件依赖
 * **/
import HomePanel from '@/components/HomePanel/index.vue'
import { getFindNewAPI, getPopularAPI } from '@/api/index.js'
import { onMounted, ref } from 'vue'

/***
 * 脚本主体逻辑
 * **/
// TODO: 人气推荐及新鲜好物数据获取及模板渲染
const newList = ref([])
const getFindNew = async () => {
  const res = await getFindNewAPI()
  newList.value = res.result
}
const popularList = ref([])
const getPopular = async () => {
  const res = await getPopularAPI()
  popularList.value = res.result
}

/***
 * 声明周期钩子
 * **/
onMounted(() => {
  getFindNew()
  getPopular()
})
</script>

<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <!-- 插槽主体内容 -->
      <ul class="goods-list">
        <li v-for="item in newList" :key="item.id">
          <RouterLink to="/">
            <img v-img-lazy="item.picture" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
  </HomePanel>
  <HomePanel title="人气推荐" subTitle="人气爆棚 不容错过">
      <!-- 插槽主体内容 -->
      <ul class="goods-list">
        <li v-for="item in popularList" :key="item.id">
          <RouterLink to="/">
            <img v-img-lazy="item.picture" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
  </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
