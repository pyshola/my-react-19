import React from 'react'

function Search({searchTerm, setSearchTerm}) {
  return (
    <div className='search'>
        <div>
        <img src='./search.svg'/>
        <input type="text" value={searchTerm} placeholder='Search thousands of movies' 
        onChange={(evt) => setSearchTerm(evt.target.value)}/>

        </div>
    </div>
  )
}

export default Search