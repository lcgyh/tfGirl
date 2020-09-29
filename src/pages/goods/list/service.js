import apiGetData from '@/utils/apiMeth'

export const reqGoodsList = async (params) => {
  const result = await apiGetData('GET', '/erp/v1/activity/skill', params)
  return result
}
export const reqGoodsInfo = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/product/detail/${params.spuId}`)
  return result
}

// 商品列表查询
export const reqGoodsEdit = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/product`,params)
  return result
}

// 商品sku状态管理
export const reqGoodsState = async (params) => {
  const result = await apiGetData('PUT', `/erp/v1/product/status`,params)
  return result
}
