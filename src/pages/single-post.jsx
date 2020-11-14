import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import SinglePostView from '../components/SinglePostView'
import { UserContext } from '../context/user.context'

const baseURL = 'http://localhost:1337'
const filter = '/posts/'

export default function SinglePost({history}) {

    const { id } = useParams()
    const {user, setUser} = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [description, setDescription] = useState('')
    const [post, setPost] = useState(null)
    const [edit, setEdit] = useState(false)
    const [refresh, setRefresh] = useState(-1)

    useEffect(() => {
        const abortController = new AbortController();

        fetch(baseURL + filter + id, {signal: abortController.signal})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPost(data)
                setDescription(data.description)
                setLoading(false)
            }).catch(error => console.error(`ERROR: ${error}`))
    

        return () => abortController.abort()

    }, [loading, id, refresh])

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

    async function handleEditSubmit(e) {
        e.preventDefault()
        if (description) {
            console.log('form submitted', description, id)
            try {

                const response = fetch(baseURL + filter + id, { 
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ description })
                })

                const data = await response
                
                console.log('EDIT DATA RESPONSE: ', data)
                    setRefresh(data)
                    setEdit(false)
                
            } catch (error) {
                console.error('ERROR UPDATING: ', error)
            }
        } else {
            alert('Form cannot be blank!')
        }
    }

    if (loading) return <Loader />

    console.log(refresh, 'refresh')
    return <div>
        { edit 
            ?   <form onSubmit={handleEditSubmit}>
                <input 
                    type="text" 
                    placeholder="New description" 
                    value={description} 
                    onChange={ event => setDescription(event.target.value)}
                />
                <button type="submit">Confirm</button>
                <button onClick={() => setEdit(false)}>Cancel</button>
                </form>
                
            
            :   <><SinglePostView post={post} /> 
                <button onClick={() => handleDelete(id)}>Delete</button>
                <button onClick={() => setEdit(true)}>Edit</button></>
        }
    </div>
}



