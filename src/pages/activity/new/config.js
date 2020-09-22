import React from 'react';

export const columns = [{
    title: '上新ID',
    dataIndex: 'newId',
    key: 'newId',
    align: 'center',
  },
  {
    title: '活动名称',
    dataIndex: 'newName',
    key: 'newName',
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
    dataIndex: 'newStatusStr',
    key: 'newStatusStr',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'opa',
    key: 'opa',
    align: 'center',
    render: () => < span className = 'click_text'
    onClick = {
      (text, record) => {
        record.goEdit(record)
      }
    } > 编辑 < /span>
  }
];
