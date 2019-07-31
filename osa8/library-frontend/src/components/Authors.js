import React, { useState, useEffect } from 'react'

const Authors = (props) => {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    setAuthors(props.result.data.allAuthors)
  }, [props.result.loading])

  if (!props.show) {
    return null
  }

  if (props.result.loading || authors === undefined || authors.length === 0) {
    return (
      <div>
        <h2>Authors</h2>
        Loading authors...
      </div>
    )
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors