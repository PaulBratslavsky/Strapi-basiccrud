import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user.context'
const baseURL = 'http://localhost:1337'
const filter = '/posts'

export default function AddPost({history}) {
    const { user } = useContext(UserContext) 
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)

    const imageInputRef = React.useRef()

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData();

        if (description && file) {

            formData.append('data', JSON.stringify({description}))
            formData.append('files.image', file);
            try {
                const response = await fetch(baseURL + filter, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${user.jwt}`
                    },
                    body: formData,
                })
    
                const data = await response.json()
    
                console.log(data, "RESPONSE")
                setDescription('')
                imageInputRef.current.value = ""
                setFile(null)
    
                alert('Form Submitted')
                history.push('/')
            } catch (error) {
                console.error('EXCEPTION: ', error)
            }
            
        } else {
            alert('Please add description and (or) file')
        }
    }

    console.log(file, "file")
    return <div>
        <h2>Add Post</h2>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Description" 
                value={description} 
                onChange={ event => setDescription(event.target.value)}
            />

            <input 
                type="file"
                placeholder="Add File"
                accept="image/png, image/jpeg" 
                onChange={ event => setFile(event.target.files[0])}
                ref={imageInputRef}

            />
            <button type="submit">Add Post</button>
        </form>
    </div>
}
