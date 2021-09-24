import { IMenu } from './menu'
export interface ILoginInfo{
    logo_square: string
    logo_rectangle: string
    login_logo: string
    slide: string[]
}
export interface ILoginParams{
    account:string
    pwd:string
    imgcode:string
}
export interface IUserInfo{
    id: number
    account: string
    head_pic: string
}
export interface ILoginResponse{
  token: string
  expires_time: number
  menus: IMenu[]
  unique_auth: string[]
  user_info: IUserInfo
  logo: string
  logo_square: string
  version: string
  newOrderAudioLink: string
}
