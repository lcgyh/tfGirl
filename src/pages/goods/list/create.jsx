import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Table,
  Space,
  Button,
  Descriptions,
  Form,
  Input,
  Checkbox,
  Select,
  message,
} from 'antd';
import { cloneDeep } from 'lodash';
import { useHistory,useParams } from 'react-router-dom';
import PicturesWall from '@/components/Upload';
import DeleteDes from './components/deleteDes';
import { orderStates, goodsColumn,getGoodsColumn } from './config';
import {reqGoodsEdit,reqGoodsInfo} from './service'
import {reqProductSpecList,reqSpecAttrList,reqSpecAttrCreate} from '../specs/service'
import EditableTagGroup from './components/tag'


const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

const CreateGoods = () => {
  const params = useParams();
  const { spuId } = params
  const history = useHistory();
  const [fileImgs,setFileImgs] = useState([])
  const [dataSource, setDataSource] = useState([]);
  const [goodsInfo,setGoodsInfo] = useState({})
  const [goodsDes, setGoodsDes] = useState([{
    type:'2',
    value:''
  }]);

  const [specList,setSpecList]=useState([])

  const [firstSpecList,setFirstSpecList]=useState([])
  const [secondSpecList,setSecondSpecList]=useState([])

  const [firstSpecAttrList,setFirstSpecAttrList]=useState([])
  const [secondSpecAttrList,setSecondSpecAttrList]=useState([])
  const [formData,setFormData] =useState({})
  const onFinish =async (values) => {
    console.log('Success:', values);
    await reqGoodsEdit(values)
    goBack()
    message.success('操作成功')
  };


  const addDes = (type) => {
    const list = cloneDeep(goodsDes);
    list.push({
      type,
      value: '',
    });
    setGoodsDes(list);
  };

  const getFileListData=(data)=>{
    setFileImgs(data)
  }


  const getDatasouceFileList=(index,data)=>{
      console.log('index',index)
      console.log('data',data)
      if(data && data.length>0){
        const newDataSource = cloneDeep(dataSource) 
        newDataSource[index].skuPic =data[0].url
        console.log('newDataSource--ss',newDataSource)
        setDataSource(addKey(newDataSource))
      }
  }

  const deleteDes = (index) => {
    const list = cloneDeep(goodsDes);
    if (list.length < 2) return message.error('至少保留一组不能删除');
    list.splice(index, 1);
    setGoodsDes(list);
  };

  const goBack = () => {
    history.goBack();
  };

  const getGoodsInfo=async (spuId)=>{
    const params={spuId}
    const result =await reqGoodsInfo(params)
    setGoodsInfo(result)
  }

  const getSpecList=async ()=>{
    const result =await reqProductSpecList()
    const {specs=[]}= result
    const newSpecs1 = cloneDeep(specs)
    const newSpecs2= cloneDeep(specs)
    for(let i=0;i<newSpecs1.length;i++){
      newSpecs1[i].disabled = false
    }
    for(let i=0;i<newSpecs2.length;i++){
      newSpecs2[i].disabled = false
    }
    setSpecList(specs)
    setFirstSpecList(newSpecs1)
    setSecondSpecList(newSpecs2)

  }
  const getSpecAttrs=async (id,type)=>{
    if(!id) return
    const result = await reqSpecAttrList(id)
    if(type==='1'){
      console.log('result--',result)
      const newDataSource = cloneDeep(dataSource) 
      for(var i=0;i<newDataSource.length;i++){
        newDataSource[i].specAttrId1 =null
      }
      setFirstSpecAttrList(result)
      setDataSource(addKey(newDataSource))
    }
    if(type==='2'){
      setSecondSpecAttrList(result)
      const newDataSource = cloneDeep(dataSource) 
      for(var i=0;i<newDataSource.length;i++){
        newDataSource[i].specAttrId2 =null
      }
      setDataSource(addKey(newDataSource))
    }
  }


  useEffect(()=>{
    if(formData.specId1){
       getSpecAttrs(formData.specId1,'1')
    }
  },[formData.specId1])

  useEffect(()=>{
    getSpecAttrs(formData.specId2,'2')
  },[formData.specId2])

  useEffect(()=>{
    if(spuId){
      getGoodsInfo(spuId)
    }

  },[spuId])

  const addKey=(list)=>{
    for(let i=0;i<list.length;i++){
      list[i].key=i+1
    }
    return list
  }

  const addSkuItem=()=>{
    if(!formData.specId1) return message.error('请选择商品规格1后再执行新增操作')
    const newDataSource = cloneDeep(dataSource) 
    console.log('newDataSource--',newDataSource)
    newDataSource.push({})
    console.log('newDataSource--',newDataSource)
    setDataSource(addKey(newDataSource))
  }
  const deleteSku=(key)=>{
    const newDataSource = cloneDeep(dataSource) 
    const result = newDataSource.filter((item)=>{
      return item.key!==key
    })
    setDataSource(addKey(result))
  }


  useEffect(()=>{
    getSpecList()
  },[])


  const formChange=(e,key)=>{
    const value = e && e.target ?e.target.value:e
    const newSecondSpecList = cloneDeep(secondSpecList)
    const newFirstSpecList = cloneDeep(firstSpecList)
    if(key==='specId1'){
      for(var i=0;i<newSecondSpecList.length;i++){
        if(newSecondSpecList[i].specId===value){
          newSecondSpecList[i].disabled=true
        }else{
          newSecondSpecList[i].disabled=false
        }
      }
      setSecondSpecList(newSecondSpecList)
    }
    if(key==='specId2'){
      for(var i=0;i<newFirstSpecList.length;i++){
        if(newFirstSpecList[i].specId===value){
          newFirstSpecList[i].disabled=true
        }else{
          newFirstSpecList[i].disabled=false
        }
      }
      setFirstSpecList(newFirstSpecList)
    }
    setFormData({
      ...formData,
      [key]:value
    })
  }


  const barCodeChange=(e,index)=>{
    const newDataSource = cloneDeep(dataSource) 
    newDataSource[index].skuBarCode = e.target.value
    setDataSource(addKey(newDataSource))
  }

  const supplyPriceChnage=(e,index)=>{
    const newDataSource = cloneDeep(dataSource) 
    newDataSource[index].skuSupplyPrice = e
    setDataSource(addKey(newDataSource))
  }

  const retailPriceChange=(e,index)=>{
    const newDataSource = cloneDeep(dataSource) 
    newDataSource[index].skuRetailPrice = e
    setDataSource(addKey(newDataSource))
  }




  const firstSpecAttrChange=(e,index)=>{
    const newDataSource = cloneDeep(dataSource) 
    newDataSource[index].specAttrId1 = e
    setDataSource(addKey(newDataSource))
  } 
  const secondSpecAttrChange=(e,index)=>{
    const newDataSource = cloneDeep(dataSource) 
    newDataSource[index].specAttrId2 = e
    setDataSource(addKey(newDataSource))
  }

const deleteSpecAttr=(data,type)=>{
  // 这里的type是为了区分规格1的属性还是规格2的属性
  // 根据参数删除tage接口
  // 重新获取一下心得属性数据
  // set 新的属性数据 setFirstSpecAttrList()

}

const addSpecAttr=async (data,type)=>{
  await reqSpecAttrCreate(data)
  if(type==='1'){
    getSpecAttrs(formData.specId1,'1')
  }
  if(type==='2'){
    getSpecAttrs(formData.specId2,'2')
  }
}


  return (
    <PageContainer>
      <Card>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="商品名称"
            name="brandName"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="商品品牌"
            name="spuBrandId"
            rules={[{ required: true, message: '请选择商品品牌' }]}
          >
            <Select  allowClear placeholder="请选择">
              {orderStates.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="商品国家"
            name="countryId"
            rules={[{ required: true, message: '请选择所属国家' }]}
          >
            <Select  allowClear placeholder="请选择">
              {orderStates.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="一级分类"
            name="categoryId1"
            rules={[{ required: true, message: '请选择一级分类' }]}
          >
            <Select 
                  
                  allowClear placeholder="请选择">
              {orderStates.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="二级分类"
            name="categoryId2"
            rules={[{ required: true, message: '请选择二级分类' }]}
          >
            <Select  allowClear placeholder="请选择">
              {orderStates.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="商品图片"
          >
            <PicturesWall
              fileImgs={fileImgs}
              getFileListData={getFileListData}
              imgLength={10}
            />
          </Form.Item>
          <Form.Item
            label="商品卖点"
            name="spuSellingPoint"
            rules={[{ required: true, message: '请输入商品卖点' }]}
          >
            <TextArea placeholder="请输入" autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>

          <Form.Item
            label="卖点详情"
            name="spuSellingPoingStr"
            rules={[{ required: true, message: '请输入卖点详情' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="商品规格1"
            name="specId1"
            rules={[{ required: true, message: '请选择商品规格1' }]}
          >
            <Select 
                     
                    onChange={(e)=>{formChange(e,'specId1')}}
                    placeholder="请选择">
              {firstSpecList.map((item) => {
                return (
                  <Option 
                  value={item.specId} 
                  key={item.specId} 
                  disabled={item.disabled}>
                    {item.specName}
                  </Option>
                );
              })}
            </Select>
            {
              firstSpecAttrList && firstSpecAttrList.length>0?<div style={{marginTop:'10px'}}>
              <EditableTagGroup list={firstSpecAttrList} deleteSpecAttr={deleteSpecAttr} addSpecAttr={addSpecAttr}/>
              </div>:null
            }
            
            
          </Form.Item>
          <Form.Item
            label="商品规格2"
            name="specId2"
          >
            <Select 
              onChange={(e)=>{formChange(e,'specId2')}}
              allowClear placeholder="请选择">
              {secondSpecList.map((item) => {
                return (
                  <Option 
                    value={item.specId} 
                    disabled={item.disabled}
                    key={item.specId}>
                    {item.specName}
                  </Option>
                );
              })}
            </Select>
            {
              secondSpecAttrList && secondSpecAttrList.length>0?<div style={{marginTop:'10px'}}>
              <EditableTagGroup list={secondSpecAttrList} deleteSpecAttr={deleteSpecAttr} addSpecAttr={addSpecAttr}/>
              </div>:null
            }
          </Form.Item>
          <Form.Item label="商品信息">
            <div style={{textAlign:'right',marginBottom:"20px"}}>
            <Button
                onClick={() => {
                  addSkuItem();
                }}
                type="primary"
                ghost
              >
                新增SKU
              </Button>
            </div>
            <Table dataSource={dataSource.map((item,index)=>{
              return {
                ...item,
                deleteSku,
                firstSpecAttrList,
                secondSpecAttrList,
                firstSpecAttrChange,
                secondSpecAttrChange,
                barCodeChange,
                supplyPriceChnage,
                retailPriceChange,
                getDatasouceFileList
              }
            })} 
            pagination={false}
            columns={getGoodsColumn(!formData.specId2?'specAttrId2':null)} bordered />
          </Form.Item>
          <Form.Item
            label="商品详情"
          >
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => {
                  addDes('1');
                }}
                type="primary"
                ghost
              >
                新增图片
              </Button>
              <Button
                onClick={() => {
                  addDes('2');
                }}
                type="primary"
                ghost
              >
                新增文本
              </Button>
            </Space>
            <div style={{ marginTop: '20px' }}>
              {goodsDes.map((item, index) => {
                return (
                  <div style={{ marginBottom: '10px' }}>
                    {item.type === '1' ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextArea placeholder="请输入" autoSize={{ minRows: 3, maxRows: 5 }} />
                        <DeleteDes deleteOption={deleteDes} index={index} />
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <PicturesWall 
                        fileImgs={fileImgs}
                        getFileListData={getFileListData}
                        imgLength={1}
                        />
                        <DeleteDes deleteOption={deleteDes} index={index} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button style={{ marginLeft: '20px' }} onClick={goBack}>
              返回
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CreateGoods;
