import React, { Component } from "react";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
      errorMsg: "",
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const users = await response.json();
      this.setState({ users, isLoaded: true });
    } catch (error) {
      this.setState({
        errorMsg: "Users could not be loaded. Please try again later.",
      });
      console.error("Unable to load users:", error);
    }
  };

  render() {
    const { users, isLoaded, errorMsg } = this.state;

    if (errorMsg) {
      return <p className="status-message error-message">{errorMsg}</p>;
    }

    if (!isLoaded) {
      return <p className="status-message">Loading...</p>;
    }

    if (users.length === 0) {
      return <p className="status-message">No users found.</p>;
    }

    return (
      <ul className="user-list">
        {users.map((user) => (
          <li className="user-card" key={user.id}>
            <span className="avatar" aria-hidden="true">
              {user.name.charAt(0)}
            </span>
            <div className="user-details">
              <h3>{user.name}</h3>
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default UsersList;
