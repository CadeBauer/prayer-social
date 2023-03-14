import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Axios from 'axios';
import Post from '../Post/post'
import './infinite.css'

var postList = [];

const getPosts = async (id) => {
  await Axios.post('http://localhost:3003/posts', {id: id}).then((response) => {
    postList = response.data
    InfiniteSpace.fetchDataStart()
  });
}
 
class InfiniteSpace extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      hasMore: true
    }
  }
 
  componentDidMount() {
    getPosts(this.props.userID)
  }

  fetchDataStart = () => {

    const newPosts = []

    newPosts.push(postList[0], postList[1])
 
    this.setState({ posts: [...this.state.posts, ...newPosts] })
  }

  fetchData = (page) => {
    var x = this.state.posts.length

    const newPosts = []
 
    if (this.state.posts.length === postList.length) {
      this.setState({ hasMore: false })
    }

    if (this.state.posts.length < postList.length) {
      newPosts.push(postList[x])
    }
 
    this.setState({ posts: [...this.state.posts, ...newPosts] })
  }
 
  render() {
    return (
      <div>
        {<InfiniteScroll
          dataLength={this.state.posts.length}
          next={this.fetchData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
            </p>
          }
        >
          {this.state.posts.map((post, index) => (
            <div className='post' key={index}>
              <Post 
                name = {post.firstName + " " + post.lastName}
                date = {post.postDate}
                text = {post.postText}
                media = {"/upload/" + post.postMedia}
                profilePic = {post.profilePic}
                isAnonymous = {post.isAnonymous}
                postID = {post.postID}
                numComments = {post.commentCount}
                // currentUserID = {this.props.userID}
              />
            </div>
          ))}
        </InfiniteScroll>}
      </div>
    )
  }
}
 
export default InfiniteSpace