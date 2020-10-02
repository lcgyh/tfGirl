import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'react-router-dom';
import { Card, Table, Descriptions } from 'antd';
import { goodsColumns, opaColumns } from './conf'
import { reqOrderInfo } from './service'

const OrderStoreInfo = () => {

  const params = useParams();
  const { orderId } = params
  const [orderInfo, setOrderInfo] = useState({})
  const getOrderInfo = async () => {
    const result = await reqOrderInfo({orderId})
    setOrderInfo(result)
  }
  useEffect(() => {
    if (!orderId) return
    getOrderInfo()
  }, [orderId])

  const { odDetails, odLogs } = orderInfo
  return (
    <PageContainer>

      <Card title='订单信息'>
        <Descriptions>
          <Descriptions.Item label={<span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>订单号</span>}>{orderInfo.orderNo}</Descriptions.Item>
          <Descriptions.Item label={<span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}> 下单时间</span>}>{orderInfo.createTime}</Descriptions.Item>
          <Descriptions.Item label={<span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}> 订单状态</span>}>{orderInfo.orderStatusStr}</Descriptions.Item>
          <Descriptions.Item label={<span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>门店名称</span>}>{orderInfo.shopName}</Descriptions.Item>
          <Descriptions.Item label={<span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>收货人</span>}>{orderInfo.receiveName}</Descriptions.Item>
          <Descriptions.Item label={<span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>收货电话</span>}>{orderInfo.orderNo}</Descriptions.Item>
          <Descriptions.Item label={<span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>收货地址</span>}>{orderInfo.receiveAddress}</Descriptions.Item>
          <Descriptions.Item label={<span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}>订单总价</span>}>{orderInfo.orderAmount}</Descriptions.Item>
          <Descriptions.Item label={<span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}> 发货时间</span>}>{orderInfo.orderNo}</Descriptions.Item>
          <Descriptions.Item label={<span style={{ display: 'inline-block', width: '100px', textAlign: 'right ' }}> 快递单号</span>}>{orderInfo.orderExpressNo}</Descriptions.Item>
        </Descriptions>

      </Card>
      <Card title='订单商品' style={{ marginTop: '20px' }}>
        <Table
          dataSource={odDetails}
          columns={goodsColumns}
          bordered
        />
      </Card>

      <Card title='订单日志' style={{ marginTop: '20px' }}>
        <Table
          dataSource={odLogs}
          columns={opaColumns}
          bordered
        />
      </Card>

    </PageContainer>
  )
}

export default OrderStoreInfo
