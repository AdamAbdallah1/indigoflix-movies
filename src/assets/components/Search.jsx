import React from 'react'

const Search = ({ setType, type, searchTerm, setSearchTerm }) => {
  return (
   <div className='search'>
    <div>
      <img src="search.svg" alt="Search" />

      <input 
        type="text"
        placeholder={`Search through thousands of ${type}'s`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
   </div>
  )
}

export default Search