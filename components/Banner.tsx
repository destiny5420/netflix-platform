import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Movie } from '../typings'
import { baseUrl } from '../constants/movie'

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
  }, [netflixOriginals])

  return (
    <div>
      <div className="absolute top-0 left-0 w-screen h-[95vh]">
        <Image
          layout="fill"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit="cover"
        />
      </div>
    </div>
  )
}

export default Banner
