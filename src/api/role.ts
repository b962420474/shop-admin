import request from '@/utils/request'
import { IRoleListParams, Role, IRlue, RolePostData, IRuleData } from './types/role'

export const getRoles = (params:IRoleListParams) => {
  return request<{
    count: number
    list:Role[]
  }>({
    method: 'GET',
    url: '/api/admin/setting/role',
    params
  })
}
export const deleteRole = (id:number) => {
  return request({
    method: 'DELETE',
    url: `/api/admin/setting/role/${id}`
  })
}
export const updateRoleStatus = (id:number, status:number) => {
  return request({
    method: 'PUT',
    url: `/api/admin/setting/role/set_status/${id}/${status}`
  })
}
export const getRulesList = () => {
  return request<{
    menus:IRlue[]
  }>({
    method: 'GET',
    url: '/api/admin/setting/role/create'
  })
}
export const createRole = (id:number, data:RolePostData) => {
  return request({
    method: 'POST',
    url: `/api/admin/setting/role/${id}`,
    data
  })
}

export const getRole = (id:number) => {
  return request<IRuleData>({
    method: 'GET',
    url: `/api/admin/setting/role/${id}/edit`
  })
}
