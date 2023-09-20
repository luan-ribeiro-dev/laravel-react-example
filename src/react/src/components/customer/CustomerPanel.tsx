import React, {useEffect, useState} from 'react'
import {ConnectedProps, connect} from 'react-redux'
import {logoutUser} from '../../api/requests/users'
import {Link} from 'react-router-dom'
import Footer from '../shared/Footer'
import {RootState} from '../../api/store/reducers'
import {CartItem, setCart} from '../../api/requests/customer/books'

function mapStateToProps(state: RootState) {
  return {
    logoutUserState: state.users.logoutUser,
    getUserState: state.users.getUser,
    setCartState: state.customer.books.setCart,
  }
}

const mapDispatchToProps = {
  dispatchLogoutUser: logoutUser,
  dispatchSetCart: setCart,
}

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

function AdminPanel({getUserState, logoutUserState, setCartState, dispatchLogoutUser, dispatchSetCart, title, breadcrumb, children}: Props) {
  const cart = setCartState.data
  const [userName, setUserName] = useState('')

  const handleSignOut = () => {
    if (!logoutUserState.started) {
      dispatchLogoutUser()
    }
  }

  useEffect(() => {
    if (logoutUserState.succeeded) {
      localStorage.clear()
      window.location.href = '/sign-in'
    }
  }, [logoutUserState.status])

  useEffect(() => {
    if (getUserState.succeeded && getUserState.data) {
      setUserName(getUserState.data.name)
    }
  }, [getUserState.status])

  useEffect(() => {
    if (setCartState.unstarted) {
      const cart = localStorage.getItem('cart')
      dispatchSetCart(cart ? JSON.parse(cart) : [])
    }
  }, [setCartState.status])

  return (
    <React.Fragment>
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <nav className="navbar navbar-main navbar-expand px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur">
          <div className="container-fluid py-1 px-3">
            <div className="navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
              <Link to={'/books'}><strong>Shop for fake books</strong></Link>
              <div className="ms-md-auto pe-md-3 d-flex align-items-center">
              </div>
              <ul className="navbar-nav justify-content-end">
                <li className="nav-item d-flex align-items-center">
                  <span>
                    {userName && `Hello, ${userName}`}
                  </span>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <div className="nav-link text-body p-0">
                    {/* Add a cart number icon in fa-shopping-cart */}
                    <Link to={'/checkout'}>
                      <i className="fas fa-shopping-cart fixed-plugin-button-nav cursor-pointer text-lg ps-3">
                        {cart && cart.length > 0 && <span className="badge bg-primary rounded-pill p-1">{cart.reduce((acc: number, cartItem: CartItem) => acc + cartItem.quantity, 0)}</span>}
                      </i>
                    </Link>
                    <i className="fa fa-sign-out fixed-plugin-button-nav cursor-pointer text-lg ps-3" onClick={handleSignOut}></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <hr className="dark mt-0" />
        <div className="container-fluid py-4 px-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              {breadcrumb.map((item, index) => {
                return (
                  <li className={`breadcrumb-item text-sm ${index === breadcrumb.length - 1 ? 'text-dark active' : ''}`} key={`breadcrumb-${item.name}`}>
                    <Link to={item.link} className="opacity-5 text-dark">{item.name}</Link>
                  </li>
                )
              })}
            </ol>
          </nav>
          <h3 className="text-left">{title}</h3>
          {children}
          <Footer />
        </div>
      </main>
    </React.Fragment>
  )
}

export default connector(AdminPanel)
