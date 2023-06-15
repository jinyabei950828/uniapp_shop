<script setup>
defineProps({
  list:{
    type:Array,
    default:()=>[]
  }
})
</script>

<template>
  <view class="carousel">
    <swiper
      indicator-dots
      indicator-color="rgba(255, 255, 255, 0.4)"
      indicator-active-color="#fff"
      autoplay
      :circular="true"
      :interval="3000"
    >
      <swiper-item v-for="item in list" :key="item.id">
        <navigator 
          open-type="switchTab"
          url="/pages/index/index"
          hover-class="none"
          class="navigator">
          <image 
            class="image"
            mode="aspectFill"
            :src="item.imgUrl"/>
          </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss">
.carousel{
  height:280rpx;
  .navigator,
  .image{
    width:100%;
    height:100%;
  }
}
</style>