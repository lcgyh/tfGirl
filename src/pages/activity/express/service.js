import apiGetData from '@/utils/apiMeth'

export const reqExpressFeeListData = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/shop/expressFee/list`, params)
  return result
}

// 邮费新增和修改
export const expressEdit = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/shop/expressFee`, params)
  return result
}






