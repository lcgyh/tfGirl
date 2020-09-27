import React from 'react';

const articalStates = [{
  name: '展示',
  value: '1',
},{
  name: '不展示',
  value: '2',
} ];

const columns = [{
    title: '言语ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: '言语标题',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: '言语类型',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
  },
  {
    title: '展示门店',
    dataIndex: 'address1',
    key: 'address1',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'wordStatus',
    key: 'wordStatus',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'address13',
    key: 'address13',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'address14',
    key: 'address14',
    align: 'center',
    render:(text,record)=>{
      return <span onClick={record.goEdit(String(record.wordType),record.id)} className='click_text'>编辑</span>
    }
  },
];

export {
  articalStates,
  columns
};
