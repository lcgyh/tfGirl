import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Space, Button,Input } from 'antd';
import FormItemBySelf from '@/components/formItemBySelf';
import Delivery from './components/delivery';
import DeliverySecond from './components/deliverySecond'
import styles from './style.less';
import BlockList from './components/list';
import {reqCategoryListData} from './service'


const OrderByStore = () => {
  const [formData,setFormData] = useState({})
  const [dataSource, setDataSource] = useState([]);
  const [visibleData, setVisibleData] = useState({
    visible: false,
    record: {},
  });
  const [visibleSecondData, setVisibleSecondData] = useState({
    visible: false,
    record: {},
  });
  const initData={
    categoryName:null,
    categoryStatus:1
  }

  // 查询列表
  const getDataList =async () => {
    const param = {
      ...formData,
    };
    const result =await reqCategoryListData(param)
    setDataSource(result || [])
  };
  const onChange = (e,key) => {
    setFormData({
      ...formData,
      [key]: e && e.target ? e.target.value : e,
    });
  };
  useEffect(() => {
    getDataList()
  }, []);

  
  return (
    <PageContainer>
     <Card>
      <Space style={{ flexWrap: 'wrap' }}>
        <FormItemBySelf label="一级分类" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'categoryFirstName');
            }}
            placeholder="请输入"
            className={styles.itemLabel_input}
            value={formData.categoryFirstName}
          />
        </FormItemBySelf>
        <FormItemBySelf label="二级分类" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'categorySecondName');
            }}
            placeholder="请输入"
            className={styles.itemLabel_input}
            value={formData.categorySecondName}
          />
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
        extra={
          <div>
            <Space>
              <Button type="primary" onClick={() => setVisibleData({ visible: true, record: initData })}>
                新增一级分类
              </Button>
              <Button type="primary" onClick={() => setVisibleSecondData({ visible: true, record: initData })}>新增二级分类</Button>
            </Space>
          </div>
        }
      >
        {
          dataSource.map((item,index)=>{
            return <BlockList key={index} detail={item} setVisibleData={setVisibleData} setVisibleSecondData={setVisibleSecondData}/>
          })
        }
      </Card>
      <Delivery visibleData={visibleData} setVisibleData={setVisibleData} getDataList={getDataList} setFormData={setFormData}/>
      <DeliverySecond visibleData={visibleSecondData} setVisibleData={setVisibleSecondData} getDataList={getDataList} setFormData={setFormData}/>
    </PageContainer>
  );
};

export default OrderByStore;
