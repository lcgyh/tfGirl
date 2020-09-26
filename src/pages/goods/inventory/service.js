import apiGetData from '@/utils/apiMeth'

export const reqGoodsInvBySku = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/product/inv`,params)
  return result
}