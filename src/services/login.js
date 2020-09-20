import apiGetData from '@/utils/apiMeth'

export async function fakeAccountLogin(params) {
  return apiGetData('POST', '/erp/v1/login', params, true)
}

export async function fakeAccountLogout(params) {
  return apiGetData('POST', '/erp/v1/logout', params, true)
}
