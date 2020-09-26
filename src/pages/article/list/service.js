import apiGetData from '@/utils/apiMeth'

export const reqArticalListData = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/mother/word/list`, params)
  return result
}

export const reqArticalInfoData = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/mother/word/detail`, params)
  return result
}

export const reqArticalCreate = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/mother/word/add`, params)
  return result
}

export const reqArticalUpdate = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/mother/word/update`, params)
  return result
}