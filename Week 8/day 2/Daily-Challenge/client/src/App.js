import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      helloMessage: "",
      inputValue: "",
      responseMessage: "",
      errorMessage: "",
      isSubmitting: false,
    };
  }

  componentDidMount() {
    this.fetchHelloMessage();
  }

  fetchHelloMessage = async () => {
    try {
      const response = await fetch("/api/hello");
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      this.setState({ helloMessage: data.message });
    } catch (error) {
      this.setState({
        errorMessage: "Could not connect to the Express server.",
      });
      console.error("Unable to fetch greeting:", error);
    }
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: "",
      responseMessage: "",
      isSubmitting: true,
    });

    try {
      const response = await fetch("/api/world", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: this.state.inputValue }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`);
      }

      this.setState({ responseMessage: data.message });
    } catch (error) {
      this.setState({ errorMessage: "Could not send your message. Please try again." });
      console.error("Unable to send message:", error);
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const {
      helloMessage,
      inputValue,
      responseMessage,
      errorMessage,
      isSubmitting,
    } = this.state;

    return (
      <main className="page">
        <section className="message-card">
          <p className="eyebrow">REACT + EXPRESS</p>
          <h1>{helloMessage || "Connecting to Express..."}</h1>
          <p className="intro">
            Send a message to the server and see its response.
          </p>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="message">Your message</label>
            <div className="form-row">
              <input
                id="message"
                type="text"
                value={inputValue}
                onChange={this.handleInputChange}
                placeholder="Type something..."
                required
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>
          </form>

          {responseMessage && (
            <p className="server-response" role="status">
              {responseMessage}
            </p>
          )}
          {errorMessage && (
            <p className="error-message" role="alert">
              {errorMessage}
            </p>
          )}
        </section>
      </main>
    );
  }
}

export default App;
