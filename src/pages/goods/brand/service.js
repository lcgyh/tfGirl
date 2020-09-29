import apiGetData from '@/utils/apiMeth'

export const reqBrandList = async () => {
    const result = await apiGetData('GET', `/erp/v1/brand`)
    return result
}

// 品牌搜索查询
export const reqBrandListData = async (params) => {
    const result = await apiGetData('GET', `/erp/v1/brand/list`,params)
    return result
}

// 品牌新建和修改
export const editBrand = async (params) => {
    const result = await apiGetData('POST', `/erp/v1/brand`,params)
    return result
}

export const reqBrandInfo = async (brandId) => {
    const result = await apiGetData('GET', `/erp/v1/brand/${brandId}`)
    return result
}

