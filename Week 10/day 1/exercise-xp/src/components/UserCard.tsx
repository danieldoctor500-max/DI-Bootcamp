interface UserCardProps {
  name?: string
  age?: number
  role?: string
}

export function UserCard({
  name = 'Guest User',
  age = 0,
  role = 'Member',
}: UserCardProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="user-card">
      <div className="user-avatar" aria-hidden="true">{initials}</div>
      <div className="user-card-info">
        <h2>{name}</h2>
        <p>{age > 0 ? `${age} years old` : 'Age not provided'}</p>
      </div>
      <span className="user-role">{role}</span>
    </article>
  )
}