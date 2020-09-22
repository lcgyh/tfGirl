import React from 'react';

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
      span className='click_text'
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
    dataIndex: 'spuName',
    key: 'spuName',
    align: 'center'
  },
  {
        title: '规格',
    dataIndex: 'specs',
    key: 'specs',
    align: 'center'
  },
  {
        title: '商品条码',
    dataIndex: 'barcode',
    key: 'barcode',
    align: 'center'
  },
  {
        title: '预订数量',
    dataIndex: 'qty',
    key: 'qty',
    align: 'center'
  },
  {
        title: '零售价',
    dataIndex: 'price',
    key: 'price',
    align: 'center'
  },
  {
        title: '折扣价',
    dataIndex: 'discountPrice',
    key: 'discountPrice',
    align: 'center'
  }
]

const opaColumns = [{
        title: '操作',
    dataIndex: 'opa',
    key: 'opa',
    align: 'center'
  },
  {
        title: '操作时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    align: 'center'
  },
  {
        title: '操作人',
    dataIndex: 'logOperator',
    key: 'logOperator',
    align: 'center'
  }
]

const getCurrentItem=(value,key)=>{
  if((!value && value!==0) || !key) return {}
  if(key==='orderStatus'){
    const result = orderStatusList.filter((item)=>{
      return item.value === value
    })
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
