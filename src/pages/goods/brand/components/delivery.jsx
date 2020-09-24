import React, { useState, useEffect } from 'react';
import { Modal, Input, message ,Radio,Form} from 'antd';
import PicturesWall from '@/components/Upload';
import {editBrand} from '../service'

const layout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 10
  },
};

const Delivery = (props) => {
  const { visibleData, setVisibleData,getDataList } = props;
  const { record, visible } = visibleData;
  const [fileImgs,setFileImgs] = useState([])
  const {opType} = record

  useEffect(()=>{
    if(record.countryUrl){
      setFileImgs([
        {
          uid:'-1',
        status:'done',
        url: record.countryUrl
        }
      ])
    }
  },[record])

  const handleOk =async () => {
    if (!fileImgs || fileImgs.length<1) return message.error('请上传品牌图片');
    record.countryUrl = fileImgs[0].url
    await editBrand(record)
    setVisibleData({
      visible: false,
      record: {},
    });
    getDataList()
    message.success('操作成功')
  };
  const handleCancel = () => {
    setVisibleData({
      visible: false,
      record: {},
    });
  };
  const onChange = (e, key) => {
    setVisibleData({
      visible: true,
      record: {
        ...visibleData.record,
        [key]: e && e.target ? e.target.value : e,
      },
    });
  };

  const getFileListData=(data)=>{
    setFileImgs(data)
  }
  return (
    <div>
      <Modal title={opType==='1'?'新增国家':'国家编辑'} visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form {...layout}>
          <Form.Item label="品牌名称">
              <Input 
              placeholder="请输入"
              value={record.brandName} 
              onChange={(e)=>{onChange(e,'brandName')}}/>
          </Form.Item>
          <Form.Item label="品牌状态">
          <Radio.Group onChange={(e)=>{onChange(e,'brandStatus')}} value={String(record.brandStatus)}>
            <Radio value='1'>启用</Radio>
            <Radio value='2'>禁用</Radio>
          </Radio.Group>
          </Form.Item>
          <Form.Item label="国家图片">
          <PicturesWall
            fileImgs={ fileImgs }
            getFileListData={getFileListData}
            imgLength={1}
            />
          </Form.Item>
        </Form>             
      </Modal>
    </div>
  );
};

export default Delivery;
