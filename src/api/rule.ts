import request from '@/utils/request'
import { IFormData } from './types/form'
import { IRuleParams, Menu } from './types/rule'

export const getmenus = (params:IRuleParams) => {
  return request<Menu[]>({
    method: 'GET',
    url: '/api/admin/setting/menus',
    params
  })
}
export const deleteMenu = (id:number) => {
  return request({
    method: 'DELETE',
    url: ` /api/admin/setting/menus/${id}`
  })
}
export const updateMenuStatus = (id:number, is_show:Menu['is_show']) => {
  return request({
    method: 'PUT',
    url: `/api/admin/setting/menus/show/${id}`,
    data: {
      is_show
    }
  })
}
export const createRule = (data:{ path: number[] } & Omit<Menu, 'id' | 'children' | 'is_del' | 'path'>) => {
  return request({
    method: 'POST',
    url: '/api/admin/setting/menus',
    data
  })
}
export const updateRule = (id:number, data:{ path: number[] } & Omit<Menu, 'id' | 'children' | 'is_del' | 'path'>) => {
  return request({
    method: 'PUT',
    url: `/api/admin/setting/menus/${id}`,
    data
  })
}
export const getRule = (id:number) => {
  return request<{
    path: number[]
  } & Omit<Menu, 'path'>>({
    method: 'GET',
    url: `/api/admin/setting/menus/${id}`
  })
}
// 获取权限规则表单
export const getMenu = () => {
  return request<IFormData>({
    method: 'GET',
    url: ' /api/admin/setting/menus/create'
  }).then(data => {
    const menus = data.rules.find(item => item.field === 'menu_list')
    return (menus && menus.props && menus.props.data) || []
  })
}
