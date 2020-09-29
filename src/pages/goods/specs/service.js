import apiGetData from '@/utils/apiMeth'


// 规格列表查询
export const reqProductSpecList = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/product/specList`, params)
  return result
}
// 规格新增与修改
export const reqSpecEdit = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/product/spec`, params)
  return result
}
// 规格值新新增修改
export const reqSpecAttrEdit = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/product/specAttr`, params)
  return result
}

// 获取规格列表-状态为可用的
export const reqSpecData = async () => {
  const result = await apiGetData('GET', `/erp/v1/product/spec?pageSize=99999&current=1`)
  return result
}

// 获取规格列表-状态为可用的
export const reqSpecAttrList = async (specId) => {
  const result = await apiGetData('GET', `/erp/v1/product/specAttr/${specId}`)
  return result
}












