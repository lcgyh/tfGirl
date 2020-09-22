import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'react-router-dom';
import { Button, Select, Input, Card, Space, Table } from 'antd';
import FormItemBySelf from '@/components/formItemBySelf';
import { reqStoreList } from './service'
import { columns, storeStatesList } from './config';
import styles from './style.less';

const { Option } = Select;

const StoreCenter = () => {
  const history = useHistory();
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const [formData, setFormData] = useState({});
  const [dataSource, setDataSource] = useState([]);


  // 查询列表
  const getDataList = async (page = {}) => {
    const param = {
      ...formData,
      pageSize: page.pageSize || pagination.pageSize,
      current: page.current || pagination.current,
    };
    const result = await reqStoreList(param)
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

  const goCreate = () => {
    history.push('/cooperation/store/create');
  }

  const goEdit = (params) => {
    history.push(`/cooperation/store/${params.shopId}/edit`);
  }


  const { shopName, shopStatus, shoperName, shopMobile } = formData
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
          <FormItemBySelf label="联系电话" width="100">
            <Input
              onChange={(e) => {
                formChange(e, 'shopMobile');
              }}
              placeholder="请输入"
              value={shopMobile}
              className={styles.itemLabel_input}
            />
          </FormItemBySelf>
          <FormItemBySelf label="联系人" width="100">
            <Input
              onChange={(e) => {
                formChange(e, 'shoperName');
              }}
              placeholder="请输入"
              value={shoperName}
              className={styles.itemLabel_input}
            />
          </FormItemBySelf>
          <FormItemBySelf label="门店状态" width="100" >

            <Select
              className={styles.itemLabel_input}
              allowClear
              value={shopStatus}
              placeholder="请选择"
              onChange={(e) => {
                formChange(e, 'shopStatus');
              }}>
              {storeStatesList.map((item) => {
                return (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
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
              <Button type="primary" onClick={() => goCreate()}>
                新建门店
              </Button>
            </Space>
          </div>
        }
      >
        <Table
          dataSource={dataSource.map((item, index) => {
            return {
              ...item,
              key: index,
              goEdit,
            };
          })}
          columns={columns}
          bordered
          onChange={pageChange}
          pagination={pagination}
        />
      </Card>
    </PageContainer>
  );
};

export default StoreCenter;










