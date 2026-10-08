import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ErrorBoundary from "./ErrorBoundary";
import PostList from "./PostList";
import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";
import AutoCompletedText from "./AutoCompletedText";

// Exercise 1
function HomeScreen() {
  return <h1>Home</h1>;
}

function ProfileScreen() {
  return <h1>Profile</h1>;
}

function ShopScreen() {
  throw new Error("Shop page crashed!");
}

// Exercise 4
function App() {
  const sendData = async () => {
    const data = {
      key1: "myusername",
      email: "mymail@gmail.com",
      name: "Isaac",
      lastname: "Doe",
      age: 27,
    };

    try {
      const response = await fetch("https://webhook.site/57d976c0-6b65-4b9c-876b-83988929236b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.text();

      console.log("Response:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <BrowserRouter>
      <div className="container mt-4">

        {/* Exercise 1 - Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <span className="navbar-brand">
              Exercise XP
            </span>

            <div className="navbar-nav">
              <NavLink
                className="nav-link"
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                className="nav-link"
                to="/profile"
              >
                Profile
              </NavLink>

              <NavLink
                className="nav-link"
                to="/shop"
              >
                Shop
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Exercise 1 - Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomeScreen />
              </ErrorBoundary>
            }
          />

          <Route
            path="/profile"
            element={
              <ErrorBoundary>
                <ProfileScreen />
              </ErrorBoundary>
            }
          />

          <Route
            path="/shop"
            element={
              <ErrorBoundary>
                <ShopScreen />
              </ErrorBoundary>
            }
          />
        </Routes>

        <hr />

        {/* Exercise 2 */}
        <section className="mb-5">
          <h2>Exercise 2 - Posts</h2>
          <PostList />
        </section>

        <hr />

        {/* Exercise 3 */}
        <section className="mb-5">
          <h2>Exercise 3 - JSON Data</h2>

          <Example1 />

          <hr />

          <Example2 />

          <hr />

          <Example3 />
        </section>

        <hr />

        {/* Exercise 4 */}
        <section className="mb-5">
          <h2>Exercise 4 - POST JSON Data</h2>

          <button
            className="btn btn-primary"
            onClick={sendData}
          >
            Send Data
          </button>
        </section>

        <hr />

        <section className="mb-5">
          <h2>Daily Challenge 2 - Country Autocomplete</h2>
          <p>Type a country name and select a suggestion.</p>
          <AutoCompletedText />
        </section>

      </div>
    </BrowserRouter>
  );
}

export default App;