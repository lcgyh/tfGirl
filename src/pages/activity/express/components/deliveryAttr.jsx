import React, { useState, useEffect } from 'react';
import { Modal, message ,InputNumber } from 'antd';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import FormItemBySelf from '../../../../components/formItemBySelf';
import {expressEdit} from '../service'

const DeliveryAttr = (props) => {
  const { visibleData, setVisibleData,getDataList } = props;
  const { record={}, visible } = visibleData;

  const handleOk =async () => {
    console.log('record',record)
    if (!record.expressPrice) return message.error('请输入邮费费用');
    const params={
      expressFeeId:record.expressFeeId,
      expressPrice:record.expressPrice,
      opType:record.opType,
      provinceId:record.provinceId,
    }
    await expressEdit(params)
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

  return (<div>
      <Modal 
        title="修改运费" 
        visible={visible} 
        onOk={handleOk} 
        onCancel={handleCancel}>
         <FormItemBySelf label="邮寄地区" width="120">
            {record.provinceName}
        </FormItemBySelf>
        <FormItemBySelf label="邮寄费用" width="120">
          <InputNumber  value={record.expressPrice}
            onChange={(e) => {
              onChange(e, 'expressPrice');
            }}
            placeholder="请输入"
            style={{ width: '280px' }}
          />
        </FormItemBySelf>
      
      </Modal>
    </div>
  );
};

export default DeliveryAttr;
