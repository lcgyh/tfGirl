import apiGetData from '@/utils/apiMeth'

export const reqPopularList = async (params) => {
  const result = await apiGetData('GET', '/erp/v1/activity/popular', params)
  return result
}

export const reqPopularInfo = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/activity/popular/${params.popularId}`)
  return result
}

export const reqEditPopular = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/activity/popular`, params)
  return result
}
