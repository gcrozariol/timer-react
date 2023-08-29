import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Activity } from './pages/Activity'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/activity" element={<Activity />} />
      </Route>
    </Routes>
  )
}
