import React, { useState, useEffect } from 'react';
import { Modal, message ,InputNumber } from 'antd';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import FormItemBySelf from '../../../../components/formItemBySelf';
import {reqSpecEdit} from '../service'

const DeliveryAttr = (props) => {
  const { visibleData, setVisibleData,getDataList } = props;
  const { record={}, visible } = visibleData;

  const handleOk =async () => {
    if (!record.specId) return message.error('请选择规格名称');
    if (!record.specAttrName) return message.error('请输入规格值名称');
    await reqSpecEdit(record)
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


  console.log('visibleData--',visibleData)


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
          <InputNumber  value={record.money}
            onChange={(e) => {
              onChange(e, 'money');
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
