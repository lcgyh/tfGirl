import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const DeleteDes = (props) => {
  const { deleteOption, index } = props;
  return (
    <div style={{ width: '100px', textAlign: 'center', color: 'red', cursor: 'pointer' }}>
      <DeleteOutlined
        onClick={() => {
          deleteOption(index);
        }}
      />
      <div
        onClick={() => {
          deleteOption(index);
        }}
      >
        删除
      </div>
    </div>
  );
};

export default DeleteDes;
