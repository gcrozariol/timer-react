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
  amountOfSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
  markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

interface CyclesReducerState {
  cycles: Cycle[]
  activeCycleId: string | null
}

interface CyclesReducerAction {
  type: 'ADD_NEW_CYCLE' | 'INTERRUPT_CYCLE' | 'MARK_CYCLE_AS_COMPLETED'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesReducerState, action: CyclesReducerAction) => {
      const { cycles, activeCycleId } = state
      const { type, payload } = action

      switch (type) {
        case 'ADD_NEW_CYCLE':
          return {
            ...state,
            cycles: [...cycles, payload.newCycle],
            activeCycleId: payload.newCycle.id,
          }

        case 'INTERRUPT_CYCLE':
          document.title = 'Ignite Timer'

          return {
            ...state,
            cycles: cycles.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }

        case 'MARK_CYCLE_AS_COMPLETED':
          return {
            ...state,
            cycles: cycles.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }

        default:
          return state
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const { cycles, activeCycleId } = cyclesState

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

    setAmountOfSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({ type: 'INTERRUPT_CYCLE' })
  }

  function markCurrentCycleAsFinished() {
    dispatch({ type: 'MARK_CYCLE_AS_COMPLETED' })
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountOfSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        markCurrentCycleAsFinished,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
