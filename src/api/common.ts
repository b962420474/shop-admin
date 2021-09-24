import request from '@/utils/request'
import { ILoginInfo, ILoginParams, ILoginResponse } from './types/common'
// 获取二维码
export const getCaptcha = function () {
  return request<Blob>({
    method: 'get',
    url: '/api/admin/captcha_pro',
    params: {
      stamp: Date.now()
    },
    responseType: 'blob'
  })
}

// 获取基本信息

export const getInfo = function () {
  return request<ILoginInfo>({
    method: 'GET',
    url: '/api/admin/login/info'
  })
}

export const login = function (data:ILoginParams) {
  return request<ILoginResponse>({
    method: 'post',
    url: '/api/admin/login',
    data
  })
}

export const logout = function () {
  return request({
    method: 'GET',
    url: '/api/admin/setting/admin/logout'
  })
}
