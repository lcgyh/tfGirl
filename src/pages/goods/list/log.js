import React, {
  useState,
  useEffect
} from 'react';
import {
  Card,
  Table,
  Space,
  Button
} from 'antd';
import {
  PageContainer
} from '@ant-design/pro-layout';
import {
  logColumns
} from './conf';

const GoodsLog = () => {
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const [dataSource, setDataSource] = useState([]);
  const onChange = () => {};
  return ( <
    PageContainer >
    <
    Card >
    <
    Table dataSource = {
      dataSource
    }
    columns = {
      logColumns
    }
    bordered onChange = {
      onChange
    }
    pagination = {
      pagination
    }
    /> < /
    Card >
    <
    /PageContainer>
  );
};

export default GoodsLog;
