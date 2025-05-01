import express from 'express'
import request from 'superagent'
import { Cats } from '../../models/cats'
import * as fs from 'node:fs/promises'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()
const serverURL = 'https://api.thecatapi.com/v1/images/search?limit=10'

router.get('/images', async (req, res) => {
  try {
    const apiKey = process.env.API_KEY || ''
    const response = await request.get(`${serverURL}`).set('x-api-key', apiKey)
    const cats: Cats[] = response.body
    const newData = cats.map((obj, index) => ({ ...obj, _id: index+1 }))

    const updatedJson = JSON.stringify(newData, null, 2)
    res.json(cats)
    return await fs.writeFile('./data/image-data.json', updatedJson, 'utf8')
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('Something went wrong!')
    }
  }
})



// router.patch('/images', async (req, res) => {
//   try {
//     const json = JSON.parse(await fs.readFile('./data/image-data.json', 'utf8'))
//     console.log(typeof json)

//     res.sendStatus(201)
//   } catch (err) {
//     if (err instanceof Error) {
//       res.status(500).send((err as Error).message)
//     } else {
//       res.status(500).send('Something went wrong!')
//     }
//   }
// })

export default router
