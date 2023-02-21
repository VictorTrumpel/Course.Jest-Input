import { useState, FocusEvent } from 'react'
import { Select, SelectProps } from 'antd'
import cn from 'classnames'
import '../BaseInputStyle.css'

type InputSelectOption = {
  value: string | number
  label: unknown
}

type InputSelectProps<ValueType extends InputSelectOption['value']> = {
  label?: string
} & Omit<
  SelectProps<ValueType>, 
  'placeholder' | 'mode' | 'maxTagPlaceholder'
> 

export function InputSelect<ValueType extends InputSelectOption['value']>({
  children,
  className,
  label = '',
  onFocus,
  onBlur,
  value,
  ...baseInputSelectProps
}: InputSelectProps<ValueType>) {
  const [isFocus, setIsFocus] = useState(false)

  const isEmpty = isValueEmpty(value)

  const handleFocus = (e: FocusEvent<HTMLElement>) => {
    setIsFocus(true)
    onFocus?.(e)
  }

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    setIsFocus(false)
    onBlur?.(e)
  }

  return (
    <div className={cn('custorm-field-wrapper', className, { isFocus, isEmpty })}>
      <Select
        size='large'
        allowClear
        showSearch
        value={value}
        showAction={['focus']}
        dropdownMatchSelectWidth
        getPopupContainer={trigger => trigger.parentNode}
        filterOption={false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...baseInputSelectProps}
      >
        {children}
      </Select>

      {label && (
        <label className='field-label'>
          {label}
        </label>
      )}
    </div>
  )
}

const isValueEmpty = (value: InputSelectProps<InputSelectOption['value']>['value']) => {
  if (typeof value === 'number') {
    return String(value) === 'NaN'
  }
  return !Boolean(value)
} 