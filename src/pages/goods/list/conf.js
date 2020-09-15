import { Divider } from 'antd';

const orderStates = [
  {
    name: '待支付',
    value: '1',
  },
];

const columns = [
  {
    title: 'SKU图片',
    dataIndex: 'name',
    width: '10%',
    key: 'name',
    align: 'center',
    render: (text, record) => <span> {text} </span>,
  },
  {
    title: 'SPUID',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
    width: '5%',
  },
  {
    title: 'SKUID',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
    width: '5%',
  },
  {
    title: '商品名称',
    dataIndex: 'address1',
    key: 'address1',
    align: 'center',
    width: '10%',
  },
  {
    title: '商品规格',
    dataIndex: 'address12',
    key: 'address12',
    align: 'center',
    width: '10%',
  },
  {
    title: '商品条码',
    dataIndex: 'address13',
    key: 'address13',
    align: 'center',
    width: '10%',
  },
  {
    title: '品牌',
    dataIndex: 'address14',
    key: 'address14',
    align: 'center',
    width: '10%',
  },
  {
    title: '供价',
    dataIndex: 'address14',
    key: 'address14',
    align: 'center',
    width: '5%',
  },
  {
    title: '售价',
    dataIndex: 'address14',
    key: 'address14',
    align: 'center',
    width: '5%',
  },
  {
    title: '库存',
    dataIndex: 'address14',
    key: 'address14',
    align: 'center',
    width: '5%',
  },
  {
    title: 'SPU状态',
    dataIndex: 'address14',
    key: 'address14',
    align: 'center',
    width: '6%',
  },
  {
    title: 'SKU状态',
    dataIndex: 'address14',
    key: 'address14',
    align: 'center',
    width: '6%',
  },
  {
    title: '操作',
    dataIndex: 'address14',
    key: 'address14',
    align: 'center',
    width: '13%',
    render: (text, record) => {
      return (
        <div>
          <span
            style={{
              color: '#1890ff',
              cursor: 'pointer',
            }}
            onClick={() => record.goEdit()}
          >
            {' '}
            编辑{' '}
          </span>{' '}
          <Divider type="vertical" />
          <span
            style={{
              color: '#1890ff',
              cursor: 'pointer',
            }}
            onClick={() => record.goInfo()}
          >
            {' '}
            详情{' '}
          </span>{' '}
          <Divider type="vertical" />
          <span
            style={{
              color: '#1890ff',
              cursor: 'pointer',
            }}
            onClick={() => record.goLog()}
          >
            {' '}
            日志{' '}
          </span>{' '}
        </div>
      );
    },
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
    title: '商品图片',
    dataIndex: 'address143',
    key: 'address143',
    align: 'center',
  },
];

const logColumns = [
  {
    title: '操作类型',
    dataIndex: 'addresss',
    key: 'address14',
    align: 'center',
  },
  {
    title: '操作描述',
    dataIndex: 'address141',
    key: 'address141',
    align: 'center',
  },
  {
    title: '操作时间',
    dataIndex: 'address142',
    key: 'address142',
    align: 'center',
  },
  {
    title: '操作人',
    dataIndex: 'address143',
    key: 'address143',
    align: 'center',
  },
];

export { orderStates, columns, goodsColumns, opaColumns, goodsInfoColumns, logColumns };
