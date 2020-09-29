import React, { useState, useEffect } from 'react';
import { Modal, Input, message, Radio, Select } from 'antd';
import FormItemBySelf from '@/components/formItemBySelf';
import { reqSpecAttrEdit, reqSpecData } from '../service'

const { Option } = Select;

const DeliveryAttr = (props) => {
  const { visibleData, setVisibleData, setFormData, } = props;
  const { record, visible } = visibleData;
  const [firstList, setFirstList] = useState([])
  const handleOk = async () => {
    if (!record.specId) return message.error('请选择规格名称');
    if (!record.specAttrName) return message.error('请输入规格值名称');
    await reqSpecAttrEdit(record)
    await setFormData({isSearch:true})
    setVisibleData({ visible: false, record: {} });
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

  const getSpecList = async () => {
    const result = await reqSpecData()
    setFirstList(result.list || [])
  }

  useEffect(() => {
    if (visible) {
      getSpecList()
    }
  }, [visible])


  return (<div>
    <Modal
      title={record.specAttrId?"编辑规格值":'新增规格值'}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}>
      <FormItemBySelf label="规格名称" width="120">
        <Select
          disabled={!!record.specAttrId}
          style={{ width: '280px' }}
          onChange={(e) => {
            onChange(e, 'specId');
          }} value={record.specId}>
          {
            firstList.map((item) => {
              return <Option value={item.specId} key={item.specId}>{item.specName}</Option>
            })
          }
        </Select>
      </FormItemBySelf>
      <FormItemBySelf label="规格值名称" width="120">
        <Input value={record.specAttrName}
          onChange={(e) => {
            onChange(e, 'specAttrName');
          }}
          placeholder="请输入"
          style={{ width: '280px' }}
        />
      </FormItemBySelf>
      <FormItemBySelf label="规格状态" width="120">
        <Radio.Group onChange={(e) => {
          onChange(e, 'specAttrStatus');
        }} value={record.specAttrStatus}>
          <Radio value='1'>启用</Radio>
          <Radio value='2'>禁用</Radio>
        </Radio.Group>
      </FormItemBySelf>
    </Modal>
  </div>
  );
};

export default DeliveryAttr;
