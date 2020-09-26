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
    render: () => < span style = {
      {
        color: '#1890ff',
        cursor: 'pointer',
      }
    } > 操作 < /span>
  },
];

const goodsColumns = [{
    title: '商品名称',
    dataIndex: 'address13',
    key: 'address13',
    align: 'center',
  },
  {
    title: '规格',
    dataIndex: 'address14',
    key: 'address14',
    align: 'center',
  },
  {
    title: '商品条码',
    dataIndex: 'addresss',
    key: 'address14',
    align: 'center',
  },
  {
    title: '预订数量',
    dataIndex: 'addre1ss',
    key: 'address14',
    align: 'center',
  },
  {
    title: '零售价',
    dataIndex: 'address1',
    key: 'address14',
    align: 'center',
  },
  {
    title: '折扣价',
    dataIndex: 'address11',
    key: 'address14',
    align: 'center',
  },
];

const opaColumns = [{
    title: '操作',
    dataIndex: 'address13',
    key: 'address13',
    align: 'center',
  },
  {
    title: '操作时间',
    dataIndex: 'address14',
    key: 'address141',
    align: 'center',
  },
  {
    title: '操作人',
    dataIndex: 'addresss',
    key: 'address14',
    align: 'center',
  },
];

export {
  articalStates,
  columns,
  goodsColumns,
  opaColumns
};
