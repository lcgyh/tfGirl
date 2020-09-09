import React from 'react';
import { Button, Select, Input, Card, Descriptions } from 'antd';
import ItemLabel from './itemLabel'
import orderStates from '../conf'
import '../style.less'

const { Option } = Select;

const SearchList = () => {
  return (
    <Card>
      <Descriptions>
        <Descriptions.Item label={ItemLabel('姓名')}><Input placeholder="请输入" className='itemLabel-input' /></Descriptions.Item>
        <Descriptions.Item label={ItemLabel('姓名')}><Input placeholder="请输入" className='itemLabel-input' /></Descriptions.Item>
        <Descriptions.Item label={ItemLabel('姓名')}>
          <Select className='itemLabel-input' allowClear>
            {
              orderStates.map((item) => {
                return <Option value={item.value} key={item.value}>{item.name}</Option>
              })
            }
          </Select>
        </Descriptions.Item>
        <Descriptions.Item label={ItemLabel('姓名')}><Input placeholder="请输入" className='itemLabel-input' /></Descriptions.Item>
      </Descriptions>
      <div className='search-btns'>
        <Button type='primary' className='search-btn'>查询</Button>
        <Button>重置</Button>
      </div>
    </Card>
  )
}

export default SearchList