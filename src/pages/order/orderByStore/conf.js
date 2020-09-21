const orderStatusList = [{
  name: '待支付',
  value: '10'
}, {
  name: '待发货',
  value: '20'
}, {
  name: '已发货',
  value: '30'
}, {
  name: '已取消',
  value: '70'
}]

const columns = [{
  title: '订单号',
  dataIndex: 'orderNo',
  key: 'orderNo',
  align: 'center',
  render: (text, record) =>
    <
      span style={
        {
          color: "#1890ff",
          cursor: 'pointer'
        }
      }
      onClick={
        () => {
          record.goInfo(record)
        }
      } > {
        text
      } <
    /span>
  },
  {
        title: '门店名称',
    dataIndex: 'shopName',
    key: 'shopName',
    align: 'center'
  },
  {
        title: '品牌',
    dataIndex: 'brandName',
    key: 'brandName',
    align: 'center'
  },
  {
        title: '订单金额',
    dataIndex: 'orderAmount',
    key: 'orderAmount',
    align: 'center'
  },
  {
        title: '订单状态',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    align: 'center',
    render:(text)=><span>{getCurrentItem(text, 'orderStatus').name}</span>
  },
  {
        title: '下单时间',
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center'
  },
  {
        title: '发货时间',
    dataIndex: 'deliveryTime',
    key: 'deliveryTime',
    align: 'center'
  }
];

const goodsColumns = [{
        title: '商品名称',
    dataIndex: 'address13',
    key: 'address13',
    align: 'center'
  },
  {
        title: '规格',
    dataIndex: 'address14',
    key: 'address14',
    align: 'center'
  },
  {
        title: '商品条码',
    dataIndex: 'addresss',
    key: 'address14',
    align: 'center'
  },
  {
        title: '预订数量',
    dataIndex: 'addre1ss',
    key: 'address14',
    align: 'center'
  },
  {
        title: '零售价',
    dataIndex: 'address1',
    key: 'address14',
    align: 'center'
  },
  {
        title: '折扣价',
    dataIndex: 'address11',
    key: 'address14',
    align: 'center'
  }
]

const opaColumns = [{
        title: '操作',
    dataIndex: 'address13',
    key: 'address13',
    align: 'center'
  },
  {
        title: '操作时间',
    dataIndex: 'address14',
    key: 'address141',
    align: 'center'
  },
  {
        title: '操作人',
    dataIndex: 'addresss',
    key: 'address14',
    align: 'center'
  }
]

const getCurrentItem=(value,key)=>{
        console.log('value--', value)
  console.log('key--',key)
  if((!value && value!==0) || !key) return {}
  if(key==='orderStatus'){
    const result = orderStatusList.filter((item)=>{
      return item.value === value
    })
    console.log('result--',result)
    if(result.length>0){
      return result[0]
    }
  }
  return {}
}


export {
        orderStatusList,
        columns,
        goodsColumns,
        opaColumns,
        getCurrentItem
      }
