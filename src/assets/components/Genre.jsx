function Genre({ genre, setGenre }) {
  const mainGenres = [
    { id: null, name: 'All' },
    { id: 35, name: 'Comedy' },
    { id: 28, name: 'Action' },
    { id: 10749, name: 'Romance' },
  ];

  const moreGenres = [
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 27, name: 'Horror' },
    { id: 878, name: 'Science Fiction' },
    { id: 53, name: 'Thriller' },
    { id: 9648, name: 'Mystery' },
    { id: 36, name: 'History' },
    { id: 37, name: 'Western' },
    { id: 10402, name: 'Music' },
    { id: 10752, name: 'War' },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center p-4 items-center">
      <div className="flex gap-2">
        {mainGenres.map((g) => (
          <button
            key={g.name}
            onClick={() => setGenre(g.id)}
            className="text-white px-4 py-2 cursor-pointer"
          >
            {g.name}
          </button>
        ))}
      </div>

      <select
        className="text-white px-4 py-2 cursor-pointer"
        onChange={(e) => setGenre(Number(e.target.value))}
        defaultValue=""
      >
        <option value="" disabled>
          More Genres
        </option>
        {moreGenres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Genre;
