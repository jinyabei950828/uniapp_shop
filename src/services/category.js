import { http } from "@/utils/http"

//获取分类数据
export const getCategoryTop = ()=>{
  return http({
    method:'GET',
    url:'/category/top'
  })
}

//获取产品详情
export const getGoodsById = (id)=>{
  return http({
    method:"GET",
    url:"/goods",
    data:{id}
  })
}