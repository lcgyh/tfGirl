import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'react-router-dom';
import { Card, Table, Space, Button,Input,Select } from 'antd';
import FormItemBySelf from '@/components/formItemBySelf';
import { columns,articalStates } from './config';
import styles from './style.less';
import {reqArticalListData} from './service'

const { Option } = Select;
const OrderByStore = () => {
  const history = useHistory();
  const [formData,setFormData] =useState({})
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const [dataSource, setDataSource] = useState([]);

  // 查询列表
  const getDataList =async (page = {}) => {
    const param = {
      ...formData,
      pageSize: page.pageSize || 10,
      current: page.current || 1,
    };
    const result = await reqArticalListData(param)
    const {list=[],pageNum,pageSize,total} = result
    setDataSource(list)
    setPagination({
      pageSize,
      current: pageNum,
      total,
    })
  };
  const onChange = (e,key) => {
    setFormData({
      ...formData,
      [key]: e && e.target ? e.target.value : e,
    });
  };
  useEffect(() => {
    getDataList()
  }, []);


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


  const goEdit = (key,id) => {
    if (key === '1') {
      history.push(`/article/editArticle/${id}`);
    }
    if (key === '2') {
      history.push(`/article/editVoice/${id}`);
    }
    if (key === '3') {
      history.push(`/article/editVideo/${id}`);
    }
    if (key === '4') {
      history.push(`/article/editWeChat/${id}`);
    }
  }

  return (
    <PageContainer>
       <Card>
      <Space style={{ flexWrap: 'wrap' }}>
        <FormItemBySelf label="言语标题" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'storeName');
            }}
            placeholder="请输入"
            className={styles.itemLabel_input}
          />
        </FormItemBySelf>
        <FormItemBySelf label="言语状态" width="100">
          <Select className={styles.itemLabel_input} allowClear placeholder="请选择">
            {articalStates.map((item) => {
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
        className={styles.table_con}
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
              key: index,
              goEdit,
            };
          })}
          columns={columns}
          bordered
          onChange={onChange}
          pagination={pagination}
        />
      </Card>
      
    </PageContainer>
  );
};

export default OrderByStore;
