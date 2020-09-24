import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import FormItemBySelf from '@/components/formItemBySelf';
import { Card, Space, Button ,Input,Pagination} from 'antd';
import Delivery from './components/delivery';
import styles from  './style.less';
import BlockList from './components/list';
import {reqCountryListData} from './service'


const OrderByStore = () => {
  const [formData, setFormData] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const [visibleData, setVisibleData] = useState({
    visible: false,
    record: {
      brandStatus:'1',
      opType:'1'
    },
  });

  // 查询列表
  const getDataList =async (page={}) => {
    const param = {
      countryName: formData.countryName,
      pageSize: page.pageSize || pagination.pageSize,
      current: page.current || pagination.current,
    };
    const result = await reqCountryListData(param)
    const { list, pageSize, total, pageNum } = result
    setDataSource(list)
    setPagination({
      ...pagination,
      pageSize,
      current: pageNum,
      total
    })
  };
  const onChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e && e.target ? e.target.value : e,
    });
  };
  useEffect(() => {
    getDataList()
  }, []);

const pageChange=(page)=>{
  getDataList({
    current:page
  })
}
  return (
    <PageContainer>
      <Card>
      <Space style={{ flexWrap: 'wrap' }}>
        <FormItemBySelf label="国家名称" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'countryName');
            }}
            placeholder="请输入"
            value={formData.countryName}
            className={styles.itemLabel_input}
          />
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
        className= {styles.table_con}
        extra={
          <div>
            <Space>
              <Button type="primary" onClick={() => setVisibleData({ visible: true, 
              record: {
                countryStatus:'1',
                opType:'1',
                countryName:null,
                countryUrl:null} 
              }
                )}>
                新增国家
              </Button>
            </Space>
          </div>
        }
      >
        <BlockList dataSource={dataSource} setVisibleData={setVisibleData}/>
        <div style={{textAlign:'right'}}>
        <Pagination 
        current={pagination.current} 
        total={pagination.total} 
        onChange={pageChange}
        pageSize={pagination.pageSize} />
        </div>
      </Card>
      <Delivery visibleData={visibleData} setVisibleData={setVisibleData} getDataList={getDataList}/>
    </PageContainer>
  );
};

export default OrderByStore;
