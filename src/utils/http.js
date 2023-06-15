const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

const httpInterceptor = {
  // request 触发前拼接 url 
  invoke(options){
    if(!options.url.startsWith("http")){
      options.url = baseURL+options.url
    }
    options.timeout = 10000
    //添加小程序请求头标识 todo?
    options.header = {
      ...options.header,
      'source-client':'miniapp'
    }

    const token = ''
    if(token){
      options.header.Authorization = token
    }

  }
}

//拦截 request 请求
uni.addInterceptor('request',httpInterceptor)
//拦截 uploadFile 文件上传
uni.addInterceptor("uploadFile",httpInterceptor)

export const http = (options)=>{
  return new Promise((resolve,reject)=>{
    uni.request({
      ...options,
      success:(res)=>{
        if(res.statusCode>=200&&res.statusCode<300){
          resolve(res.data)
        }else if(res.statusCode===401){
          uni.navigateTo({url:"/page/login/index"})
          reject(res)
        }else{
          uni.showToast({
            icon:'none',
            title:res.data.msg||'请求错误'
          })
          reject(res)
        }
      },
      fail:(err)=>{
        uni.showToast({
          icon:'none',
          title:'网络错误,换个网络试试'
        })
        reject(err)
      }
    })
  })
}