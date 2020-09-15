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
        <FormItemBySelf label="规格" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'storeName');
            }}
            placeholder="请输入"
            className="itemLabel-input"
          />
        </FormItemBySelf>
        <FormItemBySelf label="规格值" width="100">
          <Input
            onChange={(e) => {
              onChange(e, 'storeName');
            }}
            placeholder="请输入"
            className="itemLabel-input"
          />
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
