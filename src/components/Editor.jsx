import React, { useState } from 'react'
import './Editor.css'
import Button from './Button'
import EmotionItem from './EmotionItem'
import { useNavigate } from 'react-router-dom'
import { getStringedDate } from '../utill/getStringedDate'
import { emotionList } from '../utill/constants'

const Editor = ({ onSumit }) => {

    const nav = useNavigate()

    const [input, setInput] = useState({
        createdDate: new Date(),
        emotionId: 3,
        content: ''
    })

    const onChangeInput = (e) => {
        let name = e.target.name
        let value = e.target.value

        if (name === 'createdDate') {
            value = new Date(value)
        }
        setInput({
            ...input,
            [name]: value,
        })
    }
    const onSumitButtonClick=()=>{
        onSumit(input)
    }
    return (
        <div className='Editor'>
            <section className='date-section'>
                <h4>오늘의 날짜</h4>
                <input
                    type="date"
                    name='createdDate'
                    onChange={onChangeInput}
                    value={getStringedDate(input.createdDate)}
                />
            </section>

            <h4>오늘의 감정</h4>
            <section className='emotion-section'>
                {emotionList.map((item) => (
                    <EmotionItem
                        key={item.emotionId}
                        {...item}
                        onClick={()=>{
                            onChangeInput({
                                target:{
                                    name:'emotionId',
                                    value:item.emotionId
                                }
                            })
                        }}
                        isSelected={item.emotionId == input.emotionId}
                    />
                ))}
            </section>

            <section className='content-section'>
                <h4>오늘의 일기</h4>
                <textarea
                placeholder='오늘은 어땠나요?'
                name='content'
                onChange={onChangeInput}
                value={input.content}
                >

                </textarea>
            </section>
            <section className="button-section">
                <Button
                text={'취소하기'}
                onClick={()=>nav(-1)}
                />
                <Button
                text={'작성완료'}
                type={'POSITIVE'} 
                onClick={onSumitButtonClick}
                />
            </section>
        </div>
    )
}

export default Editor