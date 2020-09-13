import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, message } from 'antd';
import FormItemBySelf from '../../../../components/formItemBySelf'


const Delivery = (props) => {
  const { visibleData, setVisibleData } = props
  const { record, visible } = visibleData
  const handleOk = () => {
    if (!record.storeName) return message.error('请输入快递单号')
    setVisibleData({
      visible: false,
      record: {}
    })
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
        title="发货"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormItemBySelf label='快递单号' width='120'>
          <Input
            value={record.storeName}
            onChange={(e) => { onChange(e, 'storeName') }}
            placeholder="请输入"
            style={{ width: '280px' }} />
        </FormItemBySelf>
      </Modal>
    </div>

  )

}

export default Delivery