import apiGetData from '@/utils/apiMeth'

export async function queryCurrent() {
  return apiGetData('GET', '/erp/v1/userInfo');
}
