//对api进行统一的管理
import apirequest from './apiAjax'
import mockrequest from './mockAjax'

// 接口示例
// // 登录接口
export const reqUserLogin = (data) => apirequest({
  url: '/paas-web/upmstreeapi/login',
  method: 'POST',
  data,
})
export const reqUserToken = (code) => apirequest({
  url: '/paas-web/upmstreeapi/accessToken',
  method: 'get',
  params: {
  code,
  }
})

export const reqJobList = (data) => apirequest({
  url: '/paas-web/bocapi/volcano/v3.3/vcJob/list',
  method: 'post',
  data,
})

export const reqDeleteJob = (clusterId, vcJobId) => apirequest({
  url: '/paas-web/bocapi/volcano/v3.3/vcJob/delete',
  method: 'post',
  data:{
    clusterId,
    vcJobId,
  },
})