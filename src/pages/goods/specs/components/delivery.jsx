import React from 'react';
import { Modal, Input, message,Radio } from 'antd';
import FormItemBySelf from '../../../../components/formItemBySelf';
import {reqSpecEdit} from '../service'

const Delivery = (props) => {
  const { visibleData, setVisibleData,setFormData } = props;
  const { record, visible } = visibleData;
  const handleOk =async () => {
    if (!record.specName) return message.error('请输入specName');
    await reqSpecEdit(record)
    setFormData({isSearch:true})
    setVisibleData({visible: false,record: {}});
  };
  const handleCancel = () => {
    setVisibleData({
      visible: false,
      record: {},
    });
  };
  const onChange = (e, key) => {
    setVisibleData({
      visible: true,
      record: {
        ...visibleData.record,
        [key]: e && e.target ? e.target.value : e,
      },
    });
  };

  return (
    <div>
      <Modal   title={record.specId?"编辑规格":'新增规格'}  visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <FormItemBySelf label="规格名称" width="120">
          <Input
            value={record.specName}
            onChange={(e) => {
              onChange(e, 'specName');
            }}
            placeholder="请输入"
            style={{ width: '280px' }}
          />
        </FormItemBySelf>
        <FormItemBySelf label="规格状态" width="120">
        <Radio.Group  onChange={(e) => {
              onChange(e, 'specStatus');
            }}  value={record.specStatus}>
          <Radio value='1'>启用</Radio>
          <Radio value='2'>禁用</Radio>
        </Radio.Group>
        </FormItemBySelf>
      </Modal>
    </div>
  );
};

export default Delivery;
