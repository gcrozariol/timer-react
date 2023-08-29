import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ActivityContainer, ActivityList, Status } from './styles'
import { CyclesContext } from '../../context/CyclesContext'

export function Activity() {
  const { cycles } = useContext(CyclesContext)

  return (
    <ActivityContainer>
      <h1>Activity</h1>

      <ActivityList>
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Duration</th>
              <th>Started At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutes</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, { addSuffix: true })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Completed</Status>
                    )}

                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrupted</Status>
                    )}

                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <Status statusColor="yellow">In Progress</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </ActivityList>
    </ActivityContainer>
  )
}
