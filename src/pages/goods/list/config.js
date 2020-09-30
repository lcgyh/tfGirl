import React, {useState,useEffect} from 'react';
import {Divider,Image,Select,Input,InputNumber} from 'antd';
import PicturesWall from '@/components/Upload';

const { Option } = Select;


const orderStates = [{
  name: '待支付',
  value: '1',
}, ];

const spuStatusOpation=[{
  name: '售卖',
  value: '1',
},{
  name: '停售',
  value: '2',
}]

const skuStatusOpation=[{
  name: '上线',
  value: '1',
},{
  name: '下线',
  value: '2',
}]


const columns = [{
    title: 'skuPic',
    dataIndex: 'skuPic',
    width: '10%',
    key: 'skuPic',
    align: 'center',
    render: (text, record) => <Image width={100} src={text}/>,
  },
  {
    title: 'SPUID',
    dataIndex: 'spuId',
    key: 'spuId',
    align: 'center',
    width: '5%',
  },
  {
    title: 'SKUID',
    dataIndex: 'skuId',
    key: 'skuId',
    align: 'center',
    width: '5%',
  },
  {
    title: '商品名称',
    dataIndex: 'spuName',
    key: 'spuName',
    align: 'center',
    width: '10%',
  },
  {
    title: '商品规格',
    dataIndex: 'specAttrStr',
    key: 'specAttrStr',
    align: 'center',
    width: '10%',
  },
  {
    title: '商品条码',
    dataIndex: 'skuBarCode',
    key: 'skuBarCode',
    align: 'center',
    width: '10%',
  },

  {
    title: '一级分类',
    dataIndex: 'categoryName1',
    key: 'categoryName1',
    align: 'center',
    width: '6%',
  },
  {
    title: '二级分类',
    dataIndex: 'categoryName2',
    key: 'categoryName2',
    align: 'center',
    width: '6%',
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
    key: 'brandName',
    align: 'center',
    width: '10%',
  },


  {
    title: '供价',
    dataIndex: 'skuSupplyPrice',
    key: 'skuSupplyPrice',
    align: 'center',
    width: '5%',
  },
  {
    title: '售价',
    dataIndex: 'skuRetailPrice',
    key: 'skuRetailPrice',
    align: 'center',
    width: '5%',
  },
  {
    title: '库存',
    dataIndex: 'storeQty',
    key: 'storeQty',
    align: 'center',
    width: '5%',
    render:(text,record)=>{
      return <span className = 'click_text' onClick={()=>{record.goInv(record)}}>{text || 0}</span>
    }
  },
  {
    title: '操作',
    dataIndex: 'opa',
    key: 'opa',
    align: 'center',
    width: '13%',
    render: (text, record) => {
      return ( <div >
        <span className = 'click_text' onClick = {() => record.goEdit(record)} >
        编辑 
        </span>
         <Divider type = "vertical" / >
           
        <span className = 'click_text'
            onClick = {() => record.goInfo(record)} > 
        详情 
        </span>
        <Divider type = "vertical" / >
        <span className = 'click_text' onClick = {() => record.goLog(record)} > 
        日志
         </span>
      </div>
      );
    },
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



const logColumns = [{
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

const getSouTitle=(title)=>{
    return <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{title}<span style={{color:'red',marginLeft:'3px'}}>*</span></div>
}


const goodsColumn=[
      {
        title: getSouTitle('商品规格1'),
        dataIndex: 'specAttrId1',
        key: 'specAttrId1',
        align: 'center',
        width:'15%',
        render:(text,record,index)=>{
          return (<Select 
          onChange={(e)=>record.firstSpecAttrChange(e,index)} value={text}>
            {
            record.firstSpecAttrList?record.firstSpecAttrList.map((item)=>{
              return(
                <Option value={item.specAttrId} key={item.specAttrId}>
                {item.specAttrName}
              </Option>
              )
              }):null
            }
        </Select>)
        }
      },
      {
        title: getSouTitle('商品规格2'),
        dataIndex: 'specAttrId2',
        key: 'specAttrId2',
        align: 'center',
        width:'15%',
        render:(text,record,index)=>{
          return <Select 
          onChange={(e)=>record.secondSpecAttrChange(e,index)} value={text}>
          >
            {
              record.secondSpecAttrList?record.secondSpecAttrList.map((item)=>{
              return  <Option value={item.specAttrId} key={item.specAttrId}>{item.specAttrName}</Option>
              }):null
            }
         
         
        </Select>
        }
      },
      {
        title: getSouTitle('商品条码'),
        dataIndex: 'skuBarCode',
        key: 'skuBarCode',
        align: 'center',
        width:'20%',
        render:(text,record,index)=>{
          return <Input value={text} onChange={(e)=>{record.barCodeChange(e,index)}}/>
        }
      },
      {
        title: '供货价',
        dataIndex: 'skuSupplyPrice',
        key: 'skuSupplyPrice',
        align: 'center',
        width:'10%',
        render:(text,record,index)=>{
          return <InputNumber value={text} onChange={(e)=>{record.supplyPriceChnage(e,index)}}/>
        }
      },
      {
        title: getSouTitle('零售价'),
        dataIndex: 'skuRetailPrice',
        key: 'skuRetailPrice',
        align: 'center',
        width:'10%',
        render:(text,record,index)=>{
          return <InputNumber value={text} onChange={(e)=>{record.retailPriceChange(e,index)}}/>
        }
      },
      {
        title: '商品图片',
        dataIndex: 'skuPic',
        key: 'skuPic',
        width:'20%',
        align: 'center',
        render:(text,record,index)=>{
          return <PicturesWall
            fileImgs={ text? [{
              url:text,
              uid: '-1',
              status: 'done',
            }]:[]}
              getFileListData={(data)=>record.getDatasouceFileList(index,data)}
              imgLength={1}
          />
        }

      },
      {
        title: '操作',
        dataIndex: 'opa',
        key: 'opa',
        width:'10%',
        align: 'center',
        render:(text,record)=>{
          return <span className='click_text' onClick={()=>record.deleteSku(record.key)}> 删除 </span>
        }
      }
    ]

const getGoodsColumn=(col)=>{
  if(col){
    const result = goodsColumn.filter((item)=>{
      return item.dataIndex !==col
    })
    return result
  }
  return goodsColumn
}





      

    


export {
  orderStates,
  columns,
  goodsColumns,
  opaColumns,
  logColumns,
  spuStatusOpation,
  skuStatusOpation,
  goodsColumn,
  getGoodsColumn
};
