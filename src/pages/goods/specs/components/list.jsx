import React, { useState, useEffect } from 'react';
import { Button, Select, Input, Card, DatePicker, Space, Divider } from 'antd';
import styles from '../style.less';

const Block = (props) => {
  const {info,setVisibleAttrData} = props
  const editspecAttr=()=>{
    setVisibleAttrData({
        specAttrStatus:detail.specAttrStatus || '1',
        specAttrName:detail.specAttrName,
        specId:detail.specId,
        specAttrId:detail.specAttrId,
        opType:'2'
    })
  }
  return (
    <div className={styles.block}>
      <div>{info.specAttrName}</div>
      <Divider type="vertical" />
      <div className={styles.block_edit} onClick={editspecAttr}>修改</div>
    </div>
  );
};

const BlockList = (props) => {
  const {detail,setVisibleData,setVisibleAttrData} =props
  const {specName,specAttrs=[]} = detail

  const editSpec=()=>{
    setVisibleData({
      visible: true,
      record: {
        specStatus:detail.specStatus || '1',
        specName:detail.specName,
        specId:detail.specId,
        opType:'2'
      },
    })
  } 
  return (
    <Card title={specName} bordered={false} extra={<span className={styles.block_edit} onClick={editSpec}>修改</span>}>
      <Space style={{ flexWrap: 'wrap' }}>
        {specAttrs.map((item,index)=>{
          return  <Block info={item} key={index} setVisibleAttrData={setVisibleAttrData}/>
        })
        }
      </Space>
    </Card>
  );
};

export default BlockList;
