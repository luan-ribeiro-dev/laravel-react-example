import React, { useEffect, useState } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { quickRegisterAdmin, quickRegisterCustomer, storeUser } from '../../api/requests/users'
import { Link } from 'react-router-dom';
import { InputValidation } from '../helpers';
import { RootState } from '../../api/store/reducers';

function mapStateToProps(state: RootState) {
  return {
    storeUserState: state.users.storeUser,
    quickRegisterCustomerState: state.users.quickRegisterCustomer,
    quickRegisterAdminState: state.users.quickRegisterAdmin,
  }
}

const mapDispatchToProps = {
  dispatchStoreUser: storeUser,
  dispatchQuickRegisterCustomer: quickRegisterCustomer,
  dispatchQuickRegisterAdmin: quickRegisterAdmin,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

function SignUp({storeUserState, quickRegisterCustomerState, quickRegisterAdminState, dispatchStoreUser, dispatchQuickRegisterCustomer, dispatchQuickRegisterAdmin}: Props) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitForm, setSubmitForm] = useState(false)

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    if (!submitForm) {
      setSubmitForm(true)
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
    if (submitForm) {
      dispatchStoreUser(name, email, password)
      setSubmitForm(false)
    }
  }, [submitForm])

  useEffect(() => {
    if (quickRegisterAdminState.succeeded) {
      window.location.href = '/dashboard'
    }
  }, [quickRegisterAdminState.status])

  useEffect(() => {
    if (quickRegisterCustomerState.succeeded || storeUserState.succeeded) {
      window.location.href = '/books'
    }
  }, [quickRegisterCustomerState.status, storeUserState.status])

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow-none my-3  navbar-transparent mt-4">
        <div className="container justify-content-center">
          <span className="navbar-brand font-weight-bolder ms-lg-0 ms-3 text-white">
            Laravel/ReactJS - Bookstore Demo
          </span>
        </div>
      </nav>
      <section className="min-vh-100 mb-8">
        <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style={{backgroundImage: "url('/assets/img/curved-images/curved14.jpg')"}}>
          <span className="mask bg-gradient-dark opacity-6"></span>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 text-center mx-auto">
                <h1 className="text-white mb-2 mt-5">Welcome!</h1>
                <p className="text-lead text-white">Use these awesome forms to create new account</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-lg-n10 mt-md-n11 mt-n10">
            <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
              <div className="card z-index-0">
                <div className="card-header text-center pt-4">
                  <h5>Register with</h5>
                </div>
                <div className="row px-4">
                  <div className="col-6">
                    <button
                      className="btn btn-primary"
                      onClick={handleQuickRegisterCustomer}
                    >
                      Quick sign up as a customer
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-primary"
                      onClick={handleQuickRegisterAdmin}
                    >
                      Quick sign up as a admin
                    </button>
                  </div>
                  <div className="mt-2 position-relative text-center">
                    <p className="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">
                      or
                    </p>
                  </div>
                </div>
                <div className="card-body pt-3">
                  <form role="form text-left" onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                      <InputValidation
                        reduxState={storeUserState}
                        field="name"
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        aria-label="Name"
                        aria-describedby="email-addon"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <InputValidation
                        reduxState={storeUserState}
                        field="email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="email-addon"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="mb-3">
                      <InputValidation
                        reduxState={storeUserState}
                        field="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="password-addon"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-check form-check-info text-left">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" required />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        I agree that <a className="text-dark font-weight-bolder">This is a FAKE App</a>
                      </label>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">Sign up</button>
                    </div>
                    <p className="text-sm mt-3 mb-0">Already have an account? <Link className="text-dark font-weight-bolder" to={"/sign-in"}>Sign in</Link></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default connector(SignUp)
