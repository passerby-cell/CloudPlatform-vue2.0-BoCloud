//示例:user组件的仓库
import {
  reqImagelIST,reqImageVersionlIST,reqImageOverview
  //从api模块中引入请求  
} from '@/api'
//准备actions,用于响应组件中的动作
const actions = {
  //通过api里面的接口函数发送请求,获取服务器的数据
  async getImageOverview({
    commit
  }, 
    envId
  ) {
    let result = await reqImageOverview(envId)
    if (result.code == "200") {
       commit('WAREHOUSEID', result.data.warehouseInfo[0].warehouseId)
       commit('WAREHOUSENAME', result.data.warehouseInfo[0].warehouseName)
       commit('IMAGECATALOGS', result.data.warehouseInfo[0].imageCatalogs)
    }
     
  },
}
//准备mutations,用于操作数据--state
const mutations = {
  WAREHOUSEID(state, warehouseId) {
    state.warehouseId = warehouseId
  },
  WAREHOUSENAME(state, warehouseName) {
    state.warehouseName = warehouseName
  },
  IMAGECATALOGS(state, imageCatalogs) {
    state.imageCatalogs = imageCatalogs
  },
}
//准备state,用于存储数据,要先准备仓库categoryList,才能存储数据
const state = {
  warehouseId:0,
  warehouseName:'',
  imageCatalogs:[],
}

//用于简化数据
const getters = {}

//创建并暴露store
export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}