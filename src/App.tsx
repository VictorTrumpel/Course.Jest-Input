import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { userApi } from './api/userApi/userApi'
import './App.css'

// Демонстрация проблемы неявных связей
function App() {
  const [currentTab, setCurrentTab] = useState<'tab1' | 'tab2'>('tab1')

  return (
    <div className='window'>
      <div>
        <Button onClick={() => setCurrentTab('tab1')}>Tab 1</Button>
        <Button onClick={() => setCurrentTab('tab2')}>Tab 2</Button>
      </div>
      
      {currentTab === 'tab1' && (
        <ComponentA />
      )}

      {currentTab === 'tab2' && (
        <ComponentB />
      )}
    </div>
  )
}

const ComponentA = () => {
  const { data, isFetching } = userApi.useGetListQuery({ page: 1, perPage: 20 })
  const { listOptions } = data || { listOptions: [] }

  useEffect(() => {
    console.log(data)
  }, [data])

  if (isFetching) {
    return <div>Loading...</div>
  }

  return (
    <div>
      ComponentA:
      <ul>
        {listOptions.map(user => <li>{user.fullName}</li>)}
      </ul>
    </div>
  )
}

const ComponentB = () => {
  const [options, setOptions] = useState({ page: 1, perPage: 20 })
  const { data, isFetching } = userApi.useGetListQuery(options)
  const { listOptions } = data || { listOptions: [] }

  const updateOptions = () => {
    setOptions({ page: 2, perPage: 20 })
  }

  if (isFetching) {
    return <div>Loading...</div>
  }

  return (
    <div>
      ComponentB:
      <Button onClick={updateOptions}>update options</Button>
      <ul>
        {listOptions.map(user => <li>{user.fullName}</li>)}
      </ul>
    </div>
  )
}

const usersMock = [
  'Jon Hovever',
  'Kali Djiner',
  'Molly Safer',
  'Adrian Moligan',
  'Hristofer Nollan'
]

export default App
