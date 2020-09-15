import React, { useState, useEffect } from 'react';
import { Button, Select, Input, Card, DatePicker, Space, Divider } from 'antd';
import styles from '../style.less';

const Block = () => {
  return (
    <div className={styles.block}>
      <div>规格值</div>
      <Divider type="vertical" />
      <div className={styles.block_edit}>修改</div>
    </div>
  );
};

const BlockList = () => {
  return (
    <Card title="规格名称" bordered={false} extra={<span className={styles.block_edit}>修改</span>}>
      <Space style={{ flexWrap: 'wrap' }}>
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
      </Space>
    </Card>
  );
};

export default BlockList;
