import {http} from '@/utils/http'

// 获取轮播图数据(1为首页,2为分类商品页)
export const getHomeBanner = (distributionSite=1)=>{
  return http({
    method:"GET",
    url:"/home/banner",
    data:{
      distributionSite
    }
  })
}

//获取分类数据
export const getHomeCategory = ()=>{
  return http({
    method:"GET",
    url:"/home/category/mutli"
  })
}

//获取热门数据
export const getHomeHot = ()=>{
  return http({
    method:"GET",
    url:"/home/hot/mutli"
  })
}

//获取猜你喜欢数据
export const getHomeGuess = (data)=>{
  return http({
    method:"GET",
    url:"/home/goods/guessLike",
    data
  })
}

//通过热门类型推荐
export const getHotRecommend = (url,data)=>{
  return http({
    method:'GET',
    url,
    data
  })
}