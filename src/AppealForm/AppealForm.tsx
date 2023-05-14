import { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { AppealFields, AppealFormValues } from './AppealFields'

export const AppealForm = () => {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    setTimeout(() => { setIsShow(true) }, 1000)
  }, [])

  return (
    <Formik<AppealFormValues>
      initialValues={{
        user: '63f0cd80ebd9c1121997baff',
        service: '',
        user2: '63f0cd80ebd9c1121997baff'
      }}
      onSubmit={() => undefined}
    >
      <AppealFields />
    </Formik>
  )
}