import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesReducerState {
  cycles: Cycle[]
  activeCycleId: string | null
}

interface CyclesReducerAction {
  type: ActionTypes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

export function cyclesReducer(
  state: CyclesReducerState,
  action: CyclesReducerAction,
) {
  const { cycles, activeCycleId } = state
  const { type, payload } = action

  switch (type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...cycles, payload.newCycle],
        activeCycleId: payload.newCycle.id,
      }

    case ActionTypes.INTERRUPT_CYCLE:
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

    case ActionTypes.MARK_CYCLE_AS_COMPLETED:
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
}
