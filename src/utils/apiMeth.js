import request from '@/utils/request';
import {
  message
} from 'antd'

const apiGetData = async (method, url, params, isGetMsg = false) => {
  const result = await request(url, {
    method,
    headers: {
      token: localStorage.getItem('token'),
      roleName: localStorage.getItem('roleName'),
    },
    params: method === 'GET' ? params : null,
    data: method === 'GET' ? null : params,
  })

  if (result.code === 0 && isGetMsg === false) {
    return result.data
  }
  if (result.code !== 0) {
    message.error(result.msg)
    throw (result.msg)
  }
  return result

}

export default apiGetData
