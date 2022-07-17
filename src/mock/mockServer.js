// 先引入mockjs
import Mock from 'mockjs'
//引入需要mock的数据,下为示例
import firstlogin from './firstlogin.json'


//mock函数:
//  第一个参数:请求地址
//  第二个参数:请求数据
Mock.mock('/mock/user/login', {
  ...firstlogin
})