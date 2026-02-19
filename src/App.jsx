import { useReducer, useRef, useState, createContext, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import Home from './pages/Home'
import New from './pages/New'
import NotFound from './pages/NotFound'

const mockData = [
  {
    id: 1,
    createdDate: new Date().getTime(),
    emotionId: 1,
    content: '1번 일기의 내용'
  },
  {
    id: 2,
    createdDate: new Date().getTime(),
    emotionId: 3,
    content: '2번 일기의 내용'
  },
]

//기존것은 state
function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.data
    case "CREATE":
      return [action.data, ...state]
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      )
    case "DELETE":
      return state.filter(
        (item) => String(item.id) !== String(action.id)
      )
    default:
      return state
  }
}

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()

function App() {

  const [data, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(3)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    dispatch({
      type: 'INIT',
      data: mockData,
    })
    setIsDataLoaded(true)
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

  if (!isDataLoaded) return <div>로딩중</div>

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
