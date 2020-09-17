const orderStates = [
  {
    name: '待支付',
    value: '1',
  },
];

const columns = [
  {
    title: 'banner名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: 'bannerID',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
  },
  {
    title: 'bnaner状态',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'address1',
    key: 'address1',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'address14',
    key: 'address14',
    align: 'center',
    render:()=><span style={{
      color: '#1890ff',
      cursor: 'pointer',
    }}>编辑</span>
  }
];

const goodsColumns = [
  {
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

const opaColumns = [
  {
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

export { orderStates, columns, goodsColumns, opaColumns };
