import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table, Space, Button, Descriptions } from 'antd';
import FormItemBySelf from '../../../components/formItemBySelf';
import { goodsColumns, opaColumns } from './conf';

const OrderStoreInfo = () => {
  const [orderInfo, setOrderInfo] = useState({
    goodsList: [],
    orderLog: [],
  });
  const { goodsList, orderLog } = orderInfo;

  const getOrderInfo = () => {
    setOrderInfo({});
  };
  useEffect(() => {
    getOrderInfo();
  }, []);

  return (
    <PageContainer>
      <Card title="订单信息">
        <Descriptions>
          <Descriptions.Item
            label={
              <span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>
                订单号
              </span>
            }
          >
            MD17080101454
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>
                {' '}
                下单时间
              </span>
            }
          >
            1810000000
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>
                {' '}
                订单状态
              </span>
            }
          >
            1810000000
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>
                门店名称
              </span>
            }
          >
            1810000000
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>
                收货人
              </span>
            }
          >
            1810000000
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>
                收货电话
              </span>
            }
          >
            1810000000
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>
                收货地址
              </span>
            }
          >
            河南省郑州市高新区高新区甘心去河南省郑州市高新区高新区甘心去
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>
                订单总价
              </span>
            }
          >
            1810000000
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>
                {' '}
                发货时间
              </span>
            }
          >
            1810000000
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>
                {' '}
                快递单号
              </span>
            }
          >
            1810000000
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="订单商品" style={{ marginTop: '20px' }}>
        <Table dataSource={goodsList} columns={goodsColumns} bordered />
      </Card>

      <Card title="订单日志" style={{ marginTop: '20px' }}>
        <Table dataSource={orderLog} columns={opaColumns} bordered />
      </Card>
    </PageContainer>
  );
};

export default OrderStoreInfo;
