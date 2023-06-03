import { useRef, useEffect } from 'react'

export const useDebounce =
  <T extends (...args: any[]) => void>(callback: T, delay: number): typeof callback => {

    const timeout = useRef<number | null>(null)

    const clearTimer = () => { //
      if (!timeout.current)
        return

      clearTimeout(timeout.current)

      timeout.current = null
    }

    const call = (...args: any[]) => { // очищает предыдущий и ставит в очередь новую задачу
      clearTimer()

      timeout.current = setTimeout(() =>
        callback(...args),
        delay
      ) as unknown as number
    }

    useEffect(() => {
      return clearTimer()
    }, [])

    return call as T
  }

// | ввожу букву А | 
// | ввожу букву B | 
// | ввожу букву С | () => {} выполню его через 300мс
// проходит 300 мс
// выполняю () => {}