<script setup>
import {reactive} from 'vue'
import { onLoad } from '@dcloudio/uni-app';

import {getGoodsById} from '@/services/category'

import SkuPopup from '@/components/sku-popup'

const props = defineProps({
  id:String
})

const state = reactive({
  goodsList:{},
  bannerImgList:[],//轮播图数据
  isLoading:false,
  current: 0,//当前图片下标为零
  isShowSku:false,//是否显示sku组件
  mode:2,//按钮模式
})

const getGoodsDetailData = async()=>{
  const res = await getGoodsById(props.id)
  console.log("===",res.result)
  state.goodsList = res.result
  state.bannerImgList = res.result.mainPictures
}

//改变轮播图
const onChangeSwiper = (e)=>{
  state.current = e.current
}

//点击轮播图
const onSwiperitem = ()=>{
  uni.previewImage({
    current:state.current,
    urls:state.bannerImgList
  })
}

//打开地址弹窗
const onChangePopup = (type)=>{
  if(type=='Address'){

  }
}

//打开sku弹窗
const openSkuPopup = (val)=>{
  state.isShowSku = true
  state.mode = val
}

//获取安全距离
const {safeAreaInsets} = uni.getSystemInfoSync()

onLoad(async()=>{
  state.isLoading = true
  await getGoodsDetailData()
  state.isLoading = false
})
</script>

<template>
  <view v-if="state.isLoading">加载种</view>
  <scroll-view scroll-y class="goods" v-else>
    <!-- 轮播图 -->
    <u-swiper
      height="750rpx" 
      :list="state.bannerImgList"
      radius="0"
      :autoplay="false"
      circular
      indicatorStyle="right:20px"
      class="banner"
      @change="onChangeSwiper"
      @click="onSwiperitem"
    >
    <template #indicator>
      <view class="indicator-num">
        <text class="indicator-num__text">{{state.current+1}}/{{state.bannerImgList.length  }}</text>
      </view>
    </template>
  </u-swiper>
  <!-- 商品简介 -->
  <view class="meta">
    <view class="price">
      <text class="symbol">￥</text>
      <text class="number">{{ state.goodsList.price }}</text>
    </view>
    <view class="name ellipsis">{{ state.goodsList.name }}</view>
    <view class="desc">{{ state.goodsList.desc }}</view>
  </view>

    <!-- 操作面板 -->
    <view class="action">
      <view class="item">
        <view class="dec">
          <text class="label">选择</text>
          <text class="text ellipsis"></text>
        </view>
        <u-icon name="arrow-right" color="#ccc" size="18"></u-icon>
      </view>
      <view class="item" @click="onChangePopup('Address')">
        <view class="dec">
          <text class="label">选择</text>
          <text class="text">请选择收货地址</text>
          <text class="text ellipsis"></text>
        </view>
        <u-icon name="arrow-right" color="#ccc" size="18"></u-icon>
      </view>
      <view class="item">
        <view class="dec">
          <text class="label">服务</text>
          <text class="text ellipsis">无忧退 快速退款 免费包裹</text>
        </view>
        <u-icon name="arrow-right" color="#ccc" size="18"></u-icon>
      </view>
    </view>

    <!-- 详情 -->
    <view class="detail">
      <view class="top">
        <view class="title">
          <view class="icon"></view>
          <text class="txt">详情</text> 
        </view>
        <view 
          class="item" 
          v-for="(item,index) in state.goodsList?.details?.properties"
          :key="index"
        >
          <view class="label">{{ item.name }}</view>
          <view class="dec">{{ item.value }}</view>
        </view>
      </view>
      <image
        v-for="item in state.goodsList?.details?.pictures"
        mode="widthFix"
        :key="item"
        :src="item"
        class="image-item"
      />
    </view>

    <!-- 同类推荐 -->
    <view class="detail similar">
      <view class="top">
        <view class="title">
          <view class="icon"></view>
          <text class="txt">同类推荐</text>
        </view>
      </view>
      <view class="content">
        <navigator 
          v-for="item in state.goodsList.similarProducts"
          :key="item.id"
          class="goods"
          hover-class="none"
          :url="`/pages/goods/index?id=${item.id}`"
        >
          <image
            :src="item.picture"
            mode="aspectFill"
            class="image"
          />
          <view class="name ellipsis">{{ item.name }}</view>
          <view class="price">
            <text class="symbol">￥</text>
            <text class="number">{{ item.price }}</text>
          </view>
        </navigator>
      </view>
    </view>

    <!-- 用户操作 -->
    <view class="toolbar" style="{ padding-bottom:safeAreaInsets?.bottom +'px'}">
      <view class="icons">
        <button class="icons-button">  
          <text class="icon-heart"></text>收藏
        </button>
        <button class="icons-button" open-type="contact">
          <text class="icon-handset"></text>客服
        </button>
        <navigator
          url="/pages/cart/index"
          class="icons-button"
        >
          <text class="icon-cart"></text>购物车
        </navigator>
      </view>
      <view class="buttons">
        <view class="addcart" @click="openSkuPopup(2)">加入购物车</view>
        <view class="payment" @click="openSkuPopup(3)">立即购买</view>
      </view>
    </view>

    <!-- SKU弹出组件 -->
    <SkuPopup 
      v-model="state.isShowSku"
      :mode="state.mode"
    />
  </scroll-view>
</template>

<style lang="scss">
.goods {
  background-color: #f4f4f4;
}
.indicator-num {
  padding: 2px 0;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 100px;
  width: 35px;
  @include flex;
  justify-content: center;

  &__text {
    color: #ffffff;
    font-size: 12px;
  }
}
.meta {
  // position: relative;
  border-bottom: 1rpx solid #eaeaea;
  background-color: #fff;
  .price {
    height: 130rpx;
    padding: 25rpx 30rpx 0;
    color: #fff;
    font-size: 34rpx;
    box-sizing: border-box;
    background-color: #35c8a9;
  }
  .number {
    font-size: 56rpx;
  }
  .brand {
    // width: 160rpx;
    // height: 80rpx;
    // overflow: hidden;
    // position: absolute;
    // top: 26rpx;
    // right: 30rpx;
  }
  .name {
    max-height: 88rpx;
    line-height: 1.4;
    margin: 20rpx;
    font-size: 32rpx;
    color: #333;
  }
  .desc {
    line-height: 1;
    padding: 0 20rpx 30rpx;
    font-size: 24rpx;
    color: #cf4444;
  }
}

.action {
  background-color: #fff;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100rpx;
    margin-left: 30rpx;
    // padding-right: 20rpx;
    border-bottom: 1rpx solid #eaeaea;
    font-size: 26rpx;
    color: #333;
    &:last-child {
      border-bottom: none;
    }
  }
  .dec {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .label {
    width: 80rpx;
    color: #898b94;
    margin: 0 16rpx 0 10rpx;
  }
  .text {
    // flex: 1;
    // -webkit-line-clamp: 1;
  }
}

.detail {
  margin-top: 20rpx;
  background-color: #fff;
  .top {
    padding-left: 20rpx;
    padding-top: 30rpx;
  }
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;

    .icon {
      margin-right: 10rpx;
      height: 30rpx;
      width: 3rpx;
      background-color: #35c8a9;
    }
    .txt {
      font-weight: bold;
    }
  }
  .item {
    // min-height: 100rpx;
    // margin-right: 20rpx;
    display: flex;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1rpx dashed #ccc;
    font-size: 26rpx;
    color: #333;
    &:last-child {
      margin-bottom: 30rpx;
    }
    .dec {
      flex: 1;
      line-height: 2;
    }
    .label {
      width: 200rpx;
    }
  }
  .image-item {
    width: 100%;
  }
}

.content {
  background-color: #f4f4f4;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  navigator {
    width: 305rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-top: 20rpx;
    margin-bottom: 15rpx;
    border-radius: 10rpx;
    background-color: #fff;
    float: left;
  }
  .image {
    width: 100%;
    height: 260rpx;
  }
  .name {
    height: 80rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
  }
  .price {
    line-height: 1;
    font-size: 20rpx;
    color: #cf4444;
  }
  .number {
    font-size: 26rpx;
    margin-left: 2rpx;
  }
}

/* 底部工具栏 */
.toolbar {
  background-color: #fff;
  height: 100rpx;
  padding: 0 20rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //box-sizing: content-box;
  .buttons {
    display: flex;
    & > view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }
    .addcart {
      background-color: #ffa868;
    }
    .payment {
      background-color: #27ba9b;
      margin-left: 20rpx;
    }
  }
  .icons {
    padding-right: 10rpx;
    display: flex;
    align-items: center;
    flex: 1;
    .icons-button {
      flex: 1;
     text-align: center;
      line-height: 1.4;
      padding: 0;
      margin: 0;
      border-radius: 0;
      font-size: 20rpx;
      color: #333;
      background-color: #fff;
    }
    text {
      display: block;
      font-size: 34rpx;
    }
  }
}

</style>