import React from 'react'
import localStorage from 'localStorage'

import { publishPost, getAllPosts } from '../api'

class Main extends React.Component {
  state = {
    title: '',
    content: '',
    allPosts: []
  }

  onTextChange = event => {
    const name = event.target.name
    const value = event.target.value

    this.setState({ [name]: value })
  }

  submitPost = event => {
    event.preventDefault()

    publishPost(this.state.title, this.state.content) 
      .then(() => { this.getPosts() })
  }

  getPosts = () => {
    getAllPosts()
      .then(data => this.setState({ allPosts: data }))
      .catch(err => console.error('Something went wrong.'))
  }

  componentDidMount() { 
    this.getPosts()
  }

  signout = event => {
    localStorage.clear();
    this.props.history.replace('/');
  }

  render() {
    const posts = this.state.allPosts
    return (
      <div style={{ width: '800px' }}>
        <h2 className="ui center aligned icon header">
          <i className="circular teal users icon" />
          Welcome again, {localStorage.getItem('username')}
        </h2>
        
        <form class='ui form' onSubmit={this.submitPost}>
          <div className='field'>
            <input type='text' name='title' value={this.state.title} placeholder='Title' onChange={this.onTextChange} />
          </div>
          <div className='field'>
            <textarea 
              name='content' 
              placeholder='Write your post...' 
              value={this.state.content}
              onChange={this.onTextChange} />
            <button className='ui primary button' style={{ margin: '16px 0'}}>Publish Post</button>
          </div>
        </form>

        { posts.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
          posts.map(post => //Loop
            <div className='ui segment'>
              <p>Published by: {post.author}</p>
              <div>
                Title: {post.title}
              </div>
              <div>
                {post.content}
              </div>
            </div>
          )
          : null
        }
          

        <button onClick={this.signout} className="ui button">Sign out</button>
      </div>
    )
  }
}

export default Main