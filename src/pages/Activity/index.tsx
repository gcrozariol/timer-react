import { ActivityContainer, ActivityList } from './styles'

export function Activity() {
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
            <tr>
              <td>Task</td>
              <td>20 min</td>
              <td>2 months ago</td>
              <td>Finished at</td>
            </tr>
          </tbody>
        </table>
      </ActivityList>
    </ActivityContainer>
  )
}
