<script setup>
// 定义 props 接收
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <view class="carousel">
    <swiper :circular="true" autoplay :interval="3000">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator
          open-type="switchTab"
          url="/pages/index/index"
          hover-class="none"
          class="navigator"
        >
          <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss">
/* 轮播图 */
.carousel {
  height: 200rpx;
  background-color: #efefef;
  margin: 0 20rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  border-radius: 10rpx;

  .navigator {
    height: 200rpx;
  }
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>