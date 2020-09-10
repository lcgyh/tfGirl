import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Table } from 'antd';
import SearchList from './components/search'
import { columns } from './conf'
import './style.less'

const OrderByStore = () => {
  const [searchParam, setSearchParam] = useState({})
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0
  })
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
    }
  ])

  // 查询列表
  const getDataList = (formData = {}, page = {}) => {
    const param = {
      ...formData,
      pageSize: page.pageSize || 10,
      current: page.current || 1,
    }
    // 请求数据
    // setDataSource()
    // setPagination()
    // setSearchParam(查询参数)
  }
  const onChange = (page) => {
    getDataList(searchParam, page)
  }
  useEffect(() => {
    // getDataList()
  }, [])
  return (
    <PageContainer>
      <SearchList getDataList={getDataList} />
      <Card className='table-con' title='查询列表'>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          onChange={onChange}
          pagination={pagination} />;
      </Card>
    </PageContainer>
  )
}

export default OrderByStore