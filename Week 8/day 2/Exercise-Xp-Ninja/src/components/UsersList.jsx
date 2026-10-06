import React, { Component } from "react";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      errorMsg: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await fetch("/users");
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const users = await response.json();
      this.setState({ users, isLoading: false });
    } catch (error) {
      this.setState({
        errorMsg: "Could not load users. Check that the Exercise 1 server is running.",
        isLoading: false,
      });
      console.error("Unable to load users:", error);
    }
  };

  render() {
    const { users, errorMsg, isLoading } = this.state;

    if (isLoading) {
      return <p className="status-message">Loading users...</p>;
    }

    if (errorMsg) {
      return <p className="status-message error-message">{errorMsg}</p>;
    }

    return (
      <ul className="record-list">
        {users.map((user) => (
          <li className="record-card" key={user.id}>
            <span className="record-id">#{user.id}</span>
            <span className="record-name">{user.username}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default UsersList;
