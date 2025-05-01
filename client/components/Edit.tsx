import { useQuery } from '@tanstack/react-query'
import { getCatImages, getCatDetail } from '../apiClient'
import { Link, useParams } from 'react-router-dom'

export default function CatDetail() {
  const { id } = useParams()
  const numberId = Number(id)

  const {
    data: catImages,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['catImages'], queryFn: getCatImages })
  const {
    data: cats,
    isPending,
    isError: isThereError,
  } = useQuery({ queryKey: ['cats', numberId], queryFn: () => getCatDetail(numberId) })

  if (isPending || isLoading) return <p>Loading...</p>
  if (isThereError|| isError) return <p>An Error occured!</p>
  if (cats || catImages) {
    
    return (
      <>
        <img
          src={catImages[id].url}
          key={catImages[id].id}
          alt={catImages[id].id}
          
        />
        <form>
        <h3 key={cats.Id}>Name: {cats.Name}</h3>
        <input type='text' placeholder='name' name='name'/>
        <p>Description: {cats.Description}</p>
        <input type='text' placeholder='description' name='description'/>
        <p>Rat: {cats.Rat}</p>
        <input type='text' placeholder='ratname' name='rat'/>
        <br />
        <button className='edit'>
          <Link to={`/`}>Edit</Link>
        </button>
        </form>
      </>
    )
  }
}
