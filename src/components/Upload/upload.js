import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import apiGetData from '@/utils/apiMeth'

const PicturesWall = (props) => {
    const [fileList, setFileList] = useState([]);
    const { fileImgs, getFileListData, imgLength } = props;

    useEffect(() => {
        setFileList(fileImgs);
    }, [fileImgs]);

    const handleChange = (files) => {
        if(!files.file.status) return
        setFileList(files.fileList);
        if (files.file.status === 'done') {
          const newFileList = cloneDeep(files.fileList)
          const result = newFileList.filter((item)=>{
            return item.type && item.type !== "" 
          })
          for (let i = 0; i < result.length; i++) {
            if (result[i].response && result[i].response.code === 0  ) {
              result[i].url = result[i].response.data;
            }
          }
          getFileListData(result);
        }
        if (files.file.status === 'removed'){
          const newFileList = cloneDeep(files.fileList)
          getFileListData(newFileList);
        } 
      };

    const uploadButton = (
        <div>
            <Button icon={<UploadOutlined />} disabled={fileList.length >= imgLength}>点击上传</Button>
        </div>
    );

    const customUpRequest = (reqFile) => {
        const { file, onSuccess, onError } = reqFile;
        const data = new FormData();
        data.append('file', file);
        apiGetData('POST', "/erp/v1/file/upload", data, false).then(res => {
            if (res) {
                onSuccess({
                    code: 0,
                    data: res
                });
            } else {
                onError('url不存在')
            }
        }).catch(err => {
            onError(err)
        })
    };

    const beforeUpload=(file)=>{
        const isLt20M = file.size / 1024 / 1024 < 100;
        if (!isLt20M) {
          message.error(`请上传小于100M大小的语音文件`);
          return false
        }
        return  isLt20M;
      }

    return (
        <>
            <Upload
                beforeUpload={beforeUpload}
                fileList={fileList}
                customRequest={customUpRequest}
                onChange={handleChange}
                headers={
                    {
                        token: localStorage.getItem('token'),
                        roleName: localStorage.getItem('roleName')
                    }

                }
            >
                {uploadButton}
            </Upload>
        </>
    );
};

export default PicturesWall;
