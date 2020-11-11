import React from 'react'
import Post from '../components/Post'

export default function HomePage({posts}) {
    return <div className='home-page'>
        {posts.map(item => <Post key={item.id} {...item} />)}
    </div>
}
