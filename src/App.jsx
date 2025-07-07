import React, { use, useEffect, useState } from 'react'
import Search from './assets/components/Search'
import Spinner from './assets/components/Spinner';
import MovieCard from './assets/components/MovieCard';
import { useDebounce } from 'react-use';
import Footer from './assets/components/Footer';
import Switch from './assets/components/Switch';

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [type, setType] = useState('movie');

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const endpoint = query
      ? `${API_BASE_URL}/search/${type}?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/${type}?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      if (!data.results) {
        setErrorMessage('No results found.');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.log(`Error fetching ${type}:`, error);
      setErrorMessage(`Error fetching ${type}. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchMovies(debounceSearchTerm); 
  }, [debounceSearchTerm, type]);
  

  return (
    <main>
      <div className='pattern' />

      <div className="wrapper">
        <header>
          <Switch type={type} setType={setType}/>
          <img src="./hero.png" alt="" />
          
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
          
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className='all-movies'>
          <h2 className='mt-[40px]' >All Movies</h2>

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