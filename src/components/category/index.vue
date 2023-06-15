<script setup>
defineProps({
  list:{
    type:Array,
    default:()=>[]
  }
})
</script>

<template>
  <view class="category">
    <navigator 
      open-type="switchTab"
      url="/pages/index/index"
      hover-class="none"
      class="category-item"
      v-for="item in list"
      :key="item.id"
    >
      <image 
        class="icon"
        :src="item.icon"/>
        <text class="text">{{ item.name}}</text>
      </navigator>
  </view>
</template>

<style lang="scss">
.category{
  display: flex;
  flex-wrap: wrap;
  margin-top:20rpx;
  padding:10rpx 0px;
  min-width: 328rpx;
  .category-item{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width:150rpx;
    .icon{
      width:100rpx;
      height:100rpx;
    }
    .text{
      font-size:26rpx;
      color:#666;
    }
  }
}
</style>