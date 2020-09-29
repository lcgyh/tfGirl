import apiGetData from '@/utils/apiMeth'

// 国家搜索查询
export const reqCountryListData = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/basic/country/list`, params)
  return result
}

// 国家新增/修改
export const editCountry = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/basic/country`, params)
  return result
}

// 国家数据,select中使用的
export const reqCountryData = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/basic/country`, params)
  return result
}
