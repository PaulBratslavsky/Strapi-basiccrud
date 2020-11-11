import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header';
import AddPost from './pages/add-post';
import HomePage from './pages/home-page';

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
        setPosts(data)
        setLoading(false)
      })
      .catch(error => console.error(`ERROR: ${error}`))
    }

    return () => abortController.abort();

  },[loading])

  if (loading) return <h1>Loading data...</h1>
  return <main className="App">
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact render={() => <HomePage posts={posts} />} />
          <Route path="/login" component={() => <h2>Login</h2>} />
          <Route path="/addpost" component={AddPost} />
        </Switch>
      </div>  
  </main>
}

export default App;
