import React from 'react'

const baseURL = 'http://localhost:1337'

export default function SinglePostView({post}) {
    const { description, author, published_at, likes, image } = post;
    return <article className="single-post-view">
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
        
    </article>
}