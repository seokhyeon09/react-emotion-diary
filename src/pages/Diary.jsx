import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import Viewer from '../components/Viewer'
import useDiary from '../hooks/useDiary'
import { getStringedDate } from '../utill/getStringedDate'

const Diary = () => {
  const {id} = useParams()
  const nav = useNavigate()

  const curDiaryItem = useDiary({id})
  if(!curDiaryItem){
    return <div>불러오는 중....</div>
  }

  const {createdDate, emotionId, content} = curDiaryItem
  const title=getStringedDate(new Date(createdDate))
  return (
    <div>
      <Header
        leftChild={<Button
          text={'뒤로가기'}
          onClick={()=>nav(-1)}
        />}
        title={title}
        rightChild={<Button
          text={'수정하기'}
          type={'POSITIVE'}
          onClick={()=>nav(`/edit/${id}`)}
          />}
      />
      <Viewer emotionId={emotionId} content={content}/>
    </div>
  )
}

export default Diary