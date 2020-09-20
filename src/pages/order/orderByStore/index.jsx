import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'react-router-dom';
import { Card, Table, Space, Button } from 'antd';
import apiGetData from '@/utils/apiMeth'
import SearchList from './components/search';
import Delivery from './components/delivery';
import { columns } from './conf';
import './style.less';

const OrderByStore = () => {
  const history = useHistory();

  const [searchParam, setSearchParam] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
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

  // 查询列表
  const getDataList = async (formData = {}, page = {}) => {
    const param = {
      ...formData,
      pageSize: page.pageSize || 10,
      current: page.current || 1,
    };
    const resData = apiGetData('GET', '/erp/v1/order', param)
    // 请求数据
    // setDataSource()
    // setPagination()
    // setSearchParam(查询参数)
  };
  const onChange = (page) => {
    getDataList(searchParam, page);
  };
  useEffect(() => {
    // getDataList()
  }, []);

  const goInfo = (data) => {
    console.log('data', data);
    history.push('/order/store/info');
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <PageContainer>
      <SearchList getDataList={getDataList} />
      <Card
        className="table-con"
        title="查询列表"
        extra={
          <div>
            <Space>
              <Button type="primary" onClick={() => setVisibleData({ visible: true, record: {} })}>
                发货
              </Button>
              <Button type="primary">补充快递单</Button>
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
          onChange={onChange}
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

export default OrderByStore;
