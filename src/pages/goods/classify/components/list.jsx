import React, { useState, useEffect } from 'react';
import { Button, Select, Input, Card, DatePicker, Space, Divider, Image } from 'antd';
import styles from '../style.less';


const Block = (props) => {
  const {info,setVisibleSecondData,parentCategoryId} = props
  const editspecAttr=()=>{
    setVisibleSecondData({
      visible: true,
      record: {
        categoryName:info.categoryName,
        categoryStatus:String(info.categoryStatus),
        parentCategoryId,
        categoryLogo:info.logo,
        id:info.categoryId
      },
    })
  }
  return (
    <div className={styles.block}>
      <Image
        width={100}
        src={info.logo}
      />

      <div className={styles.block_edit}>
        <div className={styles.block_edit_t}>
          <div className={styles.block_edit_t_title}>{info.categoryName}</div>
          <div className={styles.block_edit_t_icon_con}>
            {
              String(info.categoryStatus)==='2'?<div className={styles.card_title_icon}>禁</div>:null
            }
            
          </div>
          <Divider type="vertical" />
          <div className={styles.block_edit_opa} onClick={editspecAttr}>修改</div>
        </div>
        <div className={styles.block_edit_b}>
          <Space>
            <div>spu:{info.spuNum}</div>
            <div>sku:{info.skuNum}</div>
          </Space>
        </div>
      </div>
    </div>
  );
};

const CardTitle = (title,state) => {
  return (
    <div className={styles.card_title}>
      <div>{title}</div>
      {
        String(state)==='2'?  <div className={styles.card_title_icon}>禁</div>:null
      }
    
    </div>
  );
};

const BlockList = (props) => {
  const {detail,setVisibleData,setVisibleSecondData}= props
  const {categoryName,childrenCategoryList=[] ,categoryId} = detail
  const editSpec=()=>{
    setVisibleData({
      visible: true,
      record: {
        categoryName:detail.categoryName,
        categoryStatus:String(detail.categoryStatus),
        id:categoryId
      },
    })
  } 
  return (
    <Card
      title={CardTitle(categoryName,detail.categoryStatus)}
      bordered={false}
      extra={<span className={styles.block_edit_opa} onClick={editSpec}>修改</span>}
    >
      <Space style={{ flexWrap: 'wrap' }}>
        {
          childrenCategoryList.map((item,index)=>{
            return <Block info={item} key={index} setVisibleSecondData={setVisibleSecondData} parentCategoryId={categoryId}/>
          })
        }

      </Space>
    </Card>
  );
};

export default BlockList;
