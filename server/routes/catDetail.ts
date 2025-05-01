import express from 'express'
import * as fs from 'node:fs/promises'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = JSON.parse(
      await fs.readFile('./data/blank-data.json', 'utf8'),
    )
    res.json(response)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('Something went wrong! from catDetail')
    }
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = +req.params.id
    console.log(id)

    const response = JSON.parse(
      await fs.readFile('./data/blank-data.json', 'utf8'),
    )
    console.log(response)

    const foundCat = response.cats.find((obj) => obj.Id == id)
    console.log(foundCat)

    // console.log(response.find(obj => obj.id === params))
    // const filteredCats = response.cats.filter((obj) => obj.Id === id)
    //read file for image data.json
    //find obj that matches our id and return url property
    //construct new object which is a copy of foundcat
    //add in the new url properties to get new object
    //return to json

    res.json(foundCat)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('Something went wrong! from catDetail')
    }
  }
})

export default router
