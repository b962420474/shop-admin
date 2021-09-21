import request from '@/utils/request'
import { ILoginInfo } from './types/common'
// 获取二维码
export const getCaptcha = function () {
  return request({
    method: 'get',
    url: '/api/admin/captcha_pro'
  })
}

// 获取基本信息

export const getInfo = function () {
  return request<ILoginInfo>({
    method: 'GET',
    url: '/api/admin/login/info'
  })
}
