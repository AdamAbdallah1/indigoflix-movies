function Switch({ type, setType }) {
  return (
    <div className="text-gradient text-2xl flex justify-evenly p-4 mt-[-70px]">
      <button
        onClick={() => setType('movie')}
        className={`px-4 py-2 cursor-pointer ${
          type === 'movie' ? 'border-b-2 border-white' : ''
        }`}
      >
        Movies
      </button>
      <button
        onClick={() => setType('tv')}
        className={`px-4 py-2 cursor-pointer ${
          type === 'tv' ? 'border-b-2 border-white' : ''
        }`}
      >
        Series
      </button>
    </div>
  )
}

export default Switch
