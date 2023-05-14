import { InputSelectUser } from '../form/InputSelectUser/InputSelectUser'
import { InputSelect } from '../form/InputSelect/InputSelect'
import { useFormikContext } from 'formik'
import { Button } from 'antd'
import './AppealFields.css'

export type AppealFormValues = {
  user: string
  user2: string
  service: string
}

export const AppealFields = () => {
  const { values, setFieldValue } = useFormikContext<AppealFormValues>()

  const staticOptions = [
    { label: 'Иван Игоревич', value: '1' },
    { label: 'Игорь Румянцев', value: '2' },
    { label: 'Данила Козловский', value: '3' }
  ]
  
  const handleClick = () => {
    setFieldValue('user', '63f0cd8094fa17fb9edc5805')
    setFieldValue('service', '3')
  } 

  return (
    <div className='appeal-form-container'>

      <InputSelectUser 
        className='simple-input-select'
        label='Селект, который общается с АПИ'
        value={values.user}
        onChange={(value) => setFieldValue('user', value)}
        filterOption={(inputText, option) =>
          String(option?.label).includes(inputText)
        }
      />

      <InputSelectUser 
        className='simple-input-select'
        label='Селект, который общается с АПИ user 2'
        value={values.user2}
        onChange={(value) => setFieldValue('user2', value)}
        filterOption={(inputText, option) =>
          String(option?.label).includes(inputText)
        }
      />

      <InputSelect 
        className='simple-input-select'
        label='Обычный селект'
        value={values.service}
        options={staticOptions}
        onChange={(value) => setFieldValue('service', value)}
        filterOption={(inputText, option) =>
          String(option?.label).includes(inputText)
        }
      />

      <div className='simple-input-select'>
        <Button onClick={handleClick}>Засеттать значения</Button>
      </div>

    </div>
  )
}