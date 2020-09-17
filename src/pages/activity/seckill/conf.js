const orderStates = [
  {
    name: '待支付',
    value: '1',
  },
];

const goodsInfoColumns = [
  {
    title: '商品条码',
    dataIndex: 'addresss',
    key: 'address14',
    align: 'center',
  },
  {
    title: '供货价',
    dataIndex: 'address141',
    key: 'address141',
    align: 'center',
  },
  {
    title: '零售价',
    dataIndex: 'address142',
    key: 'address142',
    align: 'center',
  },
  {
    title: '商品价格',
    dataIndex: 'address143',
    key: 'address143',
    align: 'center',
  },
];

const columns = [
  {
    title: '秒杀ID',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    
  },
  {
    title: '活动名称',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
  },
  {
    title: 'SPUID',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
  },
  {
    title: '商品名称',
    dataIndex: 'address1',
    key: 'address1',
    align: 'center',
  },
  {
    title: '秒杀时间段',
    dataIndex: 'address12',
    key: 'address12',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'address13',
    key: 'address13',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'address14',
    key: 'address14',
    align: 'center',
    render: (text, record) => (
      <span
        style={{
          color: '#1890ff',
          cursor: 'pointer',
        }}
        onClick={() => {
          record.goInfo(record);
        }}
      >
        编辑
      </span>
    ),
  },
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

export { orderStates, columns, goodsColumns, opaColumns ,goodsInfoColumns};
