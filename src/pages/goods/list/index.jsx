import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'react-router-dom';
import { Card, Table, Space, Button,Input,Select} from 'antd';
import apiGetData from '@/utils/apiMeth'
import FormItemBySelf from '@/components/formItemBySelf';
import Delivery from './components/delivery';
import { columns,orderStates,spuStatusOpation,skuStatusOpation } from './config';
import styles from  './style.less';


const { Option } = Select;
const GoodsList = () => {
  const history = useHistory();
  const [formData,setFormData] = useState({})
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
  };
  const pageChange = (page) => {
    getDataList(searchParam, page);
  };

  const onChange=(e,key)=>{
    setFormData({
      ...formData,
      [key]: e && e.target ? e.target.value : e,
    });
  }
  useEffect(() => {
    getDataList()
  }, []);

  const rowSelection = {
    onChange: (rowKeys, rows) => {
      setSelectedRowKeys(rowKeys);
      setSelectedRows(rows);
    }
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
      <Card>
      <Space style={{ flexWrap: 'wrap' }}>
        <FormItemBySelf label="SPUID" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'spuId');
            }}
            value={formData.spuId}
            placeholder="请输入"
            className= {styles.itemLabel_input}
          />
        </FormItemBySelf>
        <FormItemBySelf label="商品条码" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'barCode');
            }}
            value={formData.barCode}
            placeholder="请输入"
            className= {styles.itemLabel_input}
          />
        </FormItemBySelf>
        <FormItemBySelf label="商品名称" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'spuName');
            }}
            value={formData.spuName}
            placeholder="请输入"
            className= {styles.itemLabel_input}
          />
        </FormItemBySelf>
        <FormItemBySelf label="商品品牌" width="100">
          <Select className= {styles.itemLabel_input} 
                  allowClear 
                  onChange={(e) => {
                    onChange(e, 'brandId');
                  }}
                  value={formData.brandId}
                  placeholder="请选择">
            {orderStates.map((item) => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </FormItemBySelf>
        <FormItemBySelf label="一级分类" width="100">
          <Select className= {styles.itemLabel_input} 
                  onChange={(e) => {
                    onChange(e, 'categoryId1');
                  }}
                  value={formData.categoryId1}
                  allowClear placeholder="请选择">
            {orderStates.map((item) => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </FormItemBySelf>
        <FormItemBySelf label="二级分类" width="100">
          <Select className= {styles.itemLabel_input} 
            onChange={(e) => {
              onChange(e, 'categoryId2');
            }}
            value={formData.categoryId2}
            allowClear 
            placeholder="请选择">
            {orderStates.map((item) => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </FormItemBySelf>
        <FormItemBySelf label="SKUID" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'skuId');
            }}
            value={formData.skuId}
            placeholder="请输入"
            className= {styles.itemLabel_input}
          />
        </FormItemBySelf>
        <FormItemBySelf label="上线状态" width="100">
          <Select className= {styles.itemLabel_input} 
                allowClear 
                onChange={(e) => {
                  onChange(e, 'skuStatus');
                }}
                value={formData.skuStatus}
                placeholder="请选择">
            {spuStatusOpation.map((item) => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </FormItemBySelf>

        <FormItemBySelf label="售卖状态" width="100">
          <Select className= {styles.itemLabel_input} 
                allowClear 
                onChange={(e) => {
                  onChange(e, 'spuStatus');
                }}
                value={formData.spuStatus}
                placeholder="请选择">
            {skuStatusOpation.map((item) => {
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
        <Button type="primary" className={styles.search_btn} onClick={() => getDataList(formData)}>
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
          onChange={pageChange}
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
