import React, {useEffect} from 'react'

const useTitle = (title) => {
  return (
    useEffect(()=>{
        const $title = document.getElementsByTagName('title')[0]

        $title.innerHTML = title
    }, [])
  )
}

export default useTitle