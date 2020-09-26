import React, { useState, useEffect } from 'react';
import { Modal, Input, message,Radio } from 'antd';
import FormItemBySelf from '../../../../components/formItemBySelf';
import {reqCategoryFirstCreate,reqCategoryFirstUpdate} from '../service'

const Delivery = (props) => {
  const { visibleData, setVisibleData,getDataList,setFormData } = props;
  const { record, visible } = visibleData;
  const handleOk =async () => {
    if (!record.categoryName) return message.error('请输入一级分类名称');
    if(record.id){
      await reqCategoryFirstUpdate(record)
    }else{
      await reqCategoryFirstCreate(record)
    }
    await setFormData()
    getDataList()
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
      <Modal title="新增一级分类" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <FormItemBySelf label="一级分类" width="120">
          <Input
            value={record.categoryName}
            onChange={(e) => {
              onChange(e, 'categoryName');
            }}
            placeholder="请输入"
            style={{ width: '280px' }}
          />
        </FormItemBySelf>
        <FormItemBySelf label="一级分类状态" width="120">
        <Radio.Group  onChange={(e) => {
              onChange(e, 'categoryStatus');
            }}  value={record.categoryStatus}>
          <Radio value={1}>启用</Radio>
          <Radio value={2}>禁用</Radio>
        </Radio.Group>
        </FormItemBySelf>
      </Modal>
    </div>
  );
};

export default Delivery;
