import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Editor from '../components/Editor'
import Button from '../components/Button'
import { DiaryDispatchContext } from '../App'

const New = () => {
  const nav = useNavigate()
  const { onCreate } = useContext(DiaryDispatchContext)

  const onSumit = (input) => {
    onCreate(
      input.createdDate.getTime(),
      input.emotionId,
      input.content,
    )
    nav('/',{replace:true})
  }
  return (
    <div>
      <Header
        title={'새 일기 쓰기'}
        leftChild={
          <Button
            text={'< 뒤로 가기'}
            onClick={() => nav(-1)}
          />}
      />
      <Editor onSumit={onSumit} />

    </div>
  )
}

export default New