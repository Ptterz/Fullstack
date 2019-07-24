import React, { useState } from 'react'

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  if (props.result.loading) {
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
          {props.result.data.allAuthors.map(a =>
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