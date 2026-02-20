import React from 'react'
import './DiaryItem.css'
import { getEmotionImage } from '../utill/getEmotionImage'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
const DiaryItem = ({ id, content, createdDate, emotionId }) => {
    const nav = useNavigate()
    return (
        <div className='DiaryItem'>
            <div
                onClick={() => nav(`/diary/${id}`)}
                className={`img-section bg-${emotionId}`}>
                <img src={getEmotionImage(emotionId)} alt="icon" />
            </div>
            <div
                onClick={() => nav(`/diary/${id}`)}
                className="info-section">
                <div className="created-date">{new Date(createdDate).toLocaleDateString()}</div>
                <div className="content">{content}</div>
            </div>
            <div className="button-section">
                <Button text={'수정하기'} />
            </div>
        </div>
    )
}

export default DiaryItem