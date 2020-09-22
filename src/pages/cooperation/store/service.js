import apiGetData from '@/utils/apiMeth'

export const reqStoreList = async (params) => {
    const result = await apiGetData('GET', '/erp/v1/shop', params)
    return result
}

export const reqStoreInfo = async (params) => {
    const result = await apiGetData('GET', `erp/v1/shop/${params.shopId}`)
    return result
}

export const reqEditStore = async (params) => {
    const result = await apiGetData('POST', `/erp/v1/shop`, params)
    return result
}

export const reqResetPwd = async (shopId) => {
    const result = await apiGetData('PUT', `/erp/v1/shop/pwd/${shopId}`)
    return result
}


