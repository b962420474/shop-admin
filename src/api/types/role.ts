export interface IRoleListParams {
    page: number
    limit: number
    role_name?: string
    status?: 0 | 1 | ''
}
export interface Role {
    id:number
    role_name:string
    rules:string
    level:number
    status:0|1
    statusLoading?: boolean
}

export interface RolePostData{
    role_name: string
    status:0 | 1
    checked_menus:number[]
}
export interface IRlue{
    pid:number
    id:number
    title:string
    children:IRlue[]
}

export interface IRuleData{
    role:Role
    id:number
    role_name:string
    rules:string
    level:number
    status:0|1
    menus:IRlue[]
}
