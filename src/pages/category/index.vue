<script setup>
import {reactive,computed} from 'vue'
import { getHomeBanner } from '@/services/home'
import { getCategoryTop } from '@/services/category'
import { onLoad } from '@dcloudio/uni-app';

import Swiper from '@/components/category-swiper'

const state = reactive({
  bannerList:[],//轮播图
  categoryList:[],//分类数据
  activeIndex:0,//高亮的一级索引
  subCategoryList:[],//二级分类
})

state.subCategoryList = computed(()=>state.categoryList[state.activeIndex]?.children||[])

//得到轮播图数据
const getHomeBannerData = async ()=>{
  const res = await getHomeBanner()
  state.bannerList = res.result
}

//获取分类数据
const getCategoryTopData = async ()=>{
  const res = await getCategoryTop()
  state.categoryList = res.result
}

const onChangeActiveIndex = (index)=>{
  state.activeIndex = index
}

onLoad(async ()=>{
  state.isLoading = true
  await Promise.all([
    getCategoryTopData(),
    getHomeBannerData()
  ])
  state.isLoading = false
})
</script>

<template>
  <text v-if="state.isLoading">加载中</text>
  <view class="category" v-else>
    <!-- 搜索框 -->
    <view class="search">
      <view class="input">
        <text class="icon-search">女靴</text>
      </view>
    </view>
    <!-- 分类 -->
    <view class="categories">
      <!-- 一级分类 -->
      <scroll-view scroll-y class="primary">
        <view
          v-for="(item,index) in state.categoryList"
          :key="item.id"
          class="item"
          :class="state.activeIndex===index?'active':''"
          @click="onChangeActiveIndex(index)"
        >
        <text>{{ item.name }}</text>
      </view>
      </scroll-view>
      <!-- 二级分类 -->
      <scroll-view scroll-y class="secondary">
        <!-- 轮播图 -->
        <Swiper :list="state.bannerList"></Swiper>
        <!-- 内容区域 -->
        <view class="panel" v-for="item in state.subCategoryList" :key="item.id">
          <view class="title">
            <text class="name">{{ item.name }}</text>
            <navigator class="more" hover-class="none">全部</navigator>
          </view>
          <view class="content">
            <navigator
              v-for="goods in item.goods"
              :key="goods.id"
              class="goods"
              hover-class="none"
              :url="`/pages/goods/index?id=${goods.id}`"
            >
              <image class="image" :src="goods.picture" lazy-load></image>
              <view class="name ellipsis">{{ goods.name }}</view>
              <view class="price">
                <text class="symbol">¥</text>
                <text class="number">{{ goods.price }}</text>
              </view>
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}
.category {
  height: 100%;
  display: flex;
  flex-direction: column;
  .search {
    padding: 0 30rpx 20rpx;
    background-color: #fff;
    .input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64rpx;
      padding-left: 26rpx;
      color: #8b8b8b;
      font-size: 28rpx;
      border-radius: 32rpx;
      background-color: #f3f4f4;
    }
    .icon-search {
      &::before {
        margin-right: 10rpx;
      }
    }
  }
  .categories {
    flex: 1;
    min-height: 400rpx;
    display: flex;
    .primary {
      overflow: hidden;
      width: 180rpx;
      flex: none;
      background-color: #f6f6f6;
      .item {
        height: 96rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26rpx;
        color: #595c63;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 42rpx;
          bottom: 0;
          width: 96rpx;
          border-top: 1rpx solid #e3e4e7;
        }
      }
      .active {
        background-color: #ffffff;
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 8rpx;
          height: 100%;
          background-color: #27ba9b;
        }
      }
    }
  }
  .secondary {
  //   background-color: #fff;

    .panel {
      margin: 0 15rpx 0rpx;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #333;
        font-size: 28rpx;
        border-bottom: 1rpx solid #f7f7f8;
        height: 60rpx;
      }
      .more {
        font-size: 24rpx;
        color: #999;
        &::after {
          font-family: 'erabbit' !important;
          content: '\e6c2';
        }
      }
      .content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 20rpx 0;
        .goods {
          width: 150rpx;
          margin: 0rpx 30rpx 20rpx 0;
          &:nth-child(3n) {
            margin-right: 0;
          }
          image {
            width: 150rpx;
            height: 150rpx;
            border-radius: 5rpx;
            overflow: hidden;
          }
          .name {
            padding: 5rpx;
            font-size: 22rpx;
            color: #333;
          }
          .price {
            padding: 5rpx;
            font-size: 18rpx;
            color: #cf4444;
          }
          .number {
            font-size: 24rpx;
            margin-left: 2rpx;
          }
        }
      }
    }
  }
}
</style>