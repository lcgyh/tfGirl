import React, { useState } from 'react';
import { Button, Select, Input, Card, DatePicker, Space } from 'antd';
import FormItemBySelf from '../../../../components/formItemBySelf'
import { orderStates } from '../conf'
import '../style.less'

const { Option } = Select;
const { RangePicker } = DatePicker;


const SearchList = (props) => {
  const { getDataList } = props
  const [formData, setFormData] = useState({})

  const onChange = (e, key) => {
    setFormData({
      ...formData,
      [key]: e && e.target ? e.target.value : e
    })
  }
  return (
    <Card>
      <Space direction='vertical'>
        <Space>
          <FormItemBySelf label='门店名称' width='100'>
            <Input
              onChange={(e) => { onChange(e, 'storeName') }}
              placeholder="请输入"
              className='itemLabel-input' />
          </FormItemBySelf>
          <FormItemBySelf label='商品名称' width='100'>
            <Input
              onChange={(e) => { onChange(e, 'storeName') }}
              placeholder="请输入"
              className='itemLabel-input' />
          </FormItemBySelf>
          <FormItemBySelf label='品牌' width='100'>
            <Select className='itemLabel-input' allowClear placeholder='请选择'>
              {
                orderStates.map((item) => {
                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                })
              }
            </Select>
          </FormItemBySelf>

        </Space>
        <Space>
          <FormItemBySelf label='订单号' width='100'>
            <Input
              onChange={(e) => { onChange(e, 'storeName') }}
              placeholder="请输入"
              className='itemLabel-input' />
          </FormItemBySelf>
          <FormItemBySelf label='订单状态' width='100'>
            <Select className='itemLabel-input' allowClear placeholder='请选择'>
              {
                orderStates.map((item) => {
                  return <Option value={item.value} key={item.value}>{item.name}</Option>
                })
              }
            </Select>
          </FormItemBySelf>
          <FormItemBySelf label='下单时间' width='100'>
            <RangePicker
              showTime={{ format: 'HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </FormItemBySelf>
        </Space>
        <Space>
          <FormItemBySelf label='发货时间' width='100'>
            <RangePicker
              showTime={{ format: 'HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </FormItemBySelf>
        </Space>
      </Space>




      <div className='search-btns'>
        <Button
          type='primary'
          className='search-btn'
          onClick={() => getDataList(formData)}>
          查询
          </Button>
        <Button onClick={() => { setFormData({}) }}>重置</Button>
      </div>
    </Card >
  )
}

export default SearchList