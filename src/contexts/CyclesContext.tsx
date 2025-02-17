import { createContext, ReactNode, useState } from 'react'

type Cyle = {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  interruptedDate?: Date
  finishedDate?: Date
}

type ContextCycleFormData = {
  task: string
  minutesAmount: number
}

type CyclesContextData = {
  activeCycle: Cyle | undefined
  isActiveCyleId: string | null
  amountSecodnsPast: number
  markCurrentCycleAsFinished: () => void
  setSecondsPast: (seconds: number) => void
  createNewCyle: (data: ContextCycleFormData) => void
  doInterruptCycle: () => void
  cycles: Cyle[]
}

export const CyclesContext = createContext({} as CyclesContextData)

type CyclesContextProviderProps = {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cyle[]>([])

  const [isActiveCyleId, setIsActiveCyleId] = useState<string | null>(null)
  const [amountSecodnsPast, setAmountSecodnsPast] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === isActiveCyleId)

  const setSecondsPast = (seconds: number) => {
    setAmountSecodnsPast(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycle?.id) {
          return { ...cycle, finishedDate: new Date() }
        }
        return cycle
      }),
    )
    setIsActiveCyleId(null)
    setAmountSecodnsPast(0)
    // reset()
  }

  function createNewCyle(data: ContextCycleFormData) {
    const newCyle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }
    setCycles((state) => [...state, newCyle])
    setIsActiveCyleId(newCyle.id)

    setAmountSecodnsPast(0)
  }

  function doInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycle?.id) {
          return { ...cycle, interruptedDate: new Date() }
        }
        return cycle
      }),
    )

    setIsActiveCyleId(null)
    setAmountSecodnsPast(0)
    // reset()
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        isActiveCyleId,
        activeCycle,
        markCurrentCycleAsFinished,
        amountSecodnsPast,
        setSecondsPast,
        createNewCyle,
        doInterruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
