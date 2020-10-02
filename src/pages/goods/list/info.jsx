import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Table,
  Space,
  Button,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import { cloneDeep ,uniqBy} from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import PicturesWall from '@/components/Upload';
import DeleteDes from './components/deleteDes';
import {  getGoodsColumnInfo } from './config';
import { reqGoodsEdit, reqGoodsInfo } from './service'
import { reqProductSpecList, reqSpecAttrList, reqSpecAttrEdit } from '../specs/service'
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
  wrapperCol: { offset: 4, span: 16 },
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

  const [brandList, setBrandList] = useState([])
  const [firstSpecList, setFirstSpecList] = useState([])
  const [secondSpecList, setSecondSpecList] = useState([])
  const [firstSpecAttrList, setFirstSpecAttrList] = useState([])
  const [secondSpecAttrList, setSecondSpecAttrList] = useState([])
  const [categoryFirst, setCategoryFirst] = useState([])
  const [categorySecond, setCategorySecond] = useState([])
  const [formData, setFormData] = useState({
    changeDataSouse: false
  })


  const getGoodsDatas=async ()=>{
    const para=[
      reqBrandList(),
      reqProductSpecList(),
      reqCountryData(),
      reqCategoryFirstList()
    ]
    
    if(spuId){
      para.push(reqGoodsInfo({spuId})) 
    }
   
    const result =await Promise.all(para)
    const bannerResult = result[0]
    const specResult = result[1]
    const countryResult = result[2]
    const categoryResult = result[3]
    const goosInfoResult = result[4]?result[4]:{}
    setBrandList(bannerResult || [])
    const { specs = [] } = specResult
    const newSpecs1 = cloneDeep(specs)
    const newSpecs2 = cloneDeep(specs)
    for (let i = 0; i < newSpecs1.length; i++) {
      newSpecs1[i].disabled = false
    }
    for (let i = 0; i < newSpecs2.length; i++) {
      newSpecs2[i].disabled = false
    }
    setFirstSpecList(newSpecs1)
    setSecondSpecList(newSpecs2)
    setCountData(countryResult)
    setCategoryFirst(categoryResult || [])
    if(spuId){
      const { pdSkus, pdSpu } = goosInfoResult
      const {categoryId1} = pdSpu
      const par = { parentCategoryId: categoryId1 }
      const categorySecond = await reqCategorySecondList(par)
      setCategorySecond(categorySecond || [])
      setGoodsInfo(goosInfoResult)
      // for (let i = 0; i < newSpecs1.length; i++) {
      //   if(newSpecs1[i].specId===pdSpu.specId2){
      //     newSpecs1[i].disabled = true
      //   }else{
      //     newSpecs1[i].disabled = false
      //   }
      // }
      // for (let i = 0; i < newSpecs2.length; i++) {
      //   if(newSpecs2[i].specId===pdSpu.specId1){
      //     newSpecs2[i].disabled = true
      //   }else{
      //     newSpecs2[i].disabled = false
      //   }
      // }
      // setFirstSpecList(newSpecs1)
      // setSecondSpecList(newSpecs2)

      // form.setFieldsValue({
      //   spuName: pdSpu.spuName,
      //   spuBrandId: pdSpu.spuBrandId,
      //   countryId: pdSpu.countryId,
      //   categoryId1: pdSpu.categoryId1,
      //   categoryId2: pdSpu.categoryId2,
      //   spuSellingPoint: pdSpu.spuSellingPoint,
      //   spuSellingPoingStr: pdSpu.spuSellingPoingStr,
      //   specId1: pdSpu.specId1,
      //   specId2: pdSpu.specId2,
      // });
  
      const imgs = pdSpu.spuPics.map((item, index) => {
        return {
          uid: `${item}${index}`,
          status: 'done',
          url: item
        }
      })
      setFileImgs(imgs)
      setGoodsDes(pdSpu.spuDetail || [])
      setFormData({
        ...formData,
        specId1: pdSpu.specId1,
        specId2:pdSpu.specId2,
        changeDataSouse:false
      })
      setDataSource(pdSkus)
    }
  }

  const addKey = (list) => {
    const arr = list
    for (let i = 0; i < arr.length; i++) {
      arr[i].key = i + 1
    }
    return arr
  }

  const goBack = () => {
    history.goBack();
  };

  const onFinish = async (values) => {
    const spuPics = fileImgs.map((item) => {
      return item.url
    })
    if (spuPics.length < 1) return message.error('请上传商品图片')
    if (dataSource.length < 1) return message.error('请设置商品信息')


    const dataSourceValueErr = dataSource.filter((item) => {
      return !item.specAttrId1 || !item.specAttrId2 || !item.skuBarCode || !item.skuRetailPrice
    })
    if (dataSourceValueErr.length > 0) return message.error('商品信息不完整')

    const dataSourceValueErr1 = uniqBy(dataSource,(value)=>{
      return value.skuBarCode
    })
    if(dataSourceValueErr1.length !== dataSource.length)return message.error('存在相同的商品条码')
    const dataSourceValueErr2 = uniqBy(dataSource,(value)=>{
      return `${value.specAttrId1}${value.specAttrId2}`
    })
    if(dataSourceValueErr2.length !== dataSource.length)return message.error('存在相同的商品规格')
    const spuDetail = goodsDes.filter((item) => {
      return item.value
    })
    if (spuDetail.length < 1) return message.error('请至少设置一组详情')


    const param = {
      ...values,
      spuPics,
      pdPdSkuAdds: dataSource,
      spuDetail,
      opType: '1'
    }

    if(spuId){
      param.spuId = spuId
      param.opType = '2'
    }
    await reqGoodsEdit(param)
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

  const getFileListData = (data) => {
    setFileImgs(data)
  }

  const desGetFileListData = (data, index) => {
    const list = cloneDeep(goodsDes);
    list[index].value = data[0].url
    setGoodsDes(list);
  }


  const getDatasouceFileList = (index, data) => {
    if (data && data.length > 0) {
      const newDataSource = cloneDeep(dataSource)
      newDataSource[index].skuPic = data[0].url
      setDataSource(addKey(newDataSource))
    }
  }

  const deleteDes = (index) => {
    const list = cloneDeep(goodsDes);
    if (list.length < 2) return message.error('至少保留一组不能删除');
    list.splice(index, 1);
    setGoodsDes(list);
  };

  const getSpecAttrs = async (id, type, changeDataSouse) => {
    if (!id) return
    const result = await reqSpecAttrList(id)
    if (type === '1') {
      setFirstSpecAttrList(result)
      if (changeDataSouse) {
        const newDataSource = cloneDeep(dataSource)
        for (var i = 0; i < newDataSource.length; i++) {
          newDataSource[i].specAttrId1 = null
        }
        setDataSource(addKey(newDataSource))
      }

    }
    if (type === '2') {
      setSecondSpecAttrList(result)
      if (changeDataSouse) {
        const newDataSource = cloneDeep(dataSource)
        for (var i = 0; i < newDataSource.length; i++) {
          newDataSource[i].specAttrId2 = null
        }
        setDataSource(addKey(newDataSource))
      }
    }
  }

  const addSkuItem = () => {
    if (!formData.specId1) return message.error('请选择商品规格1后再执行新增操作')
    const newDataSource = cloneDeep(dataSource)
    newDataSource.push({})
    setDataSource(addKey(newDataSource))
  }
  const deleteSku = (key) => {
    const newDataSource = cloneDeep(dataSource)
    const result = newDataSource.filter((item) => {
      return item.key !== key
    })
    setDataSource(addKey(result))
  }
  const formChange = (e, key, changeDataSouse) => {
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
      [key]: value,
      changeDataSouse
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

  const deleteSpecAttr = async (e, data, type) => {
    e.preventDefault();
    // 判断当前属性在商品信息列表中是否使用，，如果已经使用，提示不能删除
    const result = dataSource.filter((item) => {
      return item.specAttrId1 === data.specAttrId || item.specAttrId2 === data.specAttrId
    })
    if (result.length > 0) return message.error('当前规格在本商品列表中已使用，不能删除')
    const param = {
      opType: '3',
      specAttrId: data.specAttrId,
      specId: data.specId,
      specAttrName: data.specAttrName,
      specAttrStatus: data.specAttrStatus,
    }
    await reqSpecAttrEdit(param)
    if (type === '1') {
      getSpecAttrs(data.specId, '1', formData.changeDataSouse)
    }
    if (type === '2') {
      getSpecAttrs(data.specId, '2', formData.changeDataSouse)
    }
  }

  // 新增规格属性
  const addSpecAttr = async (e, data, type) => {
    e.preventDefault();
    await reqSpecAttrEdit(data)
    if (type === '1') {
      getSpecAttrs(data.specId, '1', formData.changeDataSouse)
    }
    if (type === '2') {
      getSpecAttrs(data.specId, '2', formData.changeDataSouse)
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
  const desTextChange = (e, index) => {
    const value = e && e.target ? e.target.value : e
    const list = cloneDeep(goodsDes);
    list[index].value = value
    setGoodsDes(list);
  }


  useEffect(() => {
    getGoodsDatas()
  }, [spuId])

  useEffect(() => {
    if (formData.specId1) {
      getSpecAttrs(formData.specId1, '1', formData.changeDataSouse)
    }
  }, [formData.specId1])

  useEffect(() => {
    getSpecAttrs(formData.specId2, '2', formData.changeDataSouse)
  }, [formData.specId2])
  const { pdSkus, pdSpu={} } = goodsInfo

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
          >
            {pdSpu.spuName}
          </Form.Item>

          <Form.Item
            {...layout1}
            label="商品品牌"
            name="spuBrandId"
            rules={[{ required: true, message: '请选择商品品牌' }]}
          >
            {pdSpu.spuBrandId}
          </Form.Item>
          <Form.Item
            {...layout1}
            label="商品国家"
            name="countryId"
            rules={[{ required: true, message: '请选择所属国家' }]}
          >
            {pdSpu.countryId}
          </Form.Item>
          <Form.Item
            {...layout1}
            label="一级分类"
            name="categoryId1"
            rules={[{ required: true, message: '请选择一级分类' }]}
          >
             {pdSpu.categoryId1}
            
          </Form.Item>
          <Form.Item
            {...layout1}
            label="二级分类"
            name="categoryId2"
            rules={[{ required: true, message: '请选择二级分类' }]}
          >
            { pdSpu.categoryId2}
          </Form.Item>
          <Form.Item
            label="商品图片"
          >
            <PicturesWall
              fileImgs={fileImgs}
              getFileListData={getFileListData}
              imgLength={fileImgs.length}
              disabled
            />
          </Form.Item>
          <Form.Item
            {...layout1}
            label="商品卖点"
            name="spuSellingPoint"
            rules={[{ required: true, message: '请输入商品卖点' }, { max: 50, message: '请输入50字以下的商品卖点' }]}
          >
            {pdSpu.spuSellingPoint}
          </Form.Item>

          <Form.Item
            {...layout1}
            label="卖点详情"
            name="spuSellingPoingStr"
            rules={[{ required: true, message: '请输入卖点详情' }, { max: 200, message: '请输入200字以下的卖点详情' }]}
          >
            {pdSpu.spuSellingPoingStr}
          </Form.Item>

          <Form.Item
            {...layout1}
            label="商品规格1"
            name="specId1"
            rules={[{ required: true, message: '请选择商品规格1' }]}
          >
             {pdSpu.specId1Str}
          </Form.Item>

          {
            formData.specId1 ?
              <Form.Item
                {...tailLayout}
              >
                <div style={{ marginTop: '10px' }}>
                  <EditableTagGroup 
                  isNotCanEdit
                  list={firstSpecAttrList} 
                  deleteSpecAttr={deleteSpecAttr} 
                  addSpecAttr={addSpecAttr} 
                  type='1' 
                  specId={formData.specId1} />
                </div>
              </Form.Item> : null
          }
          <Form.Item
            {...layout1}
            label="商品规格2"
            name="specId2"
          >
            {pdSpu.specId2Str}
          </Form.Item>
          {
            formData.specId2 ?
              <Form.Item
                {...tailLayout}
              >
                <div style={{ marginTop: '10px' }}>
                  <EditableTagGroup isNotCanEdit list={secondSpecAttrList} deleteSpecAttr={deleteSpecAttr} addSpecAttr={addSpecAttr} type='2' specId={formData.specId2} />
                </div>
              </Form.Item> : null
          }
          <Form.Item label="商品信息">
            <Table dataSource={dataSource.map((item, index) => {
              return {
                ...item,
                key:index,
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
              columns={getGoodsColumnInfo(!formData.specId2 ? 'specAttrId2' : null)} bordered />
          </Form.Item>
          <Form.Item
            label="商品详情"
          >
            <div style={{ marginTop: '20px' }}>
              {goodsDes.map((item, index) => {
                return (
                  <div style={{ marginBottom: '10px' }} key={index}>
                    {item.type === '1' ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextArea placeholder="请输入"
                          autoSize={{ minRows: 3, maxRows: 5 }}
                          value={item.value}
                          onChange={(e) => { desTextChange(e, index) }}
                        />
                        
                      </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <PicturesWall
                            fileImgs={item.value ? [
                              {
                                uid: index,
                                status: 'done',
                                url: item.value
                              }
                            ] : []}
                            getFileListData={(data) => desGetFileListData(data, index)}
                            imgLength={1}
                          />
                        
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button  onClick={goBack}>
              返回
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default CreateGoods;
