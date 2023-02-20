import { useEffect, useRef, useState } from "react"
import { differenceInCalendarDays, intervalToDuration } from "date-fns"

type Countdown = {
  daysUntil?: number
  years?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}
const useInterval = (callback: Function, intervalMs: number = 1000) => {
  const savedCallback = useRef<Function>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    let id = setInterval(tick, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])
}

export default function useCountdown(
  dateLeft: number | Date,
  dateRight: number | Date = new Date(),
  intervalMs: number = 1000
) {
  const [data, setData] = useState<Countdown>({})
  useInterval(() => {
    const daysUntil = differenceInCalendarDays(dateLeft, dateRight)
    const duration = intervalToDuration({
      end: dateLeft,
      start: dateRight,
    })
    setData({
      daysUntil,
      ...duration,
    })
  }, intervalMs)

  return data
}
