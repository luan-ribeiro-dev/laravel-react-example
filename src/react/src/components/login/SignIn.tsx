import React, { useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { loginUser, quickRegisterAdmin, quickRegisterCustomer } from '../../api/requests/users'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '../../api/store/reducers';

function mapStateToProps(state: RootState) {
  return {
    loginUserState: state.users.loginUser,
    quickRegisterCustomerState: state.users.quickRegisterCustomer,
    quickRegisterAdminState: state.users.quickRegisterAdmin,
  }
}

const mapDispatchToProps = {
  dispatchLoginUser: loginUser,
  dispatchQuickRegisterCustomer: quickRegisterCustomer,
  dispatchQuickRegisterAdmin: quickRegisterAdmin,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

function SignIn({loginUserState, quickRegisterCustomerState, quickRegisterAdminState, dispatchLoginUser, dispatchQuickRegisterCustomer, dispatchQuickRegisterAdmin}: Props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!loginUserState.started) {
      dispatchLoginUser(email, password)
    }
  }

  const handleQuickRegisterCustomer = () => {
    if (quickRegisterCustomerState.unstarted && quickRegisterAdminState.unstarted) {
      dispatchQuickRegisterCustomer()
    }
  }
  
  const handleQuickRegisterAdmin = () => {
    if (quickRegisterCustomerState.unstarted && quickRegisterAdminState.unstarted) {
      dispatchQuickRegisterAdmin()
    }
  }

  useEffect(() => {
    if (loginUserState.succeeded) {
      window.location.href = 'dashboard'
    } else if (loginUserState.failed) {
      toast.error("Email or password is incorrect")
    }
  }, [loginUserState.status])

  useEffect(() => {
    if (quickRegisterAdminState.succeeded) {
      window.location.href = '/dashboard'
    }
  }, [quickRegisterAdminState.status])

  useEffect(() => {
    if (quickRegisterCustomerState.succeeded) {
      window.location.href = '/books'
    }
  }, [quickRegisterCustomerState.status])

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
                <div className="col-4 col-md-6 d-flex flex-column mx-auto">
                  <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h3 className="font-weight-bolder text-info text-gradient">Welcome back</h3>
                      <h5>Sign in with</h5>
                    </div>
                    <div className="row px-4">
                      <div className="col-6">
                        <button
                          className="btn btn-primary w-100"
                          onClick={handleQuickRegisterCustomer}
                        >
                          Quick sign in as a customer
                        </button>
                      </div>
                      <div className="col-6">
                        <button
                          className="btn btn-primary w-100"
                          onClick={handleQuickRegisterAdmin}
                        >
                          Quick sign in as a admin
                        </button>
                      </div>
                      <div className="mt-2 position-relative text-center">
                        <p className="text-sm font-weight-bold text-secondary text-border d-inline z-index-2 px-3">
                          or
                        </p>
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      <form role="form" onSubmit={handleSubmit}>
                        <label>Email</label>
                        <div className="mb-3">
                          <input
                            type="email"
                            className={`form-control ${loginUserState.failed&& 'is-invalid'}`}
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
                            className={`form-control ${loginUserState.failed&& 'is-invalid'}`}
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
