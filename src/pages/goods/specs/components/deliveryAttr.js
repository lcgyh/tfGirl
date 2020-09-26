import React, { useState, useEffect } from 'react';
import { Modal, Input, message,Radio ,Select} from 'antd';
import FormItemBySelf from '../../../../components/formItemBySelf';
import {reqSpecEdit,reqSpecListData} from '../service'

const { Option } = Select;

const DeliveryAttr = (props) => {
  const { visibleData, setVisibleData,getDataList,setFormData, } = props;
  const { record, visible } = visibleData;
  const [firstList,setFirstList]=useState([])
  const handleOk =async () => {
    if (!record.specId) return message.error('请选择规格名称');
    if (!record.specAttrName) return message.error('请输入规格值名称');
    await reqSpecEdit(record)
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

  const getSpecList=async ()=>{
    const result =await reqSpecListData()
    setFirstList(result.specs || [])
  }

  useEffect(()=>{
    if(visible){
      getSpecList()
    }
  },[visible])
  

  return (<div>
      <Modal 
        title="新增规格值" 
        visible={visible} 
        onOk={handleOk} 
        onCancel={handleCancel}>
          <FormItemBySelf label="规格名称" width="120">
          <Select style={{ width: '280px' }}  onChange={(e) => {
              onChange(e, 'parentCategoryId');
            }} value={record.specId}> 
        {
          firstList.map((item,index)=>{
            return  <Option value={item.specId} key={index}>{item.specName}</Option>
          })
        }
    </Select>
          </FormItemBySelf>
        <FormItemBySelf label="规格值名称" width="120">
          <Input value={record.specName}
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
          <Radio value={1}>启用</Radio>
          <Radio value={2}>禁用</Radio>
        </Radio.Group>
        </FormItemBySelf>
      </Modal>
    </div>
  );
};

export default DeliveryAttr;
