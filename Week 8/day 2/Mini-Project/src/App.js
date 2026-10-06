import React from "react";
import PostList from "./PostList";
import UsersList from "./UsersList";

function App() {
  return (
    <main className="app">
      <header className="page-header">
        <p className="eyebrow">WEEK 8 · DAY 2</p>
        <h1>Posts &amp; Users</h1>
        <p>Live data fetched from JSONPlaceholder.</p>
      </header>

      <div className="content-grid">
        <section className="panel" aria-labelledby="posts-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">LATEST FROM THE API</p>
              <h2 id="posts-heading">Posts</h2>
            </div>
          </div>
          <PostList />
        </section>

        <section className="panel" aria-labelledby="users-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE COMMUNITY</p>
              <h2 id="users-heading">Users</h2>
            </div>
          </div>
          <UsersList />
        </section>
      </div>
    </main>
  );
}

export default App;
