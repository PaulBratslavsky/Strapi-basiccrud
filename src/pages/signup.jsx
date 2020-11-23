import React, { useState, useContext, useEffect } from 'react'
import Loader from '../components/Loader';
import { UserContext } from '../context/user.context'

const baseURL = 'http://localhost:1337'
const filter = '/auth/local/register'

const INITIAL_FORM_DATA = {
    username: '',
    email: '',
    password: ''
}

export default function Login({history}) {
    const { setUser, user } = useContext(UserContext)

    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    },[user])
     
    async function handleSubmit(e) {
        e.preventDefault(e)
        const { email, password, username } = formData
        const params = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email,
                password
            })
        }

        if ( email.length && password.length) {
            setLoading(true)
            try {
                const response = await fetch(baseURL + filter, params)
                const data = await response.json()

                if (data.message) {
                    const errorMessage = data.message[0].messages[0].message
                    setError(errorMessage)
                    setLoading(false)
                    return
                } 

                setUser(data)
                                
            } catch (error) {
                setLoading(false)
                setError(`LOGIN ERROR: ${error}`)
            }
        } else {
            setError('Form cannot be blank.')
        }
    }

    if (loading) return <Loader />
    return <div>
        <h2>Signup</h2>   
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="username" 
                value={formData.username}
                onChange={(e) => {
                    setFormData({...formData, [e.target.name]: e.target.value})
                    setError('')
                }}
                placeholder="username" 
            />
            <input 
                type="email"
                name="email" 
                value={formData.user}
                onChange={(e) => {
                    setFormData({...formData, [e.target.name]: e.target.value})
                    setError('')
                }}
                placeholder="email" 
            />
            <input 
                type="password"
                name="password" 
                value={formData.password}
                onChange={(e) => {
                    setFormData({...formData, [e.target.name]: e.target.value})
                    setError('')
                }}
                placeholder="password" 
            />
            <button>Signup</button>
        </form>

        {error.length > 0 && <p><span style={{color: 'red'}}>Error Message: </span>{error}</p>}
    </div>
}
