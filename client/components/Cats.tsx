import { useQuery } from '@tanstack/react-query'
import { getCatImages, getCats } from '../apiClient'
import { Link } from 'react-router-dom'

export default function Cats() {
  const {
    data: catImages,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['images'], queryFn: getCatImages })
  const {
    data: cats,
    isPending,
    isError: isThereError,
  } = useQuery({ queryKey: ['cats'], queryFn: getCats })

  if (isLoading || isPending) return <p>Loading...</p>
  if (isError || isThereError) return <p>An Error occured!</p>
  if (catImages && cats) {
    console.log(catImages)
  
    return (
      <div className="main">
        <div className='logo'>
        <img src='/images/Mouse-detective.png' alt='rat2' className='ratImage'/>
        <img src="/images/Heading-6.png" alt="logo" className="logoImage" />
        <img src='/images/mouse-detective-logo.png' alt='rat1' className='ratImage'/>
        </div>
        <div  className="wrapper">
        {catImages.map((catImage, index) => (
          
          <Link key={catImage.id} to={`/cats/${index}`}>
            <img  src={catImage.url} alt={index} className="catImage" /></Link>
            
          
        ))}
        </div>
        {/* {cats.cats.map((cat) => (
              <h3 key={cat.Id} className="text">
                <Link to={`/cats/${cat.Id}`}>
                  Name: {cat.Name ? cat.Name : 'undefined(404)'}
                </Link>
              </h3>
            ))} */}
      </div>
    )
  }
}
