import React, { useState, useEffect } from 'react';
import { Modal, Input, message,Radio ,Select} from 'antd';
import PicturesWall from '@/components/Upload';
import FormItemBySelf from '@/components/formItemBySelf';
import {reqCategorySecondCreate,reqCategorySecondUpdate,reqCategoryFirstList} from '../service'

const { Option } = Select;

const DeliverySecond = (props) => {
  const [fileImgs,setFileImgs] = useState([])
  const [firstList,setFirstList] = useState([])
  const { visibleData, setVisibleData,getDataList,setFormData } = props;
  const { record, visible } = visibleData;

  const handleOk =async () => {
    if (!record.parentCategoryId) return message.error('请选择一级分类');
    if(!fileImgs.length<1) return message.error('请上传二级分类logo');
    if(record.id){
      record.categoryLogo=fileImgs[0].url
      await reqCategorySecondUpdate(record)
    }else{
      await reqCategorySecondCreate(record)
    }
    await setFormData()
    getDataList()
    setVisibleData({visible: false,record: {}});
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

  const getFirstList=async ()=>{
    const result = await reqCategoryFirstList()
    setFirstList(result)
  }

  useEffect(()=>{
    if(visible){
      getFirstList()
      if(record.categoryLogo){
        setFileImgs([{
          uid:'-1',
          status:'done',
          url: record.categoryLogo
        }])
      }
    }
  },[visible])

  return (
    <div>
      <Modal title="新增二级分类" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <FormItemBySelf label="一级分类" width="120">

      <Select style={{ width: '280px' }}  onChange={(e) => {
              onChange(e, 'parentCategoryId');
            }} value={record.parentCategoryId}> 
        {
          firstList.map((item,index)=>{
            return  <Option value={item.parentCategoryId} key={index}>{item.categoryName}</Option>
          })
        }
    </Select>
         
        </FormItemBySelf>
        <FormItemBySelf label="二级分类" width="120">
          <Input
            value={record.categoryName}
            onChange={(e) => {
              onChange(e, 'categoryName');
            }}
            placeholder="请输入"
            style={{ width: '280px' }}
          />
        </FormItemBySelf>
        <FormItemBySelf label="二级分类状态" width="120">
          <Radio.Group  onChange={(e) => {
                onChange(e, 'categoryStatus');
              }}  value={record.categoryStatus}>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>禁用</Radio>
          </Radio.Group>
        </FormItemBySelf>
        <FormItemBySelf label="分类logo" width="120" alignItems='start'>
        <PicturesWall
            fileImgs={ fileImgs }
            getFileListData={getFileListData}
            imgLength={1}
            />
        </FormItemBySelf>
      </Modal>
    </div>
  );
};

export default DeliverySecond;
