import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import SinglePostView from '../components/SinglePostView'

const baseURL = 'http://localhost:1337'
const filter = '/posts/'

export default function SinglePost({history}) {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState(null)

    useEffect(() => {
        const abortController = new AbortController();

        if (loading) {
            fetch(baseURL + filter + id, {signal: abortController.signal})
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setPost(data)
                    setLoading(false)
                }).catch(error => console.error(`ERROR: ${error}`))
        }

        return () => abortController.abort()

    }, [loading, id])

    async function handleDelete(id) {
        console.log('Delete this', id)
        try {   
            const response = await fetch(baseURL + filter + id, { method: "DELETE" })
            const data = await response.json()
            console.log(data)
            history.push('/')
        } catch (error) {
            console.error('ERROR: ', error)
        }
    }

    if (loading) return <Loader />

    console.log(id, "ID", post)
    return <div>
        <SinglePostView post={post} /> 
        <button onClick={() => handleDelete(id)}>Delete</button>
    </div>
}



