import Logout from './Logout.jsx'

function AuthenticatedContent({ user }) {
  return (
    <section className="welcome-panel" aria-labelledby="welcome-title">
      <div className="avatar" aria-hidden="true">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <p className="eyebrow">YOU&apos;RE SIGNED IN</p>
      <h1 id="welcome-title">Welcome, <span>{user.name}</span>.</h1>
      <p className="user-email">{user.email}</p>
      <p className="welcome-copy">
        Your space is ready. You can now get back to what matters today.
      </p>
      <Logout />
    </section>
  )
}

export default AuthenticatedContent
