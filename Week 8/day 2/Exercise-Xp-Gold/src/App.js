import React, { Component } from "react";
import axios from "axios";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      email: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { user, email } = this.state;

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, email }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log("Posted user:", result);
    } catch (error) {
      console.error("Unable to post user:", error);
    }
  };

  render() {
    const { user, email } = this.state;

    return (
      <form className="exercise-form" onSubmit={this.handleSubmit}>
        <label>
          User
          <input
            type="text"
            name="user"
            placeholder="User"
            value={user}
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      title: "",
      body: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userId, title, body } = this.state;

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          userId: Number(userId),
          title,
          body,
        }
      );
      console.log("Posted post:", response.data);
    } catch (error) {
      console.error("Unable to post post:", error);
    }
  };

  render() {
    const { userId, title, body } = this.state;

    return (
      <form className="exercise-form" onSubmit={this.handleSubmit}>
        <label>
          User ID
          <input
            type="number"
            name="userId"
            placeholder="User ID"
            value={userId}
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Title
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Body
          <textarea
            name="body"
            placeholder="Body"
            value={body}
            onChange={this.handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

function App() {
  return (
    <main className="app">
      <section>
        <h1>POST JSON Data</h1>
        <UserForm />
      </section>
      <section>
        <h2>POST JSON Data with Axios</h2>
        <PostForm />
      </section>
    </main>
  );
}

export default App;
