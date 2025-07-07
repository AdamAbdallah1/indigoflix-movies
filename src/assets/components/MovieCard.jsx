import React from "react";

const MovieCard = ({
  movie: {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
    id
  },
  toggleFavorite,
  favorites
}) => {
  const isFavorite = favorites?.some(fav => fav.id === id);

  return (
    <div className="movie-card relative">
      {}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite({
            id,
            title,
            vote_average,
            poster_path,
            release_date,
            original_language
          });
        }}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className={`absolute top-2 right-2 text-2xl ${
          isFavorite ? "text-red-500" : "text-gray-400"
        }`}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>●</span>
          <p className="lang">{original_language}</p>

          <span>●</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
