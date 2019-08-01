import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../requests/queries';

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState([])

  useEffect(() => {
    const fetchFilteredBooks = async () => {
      const books = await props.client.query({
        query: ALL_BOOKS,
        variables: { genre: genreFilter },
        fetchPolicy: 'no-cache'
      })
      setFilteredBooks(books.data.allBooks)
    }
    fetchFilteredBooks()
  }, [genreFilter])

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
    let booksToRender = props.result.data.allBooks
    if (genreFilter) {
      booksToRender = filteredBooks
    }

    return (
      booksToRender.map(a =>
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