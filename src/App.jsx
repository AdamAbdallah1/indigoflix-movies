import React, { use, useEffect, useState } from 'react'
import Search from './assets/components/Search'
import Spinner from './assets/components/Spinner';
import MovieCard from './assets/components/MovieCard';
import { useDebounce } from 'react-use';
import Footer from './assets/components/Footer';
import Switch from './assets/components/Switch';
import Genre from './assets/components/Genre';

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const GENRE_NAMES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  const [type, setType] = useState('movie');
  const [genre, setGenre] = useState(null);

  const getGenreName = () => {
    if (!genre) return '';
    return GENRE_NAMES[genre] ? `${GENRE_NAMES[genre]}` : '';
  };

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      let endpoint

      if (query) {
        endpoint = `${API_BASE_URL}/search/${type}?query=${encodeURIComponent(query)}`
      } else {
        endpoint = `${API_BASE_URL}/discover/${type}?sort_by=popularity.desc`
        if (genre) {
          endpoint += `&with_genres=${genre}`
        }
      }

      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Failed to fetch')
      }

      const data = await response.json()

      if (!data.results) {
        setErrorMessage('No results found.')
        setMovieList([])
        return
      }

      setMovieList(data.results)
    } catch (error) {
      console.log(`Error fetching ${type}:`, error)
      setErrorMessage(`Error fetching ${type}. Please try again later.`)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    fetchMovies(debounceSearchTerm); 
  }, [debounceSearchTerm, type, genre]);
  

  return (
    <main>
      <div className='pattern' />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="" />
          
          <h1 className="text-center">
  Find <span className='text-gradient'>{type === 'movie' ? 'Movies' : 'Series'}</span> You'll Enjoy <br />
  Without the Hassle
</h1>
          <Switch type={type} setType={setType}/>
          <Genre genre={genre} setGenre={setGenre}/>
          <Search setType={setType} type={type} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className='all-movies'>
          <h2 className='mt-[40px]'>
            All {getGenreName()}{type === 'movie' ? ' Movies' : ' Series'}
          </h2>


          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map(movie => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
        

      </div>
      <Footer />
    </main>
  )
}

export default App