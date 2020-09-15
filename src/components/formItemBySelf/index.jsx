import React from 'react';

const FormItemBySelf = (props) => {
  const { label, width, children } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ width: `${width}px`, textAlign: 'right' }}>
        {label}
        <span style={{ marginLeft: '2px', marginRight: '8px' }}>:</span>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default FormItemBySelf;
