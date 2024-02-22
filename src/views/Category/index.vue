<script setup>
/**
 * 责任人：Array
 * ['曾日闽']
 * **/

/***
 * 组件依赖
 * **/
import { onMounted, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import GoodsItem from '@/components/GoodsItem/index.vue'
import { getSubCategoryAPI, getBannerAPI } from '@/api/index.js'
const route = useRoute()

/***
 * 脚本主体逻辑
 * **/
// TODO: 一级分类面包屑渲染
const subCategory = ref({})
const getSubCategory = async (id = route.params.id) => {
  const res = await getSubCategoryAPI(id)
  subCategory.value = res.result
}

// TODO: 获取 Banner 数据，进行动态渲染
const bannerList = ref([])
const getBanner = async () => {
  const { result } = await getBannerAPI({
    distributionSite: '2'
  })
  bannerList.value = result
}

// TODO: 路由参数变化的时候，可以把分类数据接口重新发送
onBeforeRouteUpdate((to) => {
  /**
   * @params { @to } @to 目标路由对象
   * ***/
  getSubCategory(to.params.id)
})

/***
 * 声明周期钩子
 * **/
onMounted(() => {
  getSubCategory()
  getBanner()
})

</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ subCategory.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 分类列表 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in subCategory.children" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in subCategory.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
  .home-banner {
    width: 1240px;
    height: 500px;
    margin: 0 auto;
    z-index: 98;

    img {
      width: 100%;
      height: 500px;
    }
  }
}
</style>