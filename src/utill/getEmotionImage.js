import emotion1 from '../assets/너무좋아요.png'
import emotion2 from '../assets/좋아요.png'
import emotion3 from '../assets/그저그래요.png'
import emotion4 from '../assets/힘들어요.png'
import emotion5 from '../assets/슬퍼요.png'
export const getEmotionImage = (emotionId) =>{
    switch(emotionId){
        case 1 : return emotion1
        case 2 : return emotion2
        case 3 : return emotion3
        case 4 : return emotion4
        case 5 : return emotion5
        default : return null
    }
}