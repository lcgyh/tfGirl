import React from 'react';
import { Modal } from 'antd';
import FormItemBySelf from '@/components/formItemBySelf';

const StoreModal = (props) => {
  const { visibleData, setVisibleData,goBack } = props;
  const { record, visible } = visibleData;
  const handleOk = () => {
    setVisibleData({
      visible: false,
      record: {},
    });
    goBack()
  };
  const handleCancel = () => {
    setVisibleData({
      visible: false,
      record: {},
    });
  };
 
  const {shopName,shoperAccount,passWord} = record

  return (
    <div>
      <Modal title={shopName} visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <FormItemBySelf label="用户名" width="120">
            <span>{shoperAccount}</span>
        </FormItemBySelf>
        <FormItemBySelf label="密码" width="120">
            <span>{passWord}</span>
        </FormItemBySelf>
      </Modal>
    </div>
  );
};

export default StoreModal;
