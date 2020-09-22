import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'react-router-dom';
import { Button, Select, Input, Card, DatePicker, Space, Table, message } from 'antd';
import moment from 'moment'
import FormItemBySelf from '@/components/formItemBySelf';
import Delivery from './components/delivery';
import { reqOrderList } from './service'
import { reqBrandList } from '../../goods/brand/service'
import { columns, orderStatusList } from './conf';
import styles from './style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const OrderByStore = () => {
  const history = useHistory();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const [formData, setFormData] = useState({});
  const [brandList, setBrandList] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [visibleData, setVisibleData] = useState({
    visible: false,
    record: {},
  });

  // 品牌查询
  const getBrandList = async () => {
    const result = await reqBrandList()
    setBrandList(result)
  }

  // 查询列表
  const getDataList = async (page = {}) => {
    const param = {
      shopName: formData.shopName,
      spuName: formData.spuName,
      brandId: formData.brandId,
      orderNo: formData.orderNo,
      orderStatus: formData.orderStatus,
      orderTimeStart: formData.orderTime && formData.orderTime.length > 0 ? moment(formData.orderTime[0]).format('YYYY-MM-DD HH:mm:ss') : null,
      orderTimeEnd: formData.orderTime && formData.orderTime.length > 0 ? moment(formData.orderTime[1]).format('YYYY-MM-DD HH:mm:ss') : null,
      deliverTimeStart: formData.deliverTime && formData.deliverTime.length > 0 ? moment(formData.deliverTime[0]).format('YYYY-MM-DD HH:mm:ss') : null,
      deliverTimeEnd: formData.deliverTime && formData.deliverTime.length > 0 ? moment(formData.deliverTime[1]).format('YYYY-MM-DD HH:mm:ss') : null,
      pageSize: page.pageSize || pagination.pageSize,
      current: page.current || pagination.current,
    };
    const result = await reqOrderList(param)
    const { list, pageSize, total, pageNum } = result
    // 请求数据
    setDataSource(list)
    setPagination({
      ...pagination,
      pageSize,
      current: pageNum,
      total
    })
  };

  useEffect(() => {
    getBrandList()
    getDataList()
  }, []);

  const formChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e && e.target ? e.target.value : e,
    });
  };
  const pageChange = (page) => {
    getDataList(page);
  };

  // 发货
  const onDelivery = () => {
    if (selectedRows.length < 1) return message.error('请选择发货订单')
    const result = selectedRows.filter((item) => {
      return String(item.orderStatus) !== '20'
    })
    if (result.length > 0) {
      return message.error('只有待发货订单可以发货')
    }
    setVisibleData({
      visible: true,
      record: {
        list: selectedRows,
        opType: '1',
        expressNo: null
      }
    })
  }
  // 补充快递单
  const addDelivery = () => {
    if (selectedRows.length < 1) return message.error('请选择操作订单')
    if (selectedRows.length > 2) return message.error('一次只能操作一个订单')
    const result = selectedRows.filter((item) => {
      return String(item.orderStatus) !== '30'
    })
    if (result.length > 0) {
      return message.error('只有已发货订单可以操作补充快递单')
    }
    setVisibleData({
      visible: true,
      record: {
        list: selectedRows,
        opType: '2',
        expressNo: null
      }
    })
  }

  const goInfo = (data) => {
    history.push(`/order/store/info/${data.orderId}`);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (rowKeys, rows) => {
      setSelectedRowKeys(rowKeys);
      setSelectedRows(rows);
    }
  };
  const { shopName, spuName, brandId, orderNo, orderStatus, deliverTime, orderTime } = formData
  return (
    <PageContainer>
      <Card>
        <Space style={{ flexWrap: 'wrap' }}>
          <FormItemBySelf label="门店名称" width="100">
            <Input
              onChange={(e) => {
                formChange(e, 'shopName');
              }}
              value={shopName}
              placeholder="请输入"
              className={styles.itemLabel_input}
            />
          </FormItemBySelf>
          <FormItemBySelf label="商品名称" width="100">
            <Input
              onChange={(e) => {
                formChange(e, 'spuName');
              }}
              placeholder="请输入"
              value={spuName}
              className={styles.itemLabel_input}
            />
          </FormItemBySelf>
          <FormItemBySelf label="品牌" width="100" >
            <Select
              className={styles.itemLabel_input}
              allowClear
              value={brandId}
              placeholder="请选择"
              onChange={(e) => {
                formChange(e, 'brandId');
              }}>
              {brandList.map((item) => {
                return (
                  <Option value={item.brandId} key={item.brandId}>
                    {item.brandName}
                  </Option>
                );
              })}
            </Select>
          </FormItemBySelf>

          <FormItemBySelf label="订单号" width="100">
            <Input
              onChange={(e) => {
                formChange(e, 'orderNo');
              }}
              placeholder="请输入"
              className={styles.itemLabel_input}
              value={orderNo}
            />
          </FormItemBySelf>
          <FormItemBySelf label="订单状态" width="100">
            <Select
              className={styles.itemLabel_input}
              allowClear
              value={orderStatus}
              placeholder="请选择"
              onChange={(e) => {
                formChange(e, 'orderStatus');
              }}>
              {orderStatusList.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </FormItemBySelf>
          <FormItemBySelf label="下单时间" width="100" >
            <RangePicker
              value={orderTime}
              showTime={{ format: 'HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss" onChange={(e) => {
                formChange(e, 'orderTime');
              }} />
          </FormItemBySelf>

          <FormItemBySelf label="发货时间" width="100">
            <RangePicker
              showTime={{ format: 'HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
              value={deliverTime}
              onChange={(e) => {
                formChange(e, 'deliverTime');
              }} />
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
        className={styles.search_btn}
        title="查询列表"
        extra={
          <div>
            <Space>
              <Button type="primary" onClick={onDelivery}>
                发货
              </Button>
              <Button type="primary" onClick={addDelivery}>补充快递单</Button>
            </Space>
          </div>
        }
      >
        <Table
          dataSource={dataSource.map((item, index) => {
            return {
              ...item,
              goInfo,
              key: index,
            };
          })}
          columns={columns}
          bordered
          onChange={pageChange}
          rowSelection={{
            ...rowSelection,
          }}
          pagination={pagination}
        />
      </Card>
      <Delivery visibleData={visibleData} setVisibleData={setVisibleData} getDataList={getDataList} />
    </PageContainer>
  );
};

export default OrderByStore;
