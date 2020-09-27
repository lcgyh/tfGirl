import apiGetData from '@/utils/apiMeth'


// export const reqSpecListData = async (params) => {
//   const result = await apiGetData('GET', `/erp/v1/product/specSearch`, params)
//   return result
// }

export const reqSpecEdit = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/product/spec`, params)
  return result
}

export const reqSpecAttrEdit = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/product/spec`, params)
  return result
}

export const reqProductSpecList = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/product/specList`, params)
  return result
}

export const reqSpecAttrList = async (specId) => {
  const result = await apiGetData('GET', `/erp/v1/product/specAttr/${specId}`)
  return result
}

export const reqSpecAttrCreate = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/product/specAttr/`,params)
  return result
}







