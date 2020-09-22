import React from 'react';

const bannerStatesList = [{
  name: '上线',
  value: '1',
}, {
  name: '下线',
  value: '2',
}];

const columns = [{
    title: 'banner名称',
    dataIndex: 'bannerName',
    key: 'bannerName',
    align: 'center'
  },
  {
    title: 'bannerID',
    dataIndex: 'bannerId',
    key: 'bannerId',
    align: 'center',
  },
  {
    title: 'bnaner状态',
    dataIndex: 'bannerStatusStr',
    key: 'bannerStatusStr',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'opa',
    key: 'opa',
    align: 'center',
    render: (text, record) => ( <
      span className = 'click_text'
      onClick = {
        () => {
          record.goEdit(record)
        }
      } > 编辑 < /span>
    )
  }
];

export {
  bannerStatesList,
  columns
};
