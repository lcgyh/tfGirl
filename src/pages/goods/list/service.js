import apiGetData from '@/utils/apiMeth'

export const reqGoodsList = async (params) => {
  const result = await apiGetData('GET', '/erp/v1/activity/skill', params)
  return result
}
export const reqGoodsInfo = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/product/detail/${params.spuId}`)
  return result
}
