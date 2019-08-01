import React, { useState } from 'react'
import { Query, ApolloConsumer, Mutation, Subscription } from 'react-apollo'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR, LOGIN, BOOK_ADDED } from './requests/queries'
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

  const includedIn = (set, object) => {
    set.map(b => b.id).includes(object.id)
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

      <ApolloConsumer>
        {(client =>
          <Query query={ALL_BOOKS}>
            {(result) =>
              <Books
                result={result}
                client={client}
                show={page === 'books'}
              />
            }
          </Query>
        )}
      </ApolloConsumer>


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

      <ApolloConsumer>
        {(client =>
          <Subscription
            subscription={BOOK_ADDED}
            onSubscriptionData={({ subscriptionData }) => {
              const addedBook = subscriptionData.data.bookAdded
              const dataInStore = client.readQuery({ query: ALL_BOOKS })
              if (!includedIn(dataInStore.allBooks, addedBook)) {
                dataInStore.allBooks.push(addedBook)
                client.writeQuery({
                  query: ALL_BOOKS,
                  data: dataInStore
                })
                window.alert('New book has been added!')
              }
            }}
          />
        )}
      </ApolloConsumer>
    </div>
  )
}

export default App