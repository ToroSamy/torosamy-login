import request from '@/utils/request'

export const userRegisterService = (data: any) => {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export const userLoginService = (data: any) => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}



export const userLogoutService = (id: number) => {
  return request({
    url: `/user/logout/${id}`,
    method: 'put'
  })
}

export const userGetInfoService = (id: number) => {
  return request({
    url: `/user/get/${id}`,
    method: 'get'
  })
}

