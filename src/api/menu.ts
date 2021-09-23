import request from '@/utils/request'
import { IMenu } from './types/menu'
export const getMenus = function (params:{
    is_show?:boolean|null,
    keyword?:string|null
}) {
  return request<IMenu>({
    method: 'GET',
    url: '/api/admin/menus',
    params
  })
}
