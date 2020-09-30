
import { Tag, Input, Tooltip, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect,useRef } from 'react';

const EditableTagGroup=(props)=>{
  const {list=[],deleteSpecAttr,addSpecAttr,type,specId} =props

  const [tags,setTags] =useState([])
  const [inputVisible,setInputVisible] =useState(false)
  const [inputValue,setInputValue] =useState('')
  const saveInputRef = useRef()

  const handleClose = (removedTag,e) => {
    console.log('removedTag--',removedTag)
    deleteSpecAttr(e,removedTag,type)
  };

  const showInput=()=>{
    setInputVisible(true)
  }
  useEffect(()=>{
    console.log('saveInputRef',saveInputRef)
    if(inputVisible){
      saveInputRef.current.focus()
    }
  },[inputVisible])


  useEffect(()=>{
    console.log('list--',list)
    if(list && list.length>0){
      setTags(list)
    }
  },[list])

  const handleInputChange=(e)=>{
    setInputValue(e.target.value)
  }

  const handleInputConfirm = (e) => {
    const tagNames= tags.map((item)=>{
      return item.specAttrName
    })
    if (inputValue && tagNames.indexOf(inputValue) === -1) {
      const params={
        opType:'1',
        specAttrName:inputValue,
        specAttrStatus:'1',
        specId
      }
      addSpecAttr(e,params,type)
      setInputVisible(false)
      setInputValue('')
    }else{
      message.error('请输入格式正确的不重复的属性值')
    }
  };
  console.log('tags--',tags)
  return (
    <>
      {tags.map((tag, index) => {
        const tagName =tag.specAttrName 
        const isLongTag = tagName.length > 20;
        const tagElem = (
          <Tag
            key={tagName}
            closable={tags.length>1}
            onClose={(e) => handleClose(tag,e)}
          >
            <span>
              {isLongTag ? `${tagName.slice(0, 20)}...` : tagName}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tagName} key={tagName}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          style={{width:'100px'}}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> 新建
        </Tag>
      )}
    </>
  );


}




export default EditableTagGroup
