import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Loader from './components/Loader'
import AddPost from './pages/add-post'
import HomePage from './pages/home-page'
import SinglePost from './pages/single-post'

const baseURL = 'http://localhost:1337'
const filter = '/posts'


function App() {
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const abortController = new AbortController();

    if (loading) {
      fetch(baseURL + filter, { signal: abortController.signal })
      .then( res => res.json())
      .then( data => {
        console.log(data)
        setPosts(data)
        setLoading(false)
      })
      .catch(error => console.error(`ERROR: ${error}`))
    }

    return () => abortController.abort();

  },[loading])

  if (loading) return <Loader />
  return <main className="App">
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact render={() => <HomePage posts={posts} />} />
          <Route path="/login" component={() => <h2>Login</h2>} />
          <Route path="/addpost" component={AddPost} />
          <Route path="/:id" component={SinglePost} />
        </Switch>
      </div>  
  </main>
}

export default App;
