import apiGetData from '@/utils/apiMeth'


export const reqCategoryListData = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/category/list`, params)
  return result
}

export const reqCategoryDetail = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/category/detail`, params)
  return result
}


export const reqCategoryFirstList = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/category/first/list`, params)
  return result
}

export const reqCategoryFirstCreate = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/category/first/add`, params)
  return result
}
export const reqCategoryFirstUpdate = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/category/first/update`, params)
  return result
}

export const reqCategorySecondList = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/category/second/list`, params)
  return result
}

export const reqCategorySecondCreate = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/category/second/add`, params)
  return result
}

export const reqCategorySecondUpdate = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/category/second/update`, params)
  return result
}
