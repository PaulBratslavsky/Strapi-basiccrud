import React from 'react'
import { Link } from 'react-router-dom'

const baseURL = 'http://localhost:1337'
export default function Post({id, description, author, published_at, likes, image}) {
    return <Link to={`/${id}`}><article>
        {  image && 
            <div className="image-container">
                <img src={`${baseURL+image.formats.medium.url}`} alt={description} />
            </div>
        }
        
        <div className="content-container">
            <h2>{description}</h2>
            { author 
                && <p>Posted by {author.username} on {Date(published_at).slice(0,15)}</p> 
            }
            <p>Likes: {likes}</p>
        </div>
        
    </article></Link>
}
