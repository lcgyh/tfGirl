import apiGetData from '@/utils/apiMeth'

// 新建/修改
export const reqNewList = async (params) => {
  const result = await apiGetData('GET', '/erp/v1/activity/new', params)
  return result
}

export const reqNewInfo = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/activity/new/${params.newId}`)
  return result
}

export const reqEditNew = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/activity/new`, params)
  return result
}
