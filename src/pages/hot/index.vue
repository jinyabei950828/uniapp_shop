<script setup>
import {reactive} from 'vue'
import {onLoad} from '@dcloudio/uni-app'
import {getHotRecommend} from '@/services/home'

const props = defineProps({
  type:String
})

// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]

const state = reactive({
  isLoading:false,
  bannerPicture:'',//封面图
  subTypes:[],//热门选项
  currHot:{},//当前热门参数下的选项
  tabActive:0,//默认tabs
})

state.currHot = hotMap.find(item=>item.type===props.type)
uni.setNavigationBarTitle({title:state.currHot.title})

//获取热门数据
const getHotRecommendData = async()=>{
  const res = await getHotRecommend(state.currHot.url,{
    page: 1,
    pageSize: 10
  })
  state.bannerPicture = res.result.bannerPicture
  state.subTypes = res.result.subTypes
}

//切换tabs
const onChangeTabActive = (index)=>{
  state.tabActive = index
}

onLoad(async()=>{
  state.isLoading = true
  await getHotRecommendData()
  state.isLoading = false
})

//滚动触底
const onScrolltolower = async ()=>{
  //当前活跃数据
  const activeSubTypes = state.subTypes[state.tabActive]
  if(activeSubTypes.goodsItems.page<activeSubTypes.goodsItems.pages){
    activeSubTypes.goodsItems.page++
  }else{
    activeSubTypes.finish = true
    return uni.showToast({icon:'none',title:'没有更多数据了~'})
  }

  const res = await getHotRecommend(state.currHot.url,{
    subTypes:activeSubTypes.id,
    page:activeSubTypes.goodsItems.page,
    pageSize:activeSubTypes.goodsItems.pageSize
  })

  const newList = res.result.subTypes[state.tabActive]
  activeSubTypes.goodsItems.items = [
    ...activeSubTypes.goodsItems.items,
    ...newList.goodsItems.items
  ]

}
</script>

<template>
  <view class="hot">
    <view v-if="state.isLoading">加载中</view>
    <template v-else>
      <!-- 推荐封面和选项 -->
      <view class="top">
        <view class="cover">
          <image
            class="image"
            :src="state.bannerPicture"
          />
        </view>
        <view class="tabs">
          <text class="text" 
            v-for="(item,index) in state.subTypes"
            :class="state.tabActive===index?'active':''"
            @click="event=>onChangeTabActive(index)"
          >
          {{ item.title }}
          </text>
        </view>
      </view>
      <!-- 推荐列表 -->
      <scroll-view 
        scroll-y 
        v-for="(item,index) in state.subTypes"
        :key="item.id"
        v-show="state.tabActive===index"
        @scrolltolower="onScrolltolower"
      >
        <view class="goods">
          <navigator
            :url="`/pages/goods/index?id=${goods.id}`"
            :key="goods.id"
            class="item"
            v-for="goods in item.goodsItems.items"
          >
            <image
              :src="goods.picture"
              class="thumb"
            />
            <view class="name ellipsis">{{ goods.name }}</view>
            <view class="price">
              <text class="symbol">￥</text>
              <text class="number">
                {{ goods.price }}
              </text>
            </view>
          </navigator>
        </view>
        <text class="loading-text">{{ item.finish?'没有更多数据了':'正在加载中...' }}</text>
      </scroll-view>
    </template>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.hot {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
}
.image {
  width: 100%;
  height: 100%;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  margin: 0 20rpx;
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      background-color: #27ba9b;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.scroll-view {
  flex: 1;
  padding-top: 8000px;
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .item {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }

  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
}
.loading-text {
  display: flex;
  justify-content: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>