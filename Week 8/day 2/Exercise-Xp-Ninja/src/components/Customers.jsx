import React, { Component } from "react";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      errorMsg: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers/");
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const customers = await response.json();
      this.setState({ customers, isLoading: false });
    } catch (error) {
      this.setState({
        errorMsg: "Could not load customers. Check that the Exercise 2 server is running.",
        isLoading: false,
      });
      console.error("Unable to load customers:", error);
    }
  };

  render() {
    const { customers, errorMsg, isLoading } = this.state;

    if (isLoading) {
      return <p className="status-message">Loading customers...</p>;
    }

    if (errorMsg) {
      return <p className="status-message error-message">{errorMsg}</p>;
    }

    return (
      <ul className="record-list">
        {customers.map((customer) => (
          <li className="record-card customer-card" key={customer.id}>
            <span className="record-id">#{customer.id}</span>
            <span className="record-name">
              {customer.firstName} {customer.lastName}
            </span>
          </li>
        ))}
      </ul>
    );
  }
}

export default Customers;
