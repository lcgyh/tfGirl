import React, {useState,useEffect} from 'react';
import {Card,Table} from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import { useHistory, useParams } from 'react-router-dom';
import {logColumns} from './config';
import {reqGoodsLog} from './service'

const GoodsLog = () => {
  const params = useParams();
  const { skuId } = params
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const [dataSource, setDataSource] = useState([]);
  
  const getLogList=async (page)=>{
    const params={
      current: page?page.current :  pagination.current,
      pageSize:page?page.pageSize : pagination.pageSize,
    }
    const result = await reqGoodsLog(skuId, params)
    const {list,pageNum,pageSize,total}=result
    setDataSource(list)
    setPagination({
      pageSize,
      current: pageNum,
      total,
    })
  }

  useEffect(()=>{
    if(skuId){
      getLogList()
    }
  },[skuId])


  const onChange = (page) => {
    getLogList(page)
  };
  return ( <PageContainer >
            <Card >
              <Table 
                dataSource = {dataSource}
                columns = {logColumns}
                bordered onChange = {onChange}
                pagination = { pagination}
              /> 
            </Card >
          </PageContainer>
  );
};

export default GoodsLog;
