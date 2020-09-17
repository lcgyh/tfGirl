import React, { useState } from 'react';
import { Button, Select, Input, Card, DatePicker, Space } from 'antd';
import FormItemBySelf from '../../../../components/formItemBySelf';
import { orderStates } from '../conf';
import '../style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const SearchList = (props) => {
  const { getDataList } = props;
  const [formData, setFormData] = useState({});

  const onChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e && e.target ? e.target.value : e,
    });
  };
  return (
    <Card>
      <Space style={{ flexWrap: 'wrap' }}>
        <FormItemBySelf label="SPUID" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'storeName');
            }}
            placeholder="请输入"
            className="itemLabel-input"
          />
        </FormItemBySelf>
        <FormItemBySelf label="商品名称" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'storeName');
            }}
            placeholder="请输入"
            className="itemLabel-input"
          />
        </FormItemBySelf>
        <FormItemBySelf label="秒杀日期" width="100">
          <RangePicker format="YYYY-MM-DD" />
        </FormItemBySelf>

        
        <FormItemBySelf label="秒杀状态" width="100">
          <Select className="itemLabel-input" allowClear placeholder="请选择">
            {orderStates.map((item) => {
              return (
                <Option value={item.value} key={item.value}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </FormItemBySelf>
        
      </Space>

      <div className="search-btns">
        <Button type="primary" className="search-btn" onClick={() => getDataList(formData)}>
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
  );
};

export default SearchList;
