import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'react-router-dom';
import { Card, Table, Space, Button } from 'antd';
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

  const goCreate = (key) => {
    if (key === '1') {
      history.push('/article/createArticle');
    }
    if (key === '2') {
      history.push('/article/createVoice');
    }
    if (key === '3') {
      history.push('/article/createVideo');
    }
    if (key === '4') {
      history.push('/article/createWeChat');
    }

  }

  return (
    <PageContainer>
      <SearchList getDataList={getDataList} />
      <Card
        className="table-con"
        title="查询列表"
        extra={
          <div>
            <Space>
              <Button type="primary" onClick={() => goCreate('1')}>
                新增文章言语
              </Button>
              <Button type="primary" onClick={() => goCreate('2')}>新增语音言语</Button>
              <Button type="primary" onClick={() => goCreate('3')}>新增视频言语</Button>
              <Button type="primary" onClick={() => goCreate('4')}>新增公众号言语</Button>
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

          pagination={pagination}
        />
      </Card>
      <Delivery visibleData={visibleData} setVisibleData={setVisibleData} />
    </PageContainer>
  );
};

export default OrderByStore;
