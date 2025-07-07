function Genre({ setGenre }) {
  return (
    <div className="flex flex-wrap gap-2 justify-around p-4">
      <button onClick={() => setGenre(null)} className="px-4 py-2 cursor-pointer text-white">
        All
      </button>
      <button onClick={() => setGenre(35)} className="px-4 py-2 cursor-pointer text-white">
        Comedy
      </button>
      <button onClick={() => setGenre(28)} className="px-4 py-2 cursor-pointer text-white">
        Action
      </button>
      <button onClick={() => setGenre(10749)} className="px-4 py-2 cursor-pointer text-white">
        Romance
      </button>
    </div>
  )
}

export default Genre
