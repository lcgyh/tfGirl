import apiGetData from '@/utils/apiMeth'

export const reqProvinceListData = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/basic/province`, params)
  return result
}





