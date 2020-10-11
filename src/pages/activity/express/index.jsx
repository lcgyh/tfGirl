import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Space, Button ,Input} from 'antd';
import DeliveryAttr from './components/deliveryAttr'
import styles from './style.less';
import BlockList from './components/list';
import {reqExpressFeeListData} from './service'

const OrderByStore = () => {
  const [dataSource, setDataSource] = useState([]);
  const [visibleAttrData, setVisibleAttrData] = useState({
    visible: false,
    record: {},
  });

  // 查询列表
  const getDataList =async () => {
    const result = await reqExpressFeeListData()
    setDataSource(result || [])
  };
  
  useEffect(() => {
    getDataList()
  }, []);

  return (
    <PageContainer>
      <Card
        className={styles.table_con}
      >
        <BlockList list={dataSource}   setVisibleAttrData={setVisibleAttrData}/>
      </Card>
      <DeliveryAttr visibleData={visibleAttrData} setVisibleData={setVisibleAttrData} getDataList={getDataList}/>
    </PageContainer>
  );
};

export default OrderByStore;
