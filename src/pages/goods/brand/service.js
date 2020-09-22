import apiGetData from '@/utils/apiMeth'

export const reqBrandList = async () => {
    const result = await apiGetData('GET', `/erp/v1/brand`)
    return result
}
