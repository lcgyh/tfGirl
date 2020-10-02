import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'react-router-dom';
import { Card, Table, Space, Button, Input, Select, message } from 'antd';
import apiGetData from '@/utils/apiMeth'
import FormItemBySelf from '@/components/formItemBySelf';
import Delivery from './components/delivery';
import { columns, spuStatusOpation, skuStatusOpation } from './config';
import styles from './style.less';
import { reqBrandList } from '../brand/service'
import { reqCategoryFirstList, reqCategorySecondList } from '../classify/service'
import {reqGoodsState} from './service'


const { Option } = Select;
const GoodsList = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({})
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const [dataSource, setDataSource] = useState([]);
  const [visibleData, setVisibleData] = useState({
    visible: false,
    record: {},
  });

  const [brandList, setBrandList] = useState([])
  const [categoryFirst, setCategoryFirst] = useState([])
  const [categorySecond, setCategorySecond] = useState([])

  // 查询列表
  const getDataList = async (formData = {}, page = {}) => {
    const param = {
      ...formData,
      pageSize: page.pageSize || 10,
      current: page.current || 1,
    };
    const result = await apiGetData('GET', '/erp/v1/product', param)
    const { list, pageSize, pageNum, total } = result
    // 请求数据
    setDataSource(list)
    setPagination({
      ...pagination,
      total,
      pageSize,
      current: pageNum
    })
  };
  const pageChange = (page) => {
    getDataList(searchParam, page);
  };

   // 获取二级分类列表
   const getClassSecondList = async (value) => {
    const params = { parentCategoryId: value }
    const result = await reqCategorySecondList(params)
    setCategorySecond(result || [])
  }
  const onChange = (e, key) => {
    if(key==='categoryId1'){
        if(e){
          getClassSecondList(e)
        }else{
          setCategorySecond([])
        }
        setFormData({
          ...formData,
          [key]: e && e.target ? e.target.value : e,
          categoryId2:null
        });

    }else{
      setFormData({
        ...formData,
        [key]: e && e.target ? e.target.value : e
      });
    }
  }


  const rowSelection = {
    onChange: (rowKeys, rows) => {
      setSelectedRowKeys(rowKeys);
    }
  };

  const goGoCreate = () => {
    history.push('/goods/create');
  };

  const goInfo = (record) => {
    history.push(`/goods/info/${record.spuId}`);
  };
  const goEdit = (record) => {
    history.push(`/goods/edit/${record.spuId}`);
  };
  const goLog = (record) => {
    history.push(`/goods/log/${record.skuId}`);
  };

  const goInv = (record) => {
    window.open(`/goods/inventory?skuId=${record.skuId}`);
  };


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
 

  useEffect(() => {
    getBrandList()
    getClassFirstList()
    getDataList()
  }, []);

  // 售卖或者停售
  

  const onGoodsState = async (type) =>{
    console.log('opType--',type)
    console.log('selectedRowKeys',selectedRowKeys)
    if(selectedRowKeys.length<1) return message.error('请选择操作的商品')
    const params={
      opType:type,
      spuSkuIds:selectedRowKeys
    }
    console.log(params)
    await reqGoodsState(params)
    if(type==='1') return message.success('SPU售卖成功')
    if(type==='2') return message.success('SPU停售成功')
    if(type==='3') return message.success('SKU上线成功')
    if(type==='4') return message.success('SKU下线成功')
    getDataList()
  }
  
  return (
    <PageContainer>
      <Card>
        <Space style={{ flexWrap: 'wrap' }}>
          <FormItemBySelf label="SPUID" width="100">
            <Input
              onChange={(e) => {
                onChange(e, 'spuId');
              }}
              value={formData.spuId}
              placeholder="请输入"
              className={styles.itemLabel_input}
            />
          </FormItemBySelf>
          <FormItemBySelf label="商品条码" width="100">
            <Input
              onChange={(e) => {
                onChange(e, 'barCode');
              }}
              value={formData.barCode}
              placeholder="请输入"
              className={styles.itemLabel_input}
            />
          </FormItemBySelf>
          <FormItemBySelf label="商品名称" width="100">
            <Input
              onChange={(e) => {
                onChange(e, 'spuName');
              }}
              value={formData.spuName}
              placeholder="请输入"
              className={styles.itemLabel_input}
            />
          </FormItemBySelf>
          <FormItemBySelf label="商品品牌" width="100">
            <Select className={styles.itemLabel_input}
              allowClear
              onChange={(e) => {
                onChange(e, 'brandId');
              }}
              value={formData.brandId}
              placeholder="请选择">
              {brandList.map((item) => {
                return (
                  <Option value={item.brandId} key={item.brandId}>
                    {item.brandName}
                  </Option>
                );
              })}
            </Select>
          </FormItemBySelf>
          <FormItemBySelf label="一级分类" width="100">
            <Select className={styles.itemLabel_input}
              onChange={(e) => {
                onChange(e, 'categoryId1');
              }}
              value={formData.categoryId1}
              allowClear placeholder="请选择">
              {categoryFirst.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.categoryName}
                  </Option>
                );
              })}
            </Select>
          </FormItemBySelf>
          <FormItemBySelf label="二级分类" width="100">
            <Select className={styles.itemLabel_input}
              onChange={(e) => {
                onChange(e, 'categoryId2');
              }}
              value={formData.categoryId2}
              allowClear
              placeholder="请选择">
              {categorySecond.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.categoryName}
                  </Option>
                );
              })}
            </Select>
          </FormItemBySelf>
          <FormItemBySelf label="SKUID" width="100">
            <Input
              onChange={(e) => {
                onChange(e, 'skuId');
              }}
              value={formData.skuId}
              placeholder="请输入"
              className={styles.itemLabel_input}
            />
          </FormItemBySelf>
          <FormItemBySelf label="上线状态" width="100">
            <Select className={styles.itemLabel_input}
              allowClear
              onChange={(e) => {
                onChange(e, 'skuStatus');
              }}
              value={formData.skuStatus}
              placeholder="请选择">
              {spuStatusOpation.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </FormItemBySelf>

          <FormItemBySelf label="售卖状态" width="100">
            <Select className={styles.itemLabel_input}
              allowClear
              onChange={(e) => {
                onChange(e, 'spuStatus');
              }}
              value={formData.spuStatus}
              placeholder="请选择">
              {skuStatusOpation.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </FormItemBySelf>
        </Space>

        <div className={styles.search_btns}>
          <Button type="primary" className={styles.search_btn} onClick={() => getDataList(formData)}>
            查询
        </Button>
          <Button
            onClick={() => {
              setFormData({});
            }}
          >
            重置
        </Button>
        </div>
      </Card>
      <Card
        className={styles.table_con}
        title="查询列表"
        extra={
          <div>
            <Space>
              <Button type="primary" onClick={() => goGoCreate()}>
                新增商品
              </Button>
              <Button type="primary" onClick={()=>onGoodsState('1')}>SPU售卖</Button>
              <Button type="primary" onClick={()=>onGoodsState('2')}>SPU停卖</Button>
              <Button type="primary" onClick={()=>onGoodsState('3')}>SKU上线</Button>
              <Button type="primary" onClick={()=>onGoodsState('4')}>SKU下线</Button>
            </Space>
          </div>
        }
      >
        <Table
          dataSource={dataSource.map((item) => {
            return {
              ...item,
              goInfo,
              goEdit,
              goLog,
              goInv,
              key: item.skuId,
            };
          })}
          columns={columns}
          bordered
          onChange={pageChange}
          scroll={{ x: 1600 }}
          rowSelection={{
            ...rowSelection,
          }}
          pagination={pagination}
        />
      </Card>
      <Delivery visibleData={visibleData} setVisibleData={setVisibleData} />
    </PageContainer>
  );
};

export default GoodsList;
