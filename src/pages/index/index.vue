<script setup>
import CustomNavBar from '@/components/custom-navbar';
import Swiper from '@/components/swiper'
import Category from '@/components/category'

import { getHomeBanner,
         getHomeCategory } from '@/services/home'

import { onLoad } from '@dcloudio/uni-app'
import { reactive } from 'vue';

const state = reactive({
  bannerList:[],//轮播图数据
  categoryList:[],//分类数据
  isLoading:false
})

//获取轮播图数据
const getHomeBannerData = async ()=>{
  const res = await getHomeBanner()
  state.bannerList = res.result
}

const getHomeCategoryData = async ()=>{
  const res = await getHomeCategory()
  state.categoryList = res.result
}

onLoad(async()=>{
  state.isLoading = true
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData()
  ])
  state.isLoading = false
})

</script>

<template>
  <!-- 顶部搜索栏 -->
  <CustomNavBar />
  <!-- 轮播图 -->
  <Swiper :list="state.bannerList"/>
  <!-- 分类 -->
  <Category :list="state.categoryList"/>
</template>

<style>

</style>
