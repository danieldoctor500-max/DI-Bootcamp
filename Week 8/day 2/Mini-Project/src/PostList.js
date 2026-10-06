import React, { Component } from "react";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const posts = await response.json();
      this.setState({ posts, isLoading: false });
    } catch (error) {
      this.setState({
        errorMsg: "Posts could not be loaded. Please try again later.",
        isLoading: false,
      });
      console.error("Unable to load posts:", error);
    }
  };

  render() {
    const { posts, errorMsg, isLoading } = this.state;

    if (isLoading) {
      return <p className="status-message">Loading posts...</p>;
    }

    if (errorMsg) {
      return <p className="status-message error-message">{errorMsg}</p>;
    }

    if (posts.length === 0) {
      return <p className="status-message">No posts found.</p>;
    }

    return (
      <div className="post-list">
        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <div className="post-meta">
              <span>POST</span>
              <span>#{post.id}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </article>
        ))}
      </div>
    );
  }
}

export default PostList;
