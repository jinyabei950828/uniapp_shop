<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
@import 'uview-plus/index.scss';

// 字体图标
@import '@/styles/fonts.scss';

view,
navigator,
input,
scroll-view {
  box-sizing: border-box;
}

button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 两行省略
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
/* #ifdef MP-WEIXIN */
.wx-swiper-dot {
  //指示点样式
  width: 20px !important;
  height: 4px !important;
  border-radius: 0% !important;
}
/* #endif */

/* #ifndef MP-WEIXIN */
::v-deep .uni-swiper-dot {
  // 指示点元素默认样式
  width: 40rpx !important;
  height: 8rpx !important;
  border-radius: 0% !important;
}
/* #endif */

//去掉自带边框
::v-deep uni-button:after {
  border: none !important;
}
</style>
