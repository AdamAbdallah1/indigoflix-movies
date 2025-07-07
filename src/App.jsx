import React, { useEffect, useState } from 'react';
import Search from './assets/components/Search';
import Spinner from './assets/components/Spinner';
import MovieCard from './assets/components/MovieCard';
import { useDebounce } from 'react-use';
import Footer from './assets/components/Footer';
import Switch from './assets/components/Switch';
import Genre from './assets/components/Genre';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

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
  const [type, setType] = useState('movie');
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [genre, setGenre] = useState(null);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [year, setYear] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);

  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

  const getGenreName = () => {
    if (!genre) return '';
    return GENRE_NAMES[genre] ? `${GENRE_NAMES[genre]} ` : '';
  };

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      let endpoint = '';

      if (query) {
        endpoint = `${API_BASE_URL}/search/${type}?query=${encodeURIComponent(query)}`;
      } else {
        endpoint = `${API_BASE_URL}/discover/${type}?sort_by=${sortBy}`;
        if (genre) {
          endpoint += `&with_genres=${genre}`;
        }
        if (year) {
          endpoint += `&primary_release_year=${year}`;
        }
      }

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (!data.results) {
        setErrorMessage('No results found.');
        setMovieList([]);
        return;
      }

      setMovieList(data.results);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!showFavorites) {
      fetchMovies(debounceSearchTerm);
    }
  }, [debounceSearchTerm, type, genre, sortBy, year, showFavorites]);

  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const isFavorite = prev.some(fav => fav.id === movie.id);
      let updated;

      if (isFavorite) {
        updated = prev.filter(fav => fav.id !== movie.id);
      } else {
        updated = [...prev, movie];
      }

      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <main>
      <div className='pattern' />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="" />
          <h1>
            Find <span className="text-gradient">{type === 'movie' ? 'Movies' : 'Series'}</span> You'll Enjoy <br /> Without the Hassle
          </h1>
          <Switch type={type} setType={setType} />

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <Genre setGenre={setGenre} />

        <div className="flex flex-wrap gap-4 justify-center mt-4 items-center">
          <select
            className="bg-[#030014] text-white px-4 py-2 cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="vote_average.desc">Top Rated</option>
            <option value="release_date.desc">Newest</option>
            <option value="release_date.asc">Oldest</option>
          </select>

          <input
            type="number"
            placeholder="Year"
            className="bg-[#030014] text-white px-4 py-2 w-[100px]"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <button
            onClick={() => setShowFavorites(prev => !prev)}
            className="bg-[#030014] text-white px-4 py-2 cursor-pointer ml-4"
          >
            {showFavorites ? 'Show All' : 'Show Favorites'}
          </button>
        </div>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>
            {showFavorites
              ? `Your Favorite ${type === 'movie' ? 'Movies' : 'Series'}`
              : `All ${getGenreName()}${type === 'movie' ? 'Movies' : 'Series'}`}
          </h2>

          {isLoading && !showFavorites ? (
            <Spinner />
          ) : errorMessage && !showFavorites ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : showFavorites ? (
            favorites.length === 0 ? (
              <p>You have no favorites yet.</p>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {favorites
                  .filter(fav => fav.media_type === type || (!fav.media_type && type === 'movie'))
                  .map(fav => (
                    <MovieCard
                      key={fav.id}
                      movie={fav}
                      toggleFavorite={toggleFavorite}
                      favorites={favorites}
                    />
                  ))}
              </ul>
            )
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {movieList.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  toggleFavorite={toggleFavorite}
                  favorites={favorites}
                />
              ))}
            </ul>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default App;
