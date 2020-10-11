import React from 'react';

export const columns = [
  {
    title: '热销ID',
    dataIndex: 'popularId',
    key: 'popularId',
    align: 'center',
  },
  {
    title: '活动名称',
    dataIndex: 'popularName',
    key: 'popularName',
    align: 'center',
  },
  {
    title: 'SPUID',
    dataIndex: 'spuId',
    key: 'spuId',
    align: 'center',
  },
  {
    title: '商品名称',
    dataIndex: 'spuName',
    key: 'spuName',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'popularStatusStr',
    key: 'popularStatusStr',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'opa',
    key: 'opa',
    align: 'center',
    render:(text,record)=><span className='click_text' onClick={()=>{record.goEdit(record)}}>操作</span>
  }];





