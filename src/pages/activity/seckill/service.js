import apiGetData from '@/utils/apiMeth'

export const reqSkillList = async (params) => {
  const result = await apiGetData('GET', '/erp/v1/activity/skill', params)
  return result
}
export const resSkillInfo = async (params) => {
  const result = await apiGetData('GET', `/erp/v1/activity/skill/${params.skillId}`)
  return result
}

export const reqEditSkill = async (params) => {
  const result = await apiGetData('POST', `/erp/v1/activity/skill`, params)
  return result
}
