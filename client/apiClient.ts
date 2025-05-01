import request from 'superagent'
import { Cats, CatsId } from '../models/cats'
import { Welcome, Cat } from '../models/catDetails'

export async function getCatImages(): Promise<Cats[] | CatsId[]> {
  const res = await request.get('/api/v1/cats/images')
  return res.body
}

export async function getCats(): Promise<Welcome> {
  const res = await request.get('/api/v2/cats')
  return res.body
}

export async function getCatDetail(id: number): Promise<Cat> {
  const res = await request.get(`/api/v2/cats/${id}`)
  return res.body
}
