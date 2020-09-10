const orderStates = [{
  name: '待支付',
  value: '1'
}]

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    align: 'center'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
    align: 'center'
  },
];

export {
  orderStates,
  columns
}
