import { useQuery } from '@tanstack/react-query'
import { getCats, getCatImages, getCatDetail } from '../apiClient'
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
  if (cats) {
    console.log('Tom and Gerry', cats)
    return (
      <>
        <img
          src={catImages[id].url}
          key={catImages[id].id}
          alt={catImages[id].id}
          
        />
        <h3 key={cats.Id}>Name: {cats.Name}</h3>
        <p>Description: {cats.Description}</p>
        <p>Rat: {cats.Rat}</p>
        <button>
          <Link to={`/${id}/edit`}>Edit</Link>
        </button>
      </>
    )
  }
}
