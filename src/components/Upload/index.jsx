import React, { useState, useEffect } from 'react';
import { Upload, Modal ,message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const PicturesWall = (props) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const { fileImgs, getFileListData,imgLength } = props;

  useEffect(() => {
    setFileList(fileImgs);
  }, [fileImgs]);

  const handleCancel = () => {
    setPreviewVisible(false);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = (files) => {
    if(!files.file.status) return
    setFileList(files.fileList.filter((item)=>{
      return item.status && item.status !== "" 
    }));
    if (files.file.status === 'done') {
      const newFileList = cloneDeep(files.fileList)
      for (let i = 0; i < newFileList.length; i++) {
        if (newFileList[i].response && newFileList[i].response.code === 0  ) {
          newFileList[i].url = newFileList[i].response.data;
        }
      }
      getFileListData(newFileList);
    }
    if (files.file.status === 'removed'){
      const newFileList = cloneDeep(files.fileList)
      getFileListData(newFileList);
    } 
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const beforeUpload=(file)=>{
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isJpgOrPng) {
      message.error(`请上传png/jpg/jpeg格式的图片`);
      return false
    }
    if (!isLt20M) {
      message.error(`请上传小于20M大小的图片`);
      return false
    }
    return isJpgOrPng && isLt20M;
  }
  
  return (
    <>
      <Upload
        {...props}
        action="/erp/v1/pic/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        headers={
          {
            token: localStorage.getItem('token'),
            roleName: localStorage.getItem('roleName')
          }

        }
      >
        {fileList.length >= imgLength ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default PicturesWall;
