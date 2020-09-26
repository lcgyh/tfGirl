import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Space, Button ,Input} from 'antd';
import FormItemBySelf from '@/components/formItemBySelf';
import Delivery from './components/delivery';
import DeliveryAttr from './components/deliveryAttr'
import styles from './style.less';
import BlockList from './components/list';
import {reqSpecListData} from './service'

const OrderByStore = () => {
  const [formData,setFormData]=useState({})
  const [dataSource, setDataSource] = useState([]);
  const [visibleData, setVisibleData] = useState({
    visible: false,
    record: {},
  });
  const [visibleAttrData, setVisibleAttrData] = useState({
    visible: false,
    record: {},
  });

  // 查询列表
  const getDataList =async () => {
    const param = {
      ...formData,
      };
    const result = await reqSpecListData(param)
    setDataSource(result.specs || [])
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
        <FormItemBySelf label="规格" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'categoryFirstName');
            }}
            placeholder="请输入"
            className={styles.itemLabel_input}
            value={formData.categoryFirstName}
          />
        </FormItemBySelf>
        <FormItemBySelf label="规格值" width="100">
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
        <Button type="primary" className={styles.search_btn} onClick={() => getDataList()}>
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
              <Button type="primary" onClick={() => setVisibleData({ visible: true, record: {
                specStatus: '1',
                specName:null,
                opType:'1'
              } })}>
                新增规格
              </Button>
              <Button 
              type="primary"
              onClick={() => setVisibleAttrData({ visible: true, record: {
                specStatus: '1',
                specName:null,
                opType:'1'
              } })}
              >新增规格值</Button>
            </Space>
          </div>
        }
      >
        {
          dataSource.map((item,index)=>{
            return <BlockList detail={item} key={index} setVisibleData={setVisibleData}  setVisibleAttrData={setVisibleAttrData}/>
          })
        }
      </Card>
      <Delivery visibleData={visibleData} setVisibleData={setVisibleData} />
      <DeliveryAttr visibleData={visibleAttrData} setVisibleData={setVisibleAttrData} />
    </PageContainer>
  );
};

export default OrderByStore;
