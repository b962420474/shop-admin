import request from '@/utils/request'
import { Admin, AdminPostData, IListParams } from './types/admin'
import { IFormData } from './types/form'
export const getAdmins = (params:IListParams) => {
  return request<{
    count:number
    list:Admin[]
  }>({
    url: '/api/admin/setting/admin',
    method: 'GET',
    params
  })
}

export const deleteAdmin = (id:number) => {
  return request({
    url: `/api/admin/setting/admin/${id}`,
    method: 'DELETE'
  })
}
export const updateAdminStatus = (id:number, status:number) => {
  return request({
    url: `/api/admin/setting/set_status/${id}/${status}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const updateAdmin = (id:number, data:AdminPostData) => {
  return request({
    url: `/api/admin/setting/admin/${id}`,
    method: 'PUT',
    data
  })
}
export const createAdmin = (data:AdminPostData) => {
  return request({
    url: '/api/admin/setting/admin',
    method: 'POST',
    data
  })
}
export const getAdmin = (id:number) => {
  return request<IFormData>({
    url: `/api/admin/setting/admin/${id}/edit`,
    method: 'GET'
  }).then(iformData => {
    const obj:Record<string, any> = {}
    iformData.rules.forEach(item => {
      obj[item.field] = item.value
    })
    return obj as {
      account:string
      pwd:string
      real_name:string
      conf_pwd:string
      roles:string[]
      status:0|1
    }
  })
}
export const getRoles = () => {
  return request<IFormData>({
    url: '/api/admin/setting/admin/create',
    method: 'GET'
  }).then(iformData => {
    const data = iformData.rules.find(item => item.field === 'roles')
    if (data && data.options) {
      return data.options
    } else {
      return []
    }
  })
}
