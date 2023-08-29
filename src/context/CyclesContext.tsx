import { ReactNode, createContext, useReducer, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountOfSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

interface CyclesReducerAction {
  type: 'ADD_NEW_CYCLE' | 'INTERRUPT_CYCLE' | 'MARK_CYCLE_AS_COMPLETED'
  payload: any
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, dispatch] = useReducer(
    (state: Cycle[], action: CyclesReducerAction) => {
      const { type, payload } = action

      switch (type) {
        case 'ADD_NEW_CYCLE':
          return [...state, payload.newCycle]

        case 'INTERRUPT_CYCLE':
          return state.map((cycle) => {
            if (cycle.id === payload.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() }
            } else {
              return cycle
            }
          })

        case 'MARK_CYCLE_AS_COMPLETED':
          return state.map((cycle) => {
            if (cycle.id === payload.activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
            } else {
              return cycle
            }
          })

        default:
          return state
      }
    },
    [],
  )

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountOfSecondsPassed, setAmountOfSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountOfSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })

    setActiveCycleId(id)
    setAmountOfSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CYCLE',
      payload: {
        activeCycleId,
      },
    })

    document.title = 'Ignite Timer'

    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CYCLE_AS_COMPLETED',
      payload: {
        activeCycleId,
      },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountOfSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
