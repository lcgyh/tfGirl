import React from 'react';
import { Modal, Input, message } from 'antd';
import FormItemBySelf from '@/components/formItemBySelf'
import { reqDeliveryOrder } from '../service'

const Delivery = (props) => {
  const { visibleData, setVisibleData, getDataList } = props
  const { record, visible } = visibleData
  const handleOk = async () => {
    if (record.opType === '2' && !record.expressNo) return message.error('请输入快递单号')
    const params = {
      expressNo: record.expressNo,
      opType: record.opType,
      orderId: record.list.map((item) => {
        return item.orderId
      })
    }
    await reqDeliveryOrder(params)
    setVisibleData({
      visible: false,
      record: {}
    })
    getDataList()
    message.success('操作成功')
  }
  const handleCancel = () => {
    setVisibleData({
      visible: false,
      record: {}
    })
  }
  const onChange = (e, key) => {
    setVisibleData({
      visible: true,
      record: {
        ...visibleData.record,
        [key]: e && e.target ? e.target.value : e
      }
    })
  }

  return (
    <div>
      <Modal
        title={record.opType === '1' ? '发货' : '补充快递单'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormItemBySelf label='快递单号' width='120'>
          <Input
            value={record.expressNo}
            onChange={(e) => { onChange(e, 'expressNo') }}
            placeholder="请输入"
            style={{ width: '280px' }} />
        </FormItemBySelf>
      </Modal>
    </div>

  )

}

export default Delivery
