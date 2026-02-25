import { useReducer, useRef, useState, createContext, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import Home from './pages/Home'
import New from './pages/New'
import NotFound from './pages/NotFound'

//기존것은 state
function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT":
      return action.data
    case "CREATE":
      nextState = [action.data, ...state]
      break;
    case "UPDATE":
      nextState= state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      )
      break;
    case "DELETE":
      nextState= state.filter(
        (item) => String(item.id) !== String(action.id)
      )
      break;
    default:
      return state
  }
  //로컬 저장소에 diary라는 이름으로 nextState저장
  localStorage.setItem('diary', JSON.stringify(nextState))
  return nextState
}

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()

function App() {

  const [data, dispatch] = useReducer(reducer, [])
  const idRef = useRef(0)
  const [isDataLoaded, setIsDataLoaded] = useState(true)

  useEffect(() => {
    const storedData = localStorage.getItem('diary')

    if(!storedData){
      localStorage.getItem('diary', JSON.stringify([]))
      setIsDataLoaded(false)
      return
    }
    let parsed=[]
    try{
      parsed=JSON.parse(storedData)
    }catch(error){
      localStorage.setItem('diary', JSON.stringify([]))
      return
    }

    // parsed가 배열인지 확인
    if(!Array.isArray(parsed)){
      setIsDataLoaded(false)
      return
    }

    let maxId=0
    parsed.forEach((item)=>{
      if(Number(item.id)>maxId){
        maxId=item.id
      }
    })
    idRef.current=maxId+1
    dispatch({
      type: 'INIT',
      data: parsed,
    })
    setIsDataLoaded(false)
  }, [])

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      }
    })
  }

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      }
    })
  }

  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      id,
    })
  }

  // if (!isDataLoaded) return <div>로딩중</div>

  return (
    <div>
      {/* <button onClick={() => onCreate(new Date().getTime(), 4, 'hello')}>일기 추가하기</button>
      <button onClick={() => onUpdate(1, new Date().getTime(), 4, '1번 수정')}>일기 수정하기</button>
      <button onClick={() => onDelete(2)}>일기 삭제하기</button> */}
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/diary/:id' element={<Diary />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </div>
  )
}

export default App
