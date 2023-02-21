import { useState } from 'react'
import { InputSelect } from './form/InputSelect/InputSelect'
import { mockOptions } from './mockOptions'
import { Select } from 'antd'
import './App.css'

function App() {
  const [value, setValue] = useState<string | undefined | null>()

  return (
    <div className='window'>
      <InputSelect<string>
        className='field пвыпыв'
        label='Выберите пользователя'
        value={value}
        onChange={setValue}
        notFoundContent={'Ничего не найдено'}
      >
        {mockOptions.map(option => 
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        )}
      </InputSelect>
    </div>
  )
}

export default App
