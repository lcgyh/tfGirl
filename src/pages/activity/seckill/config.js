const skillStatusList = [{
    name: '展示',
    value: '1',
  },
  {
    name: '不展示',
    value: '2',
  },
];

const goodsInfoColumns = [{
    title: '商品条码',
    dataIndex: 'skuBarCode',
    key: 'skuBarCode',
    align: 'center',
  },
  {
    title: '供货价',
    dataIndex: 'skuSupplyPrice',
    key: 'skuSupplyPrice',
    align: 'center',
  },
  {
    title: '零售价',
    dataIndex: 'skuRetailPrice',
    key: 'skuRetailPrice',
    align: 'center',
  },
  {
    title: '秒杀价格',
    dataIndex: 'skillPrice',
    key: 'skillPrice',
    align: 'center',
    render: (text) => {
      return <Input placeholder = "请输入"
      value = {
        text
      }
      />
    }
  },
];

const getColumns = (specId1Str, specId2Str) => {
  const goodsSpecColumns = [{
      title: specId1Str,
      dataIndex: 'specAttrId1',
      key: 'specAttrId1',
      align: 'center',
      colSpan: !specId1Str ? 0 : 1
    },
    {
      title: specId2Str,
      dataIndex: 'specAttr2Str',
      key: 'specAttr2Str',
      align: 'center',
      colSpan: !specId2Str ? 0 : 1
    }
  ]
  return goodsSpecColumns.concat(goodsInfoColumns)
}




const columns = [{
    title: '秒杀ID',
    dataIndex: 'skillId',
    key: 'skillId',
    align: 'center',

  },
  {
    title: '活动名称',
    dataIndex: 'skillName',
    key: 'skillName',
    align: 'center',
  },
  {
    title: 'SPUID',
    dataIndex: 'spuId',
    key: 'spuId',
    align: 'center',
  },
  {
    title: '商品名称',
    dataIndex: 'spuName',
    key: 'spuName',
    align: 'center',
  },
  {
    title: '秒杀时间段',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
    render: (text, record) => < span > {
      `${record.startTime}-${record.endTime}`
    } < /span>
  },
  {
    title: '状态',
    dataIndex: 'skillStatusStr',
    key: 'skillStatusStr',
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
          record.goInfo(record);
        }
      } >
      编辑 <
      /span>
    ),
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
  skillStatusList,
  columns,
  goodsColumns,
  opaColumns,
  goodsInfoColumns,
  getColumns
};
