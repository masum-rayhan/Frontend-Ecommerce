import { withAuth } from '../../../HOC'

 const AuthTest = () => {
  return (
    <div>This page can access by any logged in user</div>
  )
}

export default withAuth(AuthTest)