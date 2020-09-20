import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'react-router-dom';
import { Card, Table, Space, Button } from 'antd';
import apiGetData from '@/utils/apiMeth'
import SearchList from './components/search';
import Delivery from './components/delivery';
import { columns } from './conf';
import './style.less';

const GoodsList = () => {
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
    setSearchParam(param)
  };
  const onChange = (page) => {
    getDataList(searchParam, page);
  };
  useEffect(() => {
    getDataList()
  }, []);

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

  const goGoCreate = () => {
    history.push('/goods/create');
  };

  const goInfo = () => {
    history.push('/goods/info');
  };
  const goEdit = () => {
    history.push('/goods/edit');
  };
  const goLog = () => {
    history.push('/goods/log');
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
              <Button type="primary" onClick={() => goGoCreate()}>
                新增商品
              </Button>
              <Button type="primary">SPU售卖</Button>
              <Button type="primary">SPU停卖</Button>
              <Button type="primary">SKU上线</Button>
              <Button type="primary">SKU下线</Button>
            </Space>
          </div>
        }
      >
        <Table
          dataSource={dataSource.map((item, index) => {
            return {
              ...item,
              goInfo,
              goEdit,
              goLog,
              key: index,
            };
          })}
          columns={columns}
          bordered
          onChange={onChange}
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
