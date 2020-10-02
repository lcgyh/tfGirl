import apiGetData from '@/utils/apiMeth'

export const reqOrderList = async (params) => {
    const result = await apiGetData('GET', '/erp/v1/order', params)
    return result
}

export const reqDeliveryOrder = async (params) => {
    const result = await apiGetData('PUT', '/erp/v1/order/delivery', params)
    return result
}


export const reqOrderInfo = async (params) => {
    const result = await apiGetData('GET', `/erp/v1/order/${params.orderId}`)
    return result
}

