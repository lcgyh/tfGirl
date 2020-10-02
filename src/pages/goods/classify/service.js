import apiGetData from '@/utils/apiMeth'

// 分类类表搜索查询
export const reqCategoryListData = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/category/list`, params)
  return result
}

export const reqCategoryDetail = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/category/detail`, params)
  return result
}

// 一级分类列表
export const reqCategoryFirstList = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/category/first/list`, params)
  return result
}

// 一级分类新建
export const reqCategoryFirstCreate = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/category/first/add`, params)
  return result
}

// 一级分类更新
export const reqCategoryFirstUpdate = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/category/first/update`, params)
  return result
}

// 二级分类列表
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
