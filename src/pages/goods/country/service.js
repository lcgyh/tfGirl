import apiGetData from '@/utils/apiMeth'


export const reqCountryListData = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/basic/country/list`, params)
  return result
}

export const editCountry = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/basic/country`, params)
  return result
}
