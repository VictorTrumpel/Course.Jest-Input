import { useState, useCallback, useEffect } from 'react'
import { AppealForm } from './AppealForm/AppealForm'
import { InputSelect } from './form/InputSelect/InputSelect'
import { Button } from 'antd'
import { debounce } from 'lodash'
import { useDebounce } from './hook/useDebounce'
import './App.css'

function App() {
  const [meta, setMeta] = useState({ page: 1, perPage: 30 })

  const handleSearch_lodash = useCallback(debounce((text: string) => {
    console.log('meta :>> ', meta)
    console.log('text :>> ', text)
  }, 300), [])

  const handleSearch_custom = useDebounce((text: string) => {
    console.log('meta :>> ', meta)
    console.log('text :>> ', text)
  }, 300)

  return (
    <div className='window'>
      {/* <div>page: {meta.page}</div> */}

      {/* <div>page: {meta.perPage}</div> */}

      {/* <AppealForm /> */}

      {/* <InputSelect 
        label='ПРОСТО ИНПУТ'
        onSearch={(text) => {
          setMeta({ page: Math.random(), perPage: Math.random() })

          // handleSearch_lodash(text)

          handleSearch_custom(text)
        }}
      /> */}
    </div>
  )
}

export default App
