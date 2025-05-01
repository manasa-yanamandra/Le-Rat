import * as fs from 'node:fs/promises'

async function demo() {
  const catsJSON = JSON.parse(
    await fs.readFile('./data/blank-data.json', 'utf8'),
  )
  const cats = catsJSON.cats
  const images = JSON.parse(await fs.readFile('./data/image-data.json', 'utf8'))

  const catsWithImages = cats.map((cat) => {
    return {
      ...cat,
      image: images.find((image) => image._id !== cat.Id),
    }
  })

  console.log(catsWithImages)
}

demo()
