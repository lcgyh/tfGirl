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
import { useHistory, useParams } from 'react-router-dom';
import PicturesWall from '@/components/Upload';
import DeleteDes from './components/deleteDes';
import { orderStates, goodsColumn, getGoodsColumn } from './config';
import { reqGoodsEdit, reqGoodsInfo } from './service'
import { reqProductSpecList, reqSpecAttrList, reqSpecAttrCreate,reqSpecAttrEdit } from '../specs/service'
import EditableTagGroup from './components/tag'
import { reqBrandList } from '../brand/service'
import { reqCategoryFirstList, reqCategorySecondList } from '../classify/service'
import { reqCountryData } from '../country/service'

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

const CreateGoods = () => {

  const params = useParams();
  const { spuId } = params
  const history = useHistory();
  const [form] = Form.useForm();
  const [fileImgs, setFileImgs] = useState([])
  const [dataSource, setDataSource] = useState([]);
  const [countData, setCountData] = useState([]);
  const [goodsInfo, setGoodsInfo] = useState({})
  const [goodsDes, setGoodsDes] = useState([{
    type: '2',
    value: ''
  }]);

  const [specList, setSpecList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [firstSpecList, setFirstSpecList] = useState([])
  const [secondSpecList, setSecondSpecList] = useState([])

  const [firstSpecAttrList, setFirstSpecAttrList] = useState([])
  const [secondSpecAttrList, setSecondSpecAttrList] = useState([])
  const [categoryFirst, setCategoryFirst] = useState([])
  const [categorySecond, setCategorySecond] = useState([])
  const [formData, setFormData] = useState({})
  const onFinish = async (values) => {
    console.log('Success:', values);
    await reqGoodsEdit(values)
    goBack()
    message.success('操作成功')
  };

  const getCountData = async () => {
    const result = await reqCountryData()
    setCountData(result)
  }


  const addDes = (type) => {
    const list = cloneDeep(goodsDes);
    list.push({
      type,
      value: '',
    });
    setGoodsDes(list);
  };

  const getFileListData = (data) => {
    setFileImgs(data)
  }


  const getDatasouceFileList = (index, data) => {
    console.log('index', index)
    console.log('data', data)
    if (data && data.length > 0) {
      const newDataSource = cloneDeep(dataSource)
      newDataSource[index].skuPic = data[0].url
      console.log('newDataSource--ss', newDataSource)
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

  const getGoodsInfo = async (spuId) => {
    const params = { spuId }
    const result = await reqGoodsInfo(params)
    setGoodsInfo(result)
  }

  const getSpecList = async () => {
    const result = await reqProductSpecList()
    const { specs = [] } = result
    const newSpecs1 = cloneDeep(specs)
    const newSpecs2 = cloneDeep(specs)
    for (let i = 0; i < newSpecs1.length; i++) {
      newSpecs1[i].disabled = false
    }
    for (let i = 0; i < newSpecs2.length; i++) {
      newSpecs2[i].disabled = false
    }
    setSpecList(specs)
    setFirstSpecList(newSpecs1)
    setSecondSpecList(newSpecs2)

  }
  const getSpecAttrs = async (id, type) => {
    if (!id) return
    const result = await reqSpecAttrList(id)
    if (type === '1') {
      console.log('result--', result)
      const newDataSource = cloneDeep(dataSource)
      for (var i = 0; i < newDataSource.length; i++) {
        newDataSource[i].specAttrId1 = null
      }
      setFirstSpecAttrList(result)
      setDataSource(addKey(newDataSource))
    }
    if (type === '2') {
      setSecondSpecAttrList(result)
      const newDataSource = cloneDeep(dataSource)
      for (var i = 0; i < newDataSource.length; i++) {
        newDataSource[i].specAttrId2 = null
      }
      setDataSource(addKey(newDataSource))
    }
  }


  useEffect(() => {
    if (formData.specId1) {
      getSpecAttrs(formData.specId1, '1')
    }
  }, [formData.specId1])

  useEffect(() => {
    getSpecAttrs(formData.specId2, '2')
  }, [formData.specId2])

  useEffect(() => {
    if (spuId) {
      getGoodsInfo(spuId)
    }

  }, [spuId])

  const addKey = (list) => {
    for (let i = 0; i < list.length; i++) {
      list[i].key = i + 1
    }
    return list
  }

  const addSkuItem = () => {
    if (!formData.specId1) return message.error('请选择商品规格1后再执行新增操作')
    const newDataSource = cloneDeep(dataSource)
    console.log('newDataSource--', newDataSource)
    newDataSource.push({})
    console.log('newDataSource--', newDataSource)
    setDataSource(addKey(newDataSource))
  }
  const deleteSku = (key) => {
    const newDataSource = cloneDeep(dataSource)
    const result = newDataSource.filter((item) => {
      return item.key !== key
    })
    setDataSource(addKey(result))
  }
  // 获取品牌列表
  const getBrandList = async () => {
    const result = await reqBrandList()
    setBrandList(result || [])
  }

  // 获取一级分类列表
  const getClassFirstList = async () => {
    const result = await reqCategoryFirstList()
    setCategoryFirst(result || [])

  }


  // 获取二级分类列表
  const getClassSecondList = async (value) => {
    const par = { parentCategoryId: value }
    const result = await reqCategorySecondList(par)
    setCategorySecond(result || [])
  }
  useEffect(() => {
    getBrandList()
    getSpecList()
    getCountData()
    getClassFirstList()
  }, [])


  const formChange = (e, key) => {
    const value = e && e.target ? e.target.value : e
    const newSecondSpecList = cloneDeep(secondSpecList)
    const newFirstSpecList = cloneDeep(firstSpecList)
    if (key === 'specId1') {
      for (var i = 0; i < newSecondSpecList.length; i++) {
        if (newSecondSpecList[i].specId === value) {
          newSecondSpecList[i].disabled = true
        } else {
          newSecondSpecList[i].disabled = false
        }
      }
      setSecondSpecList(newSecondSpecList)
    }
    if (key === 'specId2') {
      for (var i = 0; i < newFirstSpecList.length; i++) {
        if (newFirstSpecList[i].specId === value) {
          newFirstSpecList[i].disabled = true
        } else {
          newFirstSpecList[i].disabled = false
        }
      }
      setFirstSpecList(newFirstSpecList)
    }
    setFormData({
      ...formData,
      [key]: value
    })
  }



  const barCodeChange = (e, index) => {
    const newDataSource = cloneDeep(dataSource)
    newDataSource[index].skuBarCode = e.target.value
    setDataSource(addKey(newDataSource))
  }

  const supplyPriceChnage = (e, index) => {
    const newDataSource = cloneDeep(dataSource)
    newDataSource[index].skuSupplyPrice = e
    setDataSource(addKey(newDataSource))
  }

  const retailPriceChange = (e, index) => {
    const newDataSource = cloneDeep(dataSource)
    newDataSource[index].skuRetailPrice = e
    setDataSource(addKey(newDataSource))
  }




  const firstSpecAttrChange = (e, index) => {
    const newDataSource = cloneDeep(dataSource)
    newDataSource[index].specAttrId1 = e
    setDataSource(addKey(newDataSource))
  }
  const secondSpecAttrChange = (e, index) => {
    const newDataSource = cloneDeep(dataSource)
    newDataSource[index].specAttrId2 = e
    setDataSource(addKey(newDataSource))
  }

  const deleteSpecAttr =async (e,data, type) => {
    e.preventDefault();
    console.log('data--',data)
    // 判断当前属性在商品信息列表中是否使用，，如果已经使用，提示不能删除
    const result = dataSource.filter((item)=>{
      return item.specAttrId1===data.specAttrId || item.specAttrId2===data.specAttrId
    })
    if(result.length>0) return message.error('当前规格在本商品列表中已使用，不能删除')
    const param={
      opType:'3',
      specAttrId:data.specAttrId,
      specId:data.specId,
      specAttrName:data.specAttrName,
      specAttrStatus:data.specAttrStatus,
    }
    await reqSpecAttrEdit(param)
    if(type==='1'){
      getSpecAttrs(data.specId,'1')
    }
    if(type==='2'){
      getSpecAttrs(data.specId, '2')
    }
  }

  const addSpecAttr = async (data, type) => {
    await reqSpecAttrCreate(data)
    if (type === '1') {
      getSpecAttrs(formData.specId1, '1')
    }
    if (type === '2') {
      getSpecAttrs(formData.specId2, '2')
    }
  }

  const categoryId1Change = (e) => {
    if (e) {
      getClassSecondList(e)
    } else {
      setCategorySecond([])
    }
    form.setFieldsValue({
      categoryId2: null
    });
  }


  return (
    <PageContainer>
      <Card>
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            {...layout1}
            label="商品名称"
            name="brandName"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            {...layout1}
            label="商品品牌"
            name="spuBrandId"
            rules={[{ required: true, message: '请选择商品品牌' }]}
          >
            <Select allowClear placeholder="请选择">
              {brandList.map((item) => {
                return (
                  <Option value={item.brandId} key={item.brandId}>
                    {item.brandName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            {...layout1}
            label="商品国家"
            name="countryId"
            rules={[{ required: true, message: '请选择所属国家' }]}
          >
            <Select allowClear placeholder="请选择">
              {countData.map((item) => {
                return (
                  <Option value={item.countryId} key={item.countryId}>
                    {item.countryName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            {...layout1}
            label="一级分类"
            name="categoryId1"
            rules={[{ required: true, message: '请选择一级分类' }]}
          >
            <Select
              onChange={categoryId1Change}
              allowClear
              placeholder="请选择">
              {categoryFirst.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.categoryName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            {...layout1}
            label="二级分类"
            name="categoryId2"
            rules={[{ required: true, message: '请选择二级分类' }]}
          >
            <Select allowClear placeholder="请选择">
              {categorySecond.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.categoryName}
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
            {...layout1}
            label="商品卖点"
            name="spuSellingPoint"
            rules={[{ required: true, message: '请输入商品卖点' }]}
          >
            <TextArea placeholder="请输入" autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>

          <Form.Item
            {...layout1}
            label="卖点详情"
            name="spuSellingPoingStr"
            rules={[{ required: true, message: '请输入卖点详情' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            {...layout1}
            label="商品规格1"
            name="specId1"
            rules={[{ required: true, message: '请选择商品规格1' }]}
          >
            <Select

              onChange={(e) => { formChange(e, 'specId1') }}
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
              firstSpecAttrList && firstSpecAttrList.length > 0 ? <div style={{ marginTop: '10px' }}>
                <EditableTagGroup list={firstSpecAttrList} deleteSpecAttr={deleteSpecAttr} addSpecAttr={addSpecAttr} type='1'/>
              </div> : null
            }


          </Form.Item>
          <Form.Item
            {...layout1}
            label="商品规格2"
            name="specId2"
          >
            <Select
              onChange={(e) => { formChange(e, 'specId2') }}
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
              secondSpecAttrList && secondSpecAttrList.length > 0 ? <div style={{ marginTop: '10px' }}>
                <EditableTagGroup list={secondSpecAttrList} deleteSpecAttr={deleteSpecAttr} addSpecAttr={addSpecAttr} type='2'/>
              </div> : null
            }
          </Form.Item>
          <Form.Item label="商品信息">
            <div style={{ textAlign: 'right', marginBottom: "20px" }}>
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
            <Table dataSource={dataSource.map((item, index) => {
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
              columns={getGoodsColumn(!formData.specId2 ? 'specAttrId2' : null)} bordered />
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
