import React, { useState } from 'react'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null)

  if (!props.show) {
    return null
  }

  if (props.result.loading || props.result.data.allBooks === undefined) {
    return (
      <div>
        <h2>Books</h2>
        Loading books...
      </div>
    )
  }

  const getGenreButtons = () => {
    const genreArrays = props.result.data.allBooks.map(b => b.genres)
    const reducer = (array, value) => array.concat(value)
    const genres = [...new Set(genreArrays.reduce(reducer))]
    return genres.map(g => <button onClick={() => setGenreFilter(g)} key={g}>{g}</button>)
  }

  const getBooks = () => {
    if (genreFilter) {
      return (
        props.result.data.allBooks
          .filter(a => a.genres.includes(genreFilter))
          .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )
      )
    }

    return (
      props.result.data.allBooks.map(a =>
        <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      )
    )
  }

  return (
    <div>
      <h2>Books</h2>
      <div>
        in genre <strong>{genreFilter}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {getBooks()}
        </tbody>
      </table>
      <div>
        {getGenreButtons()}
        <button onClick={() => setGenreFilter(null)}>All genres</button>
      </div>
    </div>
  )
}

export default Books