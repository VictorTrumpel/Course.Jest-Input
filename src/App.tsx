import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUsers } from './store/userSlice'
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
  const users = useSelector<any>(state => state.users.users) as []
  const dispatch = useDispatch()

  useEffect(() => {
    if (users.length === 0)
      dispatch(setUsers(usersMock))
  }, [])

  return (
    <div>
      ComponentA:
      <ul>
        {users.map(userName => <li>{userName}</li>)}
      </ul>
    </div>
  )
}

const ComponentB = () => {
  const users = useSelector<any>(state => state.users.users) as []
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUsers(usersMock.filter(userName => userName.startsWith('Jon'))))
  }, [])

  return (
    <div>
      ComponentB
      <ul>
        {users.map(userName => <li>{userName}</li>)}
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
