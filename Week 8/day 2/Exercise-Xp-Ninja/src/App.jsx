import React from "react";
import UsersList from "./components/UsersList.jsx";
import Customers from "./components/Customers.jsx";

function App() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">WEEK 8 · DAY 2</p>
        <h1>Express + React</h1>
        <p className="subtitle">
          Two independent backend exercises, one simple React dashboard.
        </p>
      </header>

      <div className="panel-grid">
        <section className="panel" aria-labelledby="users-heading">
          <div className="panel-heading">
            <span className="panel-icon users-icon" aria-hidden="true">U</span>
            <div>
              <p className="eyebrow">EXERCISE 1</p>
              <h2 id="users-heading">Backend users</h2>
            </div>
          </div>
          <UsersList />
        </section>

        <section className="panel" aria-labelledby="customers-heading">
          <div className="panel-heading">
            <span className="panel-icon customers-icon" aria-hidden="true">C</span>
            <div>
              <p className="eyebrow">EXERCISE 2</p>
              <h2 id="customers-heading">Customers</h2>
            </div>
          </div>
          <Customers />
        </section>
      </div>
    </main>
  );
}

export default App;
