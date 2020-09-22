import apiGetData from '@/utils/apiMeth'

export const reqBannerList = async (params) => {
  const result = await apiGetData('GET', '/erp/v1/banner', params)
  return result
}
export const reqBannerInfo = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/banner/${params.bannerId}`)
  return result
}

export const reqEditBanner = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/banner`, params)
  return result
}
