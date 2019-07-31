import React, { useState } from 'react'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR, LOGIN } from './requests/queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthYearForm from './components/BirthYearForm'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'

const App = (props) => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const logout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
  }

  const getLogin = () => {
    if (!token) {
      return { display: '' }
    }
    return { display: 'none' }
  }

  const getStyle = () => {
    if (!token) {
      return { display: 'none' }
    }
    return { display: '' }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button
          onClick={() => setPage('login')}
          style={getLogin()}
        >login</button>
        <button
          onClick={() => setPage('add')}
          style={getStyle()}
        >add book</button>
        <button
          onClick={() => setPage('recommend')}
          style={getStyle()}
        >recommend</button>
        <button
          onClick={logout}
          style={getStyle()}
        >logout</button>
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
            refetchQueries={[{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]}
            show={page === 'add'}
          />
        }
      </Mutation>

      <ApolloConsumer>
        {(client =>
          <Mutation mutation={EDIT_AUTHOR}>
            {(editAuthor) =>
              <BirthYearForm
                client={client}
                editAuthor={editAuthor}
                refetchQueries={[{ query: ALL_AUTHORS }]}
                show={page === 'authors'}
              />
            }
          </Mutation>
        )}
      </ApolloConsumer>

      <ApolloConsumer>
        {(client =>
          <Mutation mutation={LOGIN}>
            {(login) =>
              <LoginForm
                login={login}
                client={client}
                setToken={(token) => setToken(token)}
                setPage={() => setPage('authors')}
                show={page === 'login'}
              />
            }
          </Mutation>
        )}
      </ApolloConsumer>

      <ApolloConsumer>
        {(client =>
          <Recommendation
            client={client}
            token={token}
            show={page === 'recommend'}
          />
        )}
      </ApolloConsumer>
    </div>
  )
}

export default App