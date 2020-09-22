import React from 'react';

const storeStatesList = [{
  name: '开启',
  value: '1',
}, {
  name: '关闭',
  value: '2',
}];

const columns = [{
  title: '门店名称',
  dataIndex: 'shopName',
  key: 'shopName',
  align: 'center',
},
{
  title: '联系电话',
  dataIndex: 'shopMobile',
  key: 'shopMobile',
  align: 'center',
},
{
  title: '联系人',
  dataIndex: 'shoperName',
  key: 'shoperName',
  align: 'center',
},
{
  title: '门店状态',
  dataIndex: 'shopStatusStr',
  key: 'shopStatusStr',
  align: 'center',
},
{
  title: '操作',
  dataIndex: 'opa',
  key: 'opa',
  align: 'center',
  render: (text, record) => {
    return <span className='click_text' onClick={() => { record.goEdit(record) }}> 编辑 </span>
  }
},
];


export {
  storeStatesList,
  columns,
};
