import { gql } from 'apollo-boost'

export const ALL_AUTHORS = gql`
{
  allAuthors  {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query allBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    title
    author
    published
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author,
    published
  }
}
`