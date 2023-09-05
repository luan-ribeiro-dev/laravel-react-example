import React, { useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { loginUser } from '../../api/requests/users'
import { Link } from 'react-router-dom';
import { RootState } from '../../api/store/type';
import { APIConstants } from '../../api';
import { toast } from 'react-toastify';

function mapStateToProps(state: RootState) {
  return {
    loginUserState: state.users.loginUser
  }
}

const mapDispatchToProps = {dispatchLoginUser: loginUser}
const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

function SignIn({loginUserState, dispatchLoginUser}: Props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loginUserState.status !== APIConstants.STARTED) {
      dispatchLoginUser(email, password)
    }
  }

  useEffect(() => {
    if (loginUserState.status === APIConstants.SUCCEEDED) {
      window.location.href = 'dashboard'
    } else if (loginUserState.status === APIConstants.FAILED) {
      toast.error("Email or password is incorrect")
    }
  }, [loginUserState.status])

  return (
    <React.Fragment>
      <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
              <div className="container-fluid justify-content-center">
                <span className="navbar-brand font-weight-bolder ms-lg-0 ms-3 ">
                  Laravel/ReactJS - Bookstore Demo
                </span>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-75">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                  <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                      <p className="mb-0">Enter your email and password to sign in</p>
                    </div>
                    <div className="card-body">
                      <form role="form" onSubmit={handleSubmit}>
                        <label>Email</label>
                        <div className="mb-3">
                          <input
                            type="email"
                            className={`form-control ${loginUserState.status === APIConstants.FAILED && 'is-invalid'}`}
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="email-addon"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <label>Password</label>
                        <div className="mb-3">
                          <input
                            type="password"
                            className={`form-control ${loginUserState.status === APIConstants.FAILED && 'is-invalid'}`}
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="password-addon"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn bg-gradient-info w-100 mt-4 mb-0">Sign in</button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 text-sm mx-auto">
                        Don't have an account?
                        <Link className="text-info text-gradient font-weight-bold ms-1" to={"/sign-up"}>Sign up</Link>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    <div className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6" style={{backgroundImage: "url('../assets/img/curved-images/curved6.jpg')"}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  )
}

export default connector(SignIn)
