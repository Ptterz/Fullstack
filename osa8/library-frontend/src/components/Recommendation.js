import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, ME } from '../requests/queries'

const Recommendation = (props) => {
    const [recs, setRecs] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            const response = await props.client.query({
                query: ME,
                fetchPolicy: 'no-cache'
            })
            setUser(response.data.me)
        }
        getUser()
    }, [props.show])

    useEffect(() => {
        if (user) {
            getBooks()
        }
    }, [props.show])

    const getBooks = async () => {
        const response = await props.client.query({
            query: ALL_BOOKS,
            variables: { genre: user.favoriteGenre },
            fetchPolicy: 'no-cache'
        })
        setRecs(response.data.allBooks)
    }

    if (!props.show) {
        return null
    }

    if (!recs) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            <h2>Recommendations</h2>
            Books in your favorite genre <strong>{user ? user.favoriteGenre : null}</strong>
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
                    {recs.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendation