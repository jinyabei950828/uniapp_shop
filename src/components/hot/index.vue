<script setup>
defineProps({
  list:{
    type:Array,
    default:()=>[]
  }
})
</script>

<template>
  <view class="home-hot">
    <view v-for="item in list" :key="item.id" class="item">
      <navigator 
        open-type="navigate"
        hover-class="none"
      >
        <view class="title">
          <text>{{ item.title}}</text>
          <text class="title-desc">{{ item.alt }}</text>
        </view>
        <view class="cards">
          <image
            v-for="child in item.pictures"
            :src="child"
            class="image"
            mode="scaleToFill"
          />
        </view>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
.home-hot {
  display: flex;
  flex-wrap: wrap;
  min-height: 508rpx;
  margin: 20rpx 20rpx 0;
  border-radius: 10rpx;
  background-color: #fff;

  .title {
    display: flex;
    align-items: center;
    padding: 24rpx 24rpx 0;
    font-size: 32rpx;
    color: #262626;
    .title-desc {
      font-size: 24rpx;
      color: #7f7f7f;
      margin-left: 18rpx;
    }
  }

  .image {
    width: 150rpx;
    height: 150rpx;
  }
  .cards {
    flex: 1;
    padding: 15rpx 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item {
    display: flex;
    flex-direction: column;
    width: 49%;
    height: 254rpx;
    border-right: 1rpx solid #eee;
    border-top: 1rpx solid #eee;
    &:nth-child(2n) {
      border-right: 0 none;
    }
    &:nth-child(2) {
      border-top: 0 none;
    }
    &:nth-child(1) {
      border-top: 0 none;
    }
  }
}
</style>