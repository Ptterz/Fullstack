import React, { useState } from 'react'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from './requests/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) =>
          <Authors
            result={result}
            show={page === 'authors'}
          />
        }
      </Query>

      <Query query={ALL_BOOKS}>
        {(result) =>
          <Books
            result={result}
            show={page === 'books'}
          />
        }
      </Query>

      <Mutation mutation={CREATE_BOOK}>
        {(addBook) =>
          <NewBook
            addBook={addBook}
            show={page === 'add'}
          />
        }
      </Mutation>
    </div>
  )
}

export default App