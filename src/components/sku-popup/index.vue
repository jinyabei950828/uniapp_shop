<script setup>
defineProps({
  value:{
    type:Boolean,
    default:false
  },
  mode:{
    type:Number,
    default:1,//1默认都显示 2默认只显示购物车
  }
})
</script>

<template>
  <view class="sku-popup">
  展示内容
  </view>
</template>