import apiGetData from '@/utils/apiMeth'

// 门店搜索查询
export const reqStoreList = async (params) => {
    const result = await apiGetData('GET', '/erp/v1/shop', params)
    return result
}
// 获取门店详情
export const reqStoreInfo = async (params) => {
    console.log('params--',params)
    const result = await apiGetData('GET', `/erp/v1/shop/${params.shopId}`)
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


