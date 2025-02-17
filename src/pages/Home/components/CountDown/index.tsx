import { useContext, useEffect } from 'react'
import { CountdonwContainer, Separator } from './styles'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { differenceInSeconds } from 'date-fns'

export function CountDown() {
  const {
    markCurrentCycleAsFinished,
    amountSecodnsPast,
    setSecondsPast,
    activeCycle,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecodnsPast : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const currentSecods = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(currentSecods).padStart(2, '0')

  console.log('minutes', minutes)
  console.log('seconds', seconds)
  console.log('toatlSeconds', totalSeconds)

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} - ${activeCycle.task}`
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const diffInSeconds = differenceInSeconds(
          new Date(),
          activeCycle.startedAt,
        )

        if (diffInSeconds >= totalSeconds) {
          markCurrentCycleAsFinished()
          clearInterval(interval)
        } else {
          setSecondsPast(diffInSeconds)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    markCurrentCycleAsFinished,
    totalSeconds,
    amountSecodnsPast,
    setSecondsPast,
  ])

  return (
    <CountdonwContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdonwContainer>
  )
}
