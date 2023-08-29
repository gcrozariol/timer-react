import { produce } from 'immer'
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
    case ActionTypes.ADD_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cycles.push(payload.newCycle)
        draft.activeCycleId = payload.newCycle.id
      })
    }

    case ActionTypes.INTERRUPT_CYCLE: {
      document.title = 'Ignite Timer'

      const currentCycleIndex = cycles.findIndex(
        (cycle) => cycle.id === activeCycleId,
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }

    case ActionTypes.MARK_CYCLE_AS_COMPLETED: {
      document.title = 'Ignite Timer'

      const currentCycleIndex = cycles.findIndex(
        (cycle) => cycle.id === activeCycleId,
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }

    default:
      return state
  }
}
