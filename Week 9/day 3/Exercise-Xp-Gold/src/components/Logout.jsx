import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/authSlice.js'

function Logout() {
  const dispatch = useDispatch()

  return (
    <button
      className="secondary-button"
      type="button"
      onClick={() => dispatch(logoutUser())}
    >
      Sign out
    </button>
  )
}

export default Logout
