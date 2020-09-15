import React, { useState, useEffect } from 'react';
import { Button, Select, Input, Card, DatePicker, Space, Divider, Image } from 'antd';
import styles from '../style.less';

const Block = () => {
  return (
    <div className={styles.block}>
      <Image
        width={100}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />

      <div className={styles.block_edit}>
        <div className={styles.block_edit_t}>
          <div className={styles.block_edit_t_title}>二级名称二级名称二级名称二级名称</div>
          <div className={styles.block_edit_t_icon_con}>
            <div className={styles.card_title_icon}>禁</div>
          </div>
          <Divider type="vertical" />
          <div className={styles.block_edit_opa}>修改</div>
        </div>
        <div className={styles.block_edit_b}>
          <Space>
            <div>spu:123</div>
            <div>sku:123</div>
          </Space>
        </div>
      </div>
    </div>
  );
};

const CardTitle = (title) => {
  return (
    <div className={styles.card_title}>
      <div>{title}</div>
      <div className={styles.card_title_icon}>禁</div>
    </div>
  );
};

const BlockList = () => {
  return (
    <Card
      title={CardTitle('规格名称')}
      bordered={false}
      extra={<span className={styles.block_edit_opa}>修改</span>}
    >
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
