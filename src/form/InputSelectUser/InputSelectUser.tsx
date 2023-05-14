import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { InputSelect, InputSelectProps } from '../InputSelect/InputSelect'
import { IUser } from '../../api/userApi/UserConstructor'
import { userApi } from '../../api/userApi/userApi'
import { UserListQueryParams } from '../../api/userApi/GetUserListQuery'
import { Select, Spin } from 'antd'
import { useDebounce } from '../../hook/useDebounce'
import { uniqBy } from 'lodash'

import './InputSelectUser.css'

type InputSelectUserProps = Omit<InputSelectProps<IUser['id']>, 'options'>

export const InputSelectUser = ({
  value,
  ...props
}: InputSelectUserProps) => {  
  const [options, setOptions] = useState<IUser[]>([])

  const [isInitOptionsLoad, setIsInitOptionsLoad] = useState(false)

  const initialOptions = useRef<IUser[]>([])

  const [loadById] = userApi.useLazyGetByIdQuery()
  const [loadList, listQuery] = userApi.useLazyGetListQuery()
  const { data: chunkData, isFetching } = listQuery
  const { listOptions: chunkOptions, meta } = chunkData || { listOptions: [] }

  const isNeedMoreChunk = (): boolean  => {
    const isOnLastPage = meta?.page === meta?.totalPages
    if (!meta || isFetching || isOnLastPage)
      return false
    return true
  }

  const loadInitList = async (value?: IUser['id'] | null) => {
    setIsInitOptionsLoad(true)

    const { data } = await loadList(makeQuery(), true)

    const optionsChunk = uniqBy([
      ...data?.listOptions || [],
      ...options
    ], 'id')

    const hasAlreadyOption = () =>
      optionsChunk.some(({ id }) => id === value)

    if (value && !hasAlreadyOption()) {
      const { data: userData } = await loadById(value, true)

      if (userData)
        optionsChunk.push({ ...userData })
    }

    setIsInitOptionsLoad(false)

    return optionsChunk
  }

  const queryByText = useDebounce((searchText: string) => {
    if (!isNeedMoreChunk())
      return
    
    loadList(makeQuery({ searchText }), true)
  }, 300)

  const handleScrollOnEnd = () => {
    if (isNeedMoreChunk())    
      loadList(makeQuery({ page: Number(meta?.page) + 1 }), true)
  }

  const handleSearch = (searchText: string) => {
    setOptions(searchText.trim() ? [] : initialOptions.current)
    queryByText(searchText)
  }

  // запускаем загрузку базовых опций, до первого рендера, что бы сразу показывать скелетон
  useLayoutEffect(() => { 
    loadInitList(value).then((initOptions) => {
      initialOptions.current = initOptions
      setOptions(initOptions)
    })
  }, [value])

  useEffect(() => {
    if (isInitOptionsLoad)
      return
    setOptions(uniqBy([...options, ...chunkOptions], 'id'))
  }, [chunkData])

  if (isInitOptionsLoad)
    return <Skeleton />

  return (
    <InputSelect
      {...props }
      value={value}
      loading={isFetching}
      onSearch={handleSearch}
      filterOption={() => true}
      onClear={() => setOptions(initialOptions.current)}
    >
      <>
        {options.map(user => (
          <Select.Option key={user.id}>
            {user.fullName}
          </Select.Option>
        ))}

        <Select.Option key='trigger' disabled>
          <LastOption 
            onMount={() => {
              if (options.length > 0)
                handleScrollOnEnd()
            }} 
            isLoading={isFetching}
            text='Больше пользователей нет'
          />
        </Select.Option>
      </>
    </InputSelect>
  )
}

const LastOption = ({ 
  onMount, 
  isLoading,
  text
}: { 
  onMount: () => void,
  isLoading: boolean,
  text: string
}) => {
  useEffect(() => { onMount() }, [])
  return <div className='last-option'>{isLoading ? <Spin /> : text}</div>
}

const Skeleton = () => 
  <div className='simple-input-select custorm-field-wrapper gradient-loading-block' />


const PER_PAGE = 30

const makeQuery = ({
  page = 1,
  perPage = PER_PAGE,
  searchText = ''
}: Partial<UserListQueryParams> = {}): UserListQueryParams => {
  if (!searchText)
    return { page, perPage }
  return { page, perPage, searchText }
} 