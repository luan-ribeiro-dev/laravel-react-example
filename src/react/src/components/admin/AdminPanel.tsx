import React, { useEffect, useState } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { logoutUser } from '../../api/requests/users'
import { RootState } from '../../api/store/type';
import { Link } from 'react-router-dom';
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';

function mapStateToProps(state: RootState) {
  return {
    logoutUserState: state.users.logoutUser,
    getUserState: state.users.getUser,
  }
}

const mapDispatchToProps = {dispatchLogoutUser: logoutUser}
const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps & {
  breadcrumb: {
    name: string,
    link: string
  }[],
  title: string,
  children?: React.ReactNode
}

function AdminPanel({getUserState, logoutUserState, dispatchLogoutUser, breadcrumb, title, children}: Props) {
  const [userName, setUserName] = useState('')

  const handleSignOut = () => {
    if (!logoutUserState.started) {
      dispatchLogoutUser()
    }
  }

  useEffect(() => {
    if (logoutUserState.succeeded) {
      window.location.href = '/sign-in'
    }
  }, [logoutUserState.status])

  useEffect(() => {
    if (getUserState.succeeded) {
      setUserName(getUserState.data.name)
    }
  }, [getUserState.status])

  return (
    <React.Fragment>
      <Navbar />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                {breadcrumb.map((item, index) => {
                  return (
                    <li className={`breadcrumb-item text-sm ${index === breadcrumb.length - 1 ? "text-dark active" : ""}`} key={`breadcrumb-${item.name}`}>
                      <Link to={item.link} className="opacity-5 text-dark">{item.name}</Link>
                    </li>
                  )
                })}
              </ol>
              <h6 className="font-weight-bolder mb-0">{title}</h6>
            </nav>
            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
              </div>
              <ul className="navbar-nav justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <span>
                    {userName && `Hello, ${userName}`}
                  </span>
                </li>
                <li className="nav-item px-3 d-flex align-items-center" onClick={handleSignOut}>
                  <a className="nav-link text-body p-0">
                    <i className="fa fa-sign-out fixed-plugin-button-nav cursor-pointer"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid py-4">
          {children}
          <Footer />
        </div>
      </main>
    </React.Fragment>
  )
}

export default connector(AdminPanel)
