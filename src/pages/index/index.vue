<script setup>
import CustomNavBar from '@/components/custom-navbar';
import Swiper from '@/components/swiper'
import Category from '@/components/category'
import HotList from '@/components/hot'
import Guess from '@/components/guess'

import { getHomeBanner,
         getHomeCategory,
         getHomeHot,
         getHomeGuess } from '@/services/home'

import { onLoad } from '@dcloudio/uni-app'
import { reactive } from 'vue';

const state = reactive({
  bannerList:[],//轮播图数据
  categoryList:[],//分类数据
  homeHotList:[],//热门推荐
  guess:{//猜你喜欢
    page:1,
    pageSize:10,
    totalPages:0
  },
  homeGuessList:[],//猜你喜欢列表
  isLoading:false,
  finish:false,//数据是否全部加载完成
  isTriggered:false,//下拉刷新
})

//获取轮播图数据
const getHomeBannerData = async ()=>{
  const res = await getHomeBanner()
  state.bannerList = res.result
}

//目录数据
const getHomeCategoryData = async ()=>{
  const res = await getHomeCategory()
  state.categoryList = res.result
}

//热门数据
const getHomeHotData = async()=>{
  const res = await getHomeHot()
  state.homeHotList = res.result
}

//获取猜你喜欢数据
const getHomeGuessData = async ()=>{
  const params = {
    page:state.guess.page,
    pageSize:state.guess.pageSize
  }
  const res = await getHomeGuess(params)
  state.homeGuessList = [...state.homeGuessList,...res.result.items]
  state.guess.totalPages = res.result.pages
}

//下拉添加
const onScrolltolower = ()=>{
  if(state.finish===true){
    return uni.showToast({
      icon:'none',
      title:"已没有更多数据"
    })
  }
  if(state.guess.page<state.guess.totalPages){
    state.guess.page++
    getHomeGuessData()
  }else{
    state.finish = true
    console.log('没有数据了')
  }
}

//重置猜你喜欢数据
const resetData = () => {
  state.guess.page = 1
  state.homeGuessList = []
}

//上拉刷新
const onRefresherrefresh = async ()=>{
  state.isTriggered = true

  resetData()

  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    getHomeGuessData()
  ])

  state.isTriggered = false
}


onLoad(async()=>{
  state.isLoading = true
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    getHomeGuessData()
  ])
  state.isLoading = false
})

</script>

<template>
  <!-- 顶部搜索栏 -->
  <CustomNavBar />
  <scroll-view 
    enable-back-to-top
    refresher-enabled
    class="scroll-view"
    scroll-y
    @scrolltolower="onScrolltolower"
    :refresher-triggered="state.isTriggered"
    @refresherrefresh="onRefresherrefresh"
    >
    <!-- 轮播图 -->
    <Swiper :list="state.bannerList"/>
    <!-- 分类 -->
    <Category :list="state.categoryList"/>
    <!-- 热门推荐 -->
    <HotList :list="state.homeHotList"/>
    <!-- 猜你喜欢 -->
    <Guess :list="state.homeGuessList" :finish="state.finish"/>
  </scroll-view>
</template>

<style lang="scss">
page{
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view{
  flex:1
}
</style>
