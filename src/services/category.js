import { http } from "@/utils/http"

export const getGoodsById = (id)=>{
  return http({
    method:"GET",
    url:"/goods",
    data:{id}
  })
}