import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'react-router-dom';
import { Card, Table, Space, Button,Input } from 'antd';
import FormItemBySelf from '@/components/formItemBySelf';
import Delivery from './components/delivery';
import { columns } from './config';
import styles from'./style.less';
import {reqGoodsInvBySku} from './service'

const OrderByStore = () => {
  const history = useHistory();
  const [dataSource, setDataSource] = useState([]);
  const [formData,setFormData] = useState({})
 

  // 查询列表
  const getDataList = async () => {
    const param = {
      ...formData,
    };
    const result =await reqGoodsInvBySku(param)

    
  };
  const onChange = (e,key) => {
    setFormData({
      ...formData,
      [key]: e && e.target ? e.target.value : e,
    });
  };
  

  

  return (
    <PageContainer>
      <Card>
      <Space style={{ flexWrap: 'wrap' }}>
        <FormItemBySelf label="SKUID" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'skuId');
            }}
            placeholder="请输入"
            className={styles.itemLabel_input}
            value={formData.skuId}
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
        title="查询列表"
        extra={
          <div>
            <Space>
              <Button type="primary" onClick={() => setVisibleData({ visible: true, record: {} })}>
                库存增减
              </Button>
            </Space>
          </div>
        }
      >
        <Table
          dataSource={dataSource.map((item, index) => {
            return {
              ...item,
              key: index,
            };
          })}
          columns={columns}
          bordered
          pagination={false}
        />
      </Card>
      <Card
        className={styles.table_con}
        title="操作记录"
      >
        <Table
          dataSource={dataSource.map((item, index) => {
            return {
              ...item,
              key: index,
            };
          })}
          columns={columns}
          bordered
          pagination={false}
        />
      </Card>
      {/* <Delivery visibleData={visibleData} setVisibleData={setVisibleData} /> */}
    </PageContainer>
  );
};

export default OrderByStore;
