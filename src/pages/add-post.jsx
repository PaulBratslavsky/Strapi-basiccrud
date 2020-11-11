import React, { useState } from 'react'
const baseURL = 'http://localhost:1337'
const filter = '/posts'

export default function AddPost() {
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)

    const imageInputRef = React.useRef()

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData();

   

        if (description.length && file) {

            formData.append('data', JSON.stringify({description}))
            formData.append('files.image', file);

            const response = await fetch(baseURL + filter, {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            console.log(data, "RESPONSE")
            setDescription('')
            imageInputRef.current.value = ""
            setFile(null)

            alert('Form Submitted')
        } else {
            alert('Please add description')
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
