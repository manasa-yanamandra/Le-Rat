import { createRoutesFromElements, Route } from 'react-router-dom'
import Cats from './components/Cats'
import CatDetail from './components/CatDetail'
import Edit from './components/Edit'
export default createRoutesFromElements(
  <Route path="/">
    <Route index element={<Cats />} />
    <Route path="/cats/:id" element={<CatDetail />} />
    <Route path="/:id/edit" element={<Edit />} />
  </Route>,
)
