function Genre({ genre, setGenre }) {
  return (
    <div className="flex flex-wrap gap-2 justify-around p-4">
      <button onClick={() => setGenre(null)} 
        className={`px-4 py-2 cursor-pointer text-white ${
            genre === '' ? 'border-b-2 border-white' : ''
        }`}
        >
        All
      </button>

      <button onClick={() => setGenre(35)} 
        className={`px-4 py-2 cursor-pointer text-white ${
            genre === 35 ? 'border-b-2 border-white' : ''
        }`}>
        Comedy
      </button>

      <button onClick={() => setGenre(28)} 
        className={`px-4 py-2 cursor-pointer text-white ${
            genre === 28 ? 'border-b-2 border-white' : ''
        }`}>
        Action
      </button>

      <button onClick={() => setGenre(10749)} 
        className={`px-4 py-2 cursor-pointer text-white ${
            genre === 10749 ? 'border-b-2 border-white' : ''
        }`}>
        Romance
      </button>

    </div>
  )
}

export default Genre
