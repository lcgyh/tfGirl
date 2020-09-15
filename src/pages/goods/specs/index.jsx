import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'react-router-dom';
import { Card, Table, Space, Button } from 'antd';
import SearchList from './components/search';
import Delivery from './components/delivery';
import { columns } from './conf';
import './style.less';
import BlockList from './components/list';

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
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ]);

  const [visibleData, setVisibleData] = useState({
    visible: false,
    record: {},
  });

  // 查询列表
  const getDataList = (formData = {}, page = {}) => {
    const param = {
      ...formData,
      pageSize: page.pageSize || 10,
      current: page.current || 1,
    };
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
        extra={
          <div>
            <Space>
              <Button type="primary" onClick={() => setVisibleData({ visible: true, record: {} })}>
                新增规格
              </Button>
              <Button type="primary">新增规格值</Button>
            </Space>
          </div>
        }
      >
        <BlockList />
        <BlockList />
      </Card>
      <Delivery visibleData={visibleData} setVisibleData={setVisibleData} />
    </PageContainer>
  );
};

export default OrderByStore;
