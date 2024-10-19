import request from '@/utils/request'

export const getCaptchaService = () => {
  return request({
    url: '/captcha/get/img',
    method: 'get'
  })
}
export const checkCaptchaService = (key: string, captcha: string) => {
  return request({
    url: '/captcha/check/img',
    method: 'post',
    params: { key, captcha }
  })
}


export const checkEmailCodeService = (key: string, captcha: string) => {
  return request({
    url: '/captcha/check/email',
    method: 'post',
    params: { key, captcha }
  })
}

export const getEmailCodeService = (qq: string) => {
  return request({
    url: '/captcha/get/email',
    method: 'get',
    params: { qq }
  })
}
