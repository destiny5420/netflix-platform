import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/solid'
import { Element, Genre } from '../typings'
import ReactPlayer from 'react-player'
import { FaPlay } from 'react-icons/fa'

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (!movie) {
      return
    }

    async function fetchMovie() {
      const response = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${
          movie?.id
        }?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
      )
      const data = await response.json()

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )

        setTrailer(data.videos?.results[index]?.key)
      }

      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute top-5 right-5 !z-40 w-9 h-9 border-none bg-[#181818] hover:bg-[#181818]">
          <XIcon className="w-6 h-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            width={`100%`}
            height={`100%`}
            playing
            muted={muted}
            style={{
              position: 'absolute',
              top: '0',
              left: '0'
            }}
            url={`https://www.youtube.com/watch?v=${trailer}`}
          />

          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="w-7 h-7 text-black" />
                Play
              </button>

              <button className="modalButton">
                <PlusIcon className="w-7 h-7" />
              </button>

              <button className="modalButton">
                <ThumbUpIcon className="w-7 h-7" />
              </button>
            </div>

            <button
              className="modalButton"
              onClick={() => {
                setMuted((old) => !old)
              }}>
              {muted ? <VolumeOffIcon className="w-6 h-6" /> : <VolumeUpIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8 ">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">{movie?.vote_average * 10}% Match</p>
              <p className="font-light">{movie?.release_date || movie?.first_air_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original language: </span>
                  {movie?.original_language}
                </div>

                <div className="text-[gray]">
                  <span className="text-[gray]">Total votes: </span>
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  )
}

export default Modal