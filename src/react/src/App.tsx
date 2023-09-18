import React, { useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { Constants as UserConstants, User, getUser } from './api/requests/users'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootState } from './api/store/reducers'
import { adminRoutes, customerRoutes, publicRoutes } from './routes';
import { ToastContainer } from 'react-toastify'

function mapStateToProps(state: RootState) {
  return {
    getUserState: state.users.getUser
  }
}

const mapDispatchToProps = {dispatchGetUser: getUser}
const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

const Router = ({getUserState, dispatchGetUser}: Props) => {
  const user = getUserState.data
  useEffect(() => {
    if (getUserState.unstarted) {
      dispatchGetUser()
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {getUserState.succeeded && user?.role === UserConstants.ADMIN && (
            <React.Fragment>
              {adminRoutes.map((route, index) => (
                <Route key={`admin-route-${index}`} {...route} />
              ))}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </React.Fragment>
          )
        }
               
        {getUserState.succeeded && user?.role === UserConstants.CUSTOMER && (
            <React.Fragment>
              {customerRoutes.map((route, index) => (
                <Route key={`customer-route-${index}`} {...route} />
              ))}
              <Route path="*" element={<Navigate to="/books" />} />
            </React.Fragment>
          )
        }

        {getUserState.failed && (
          <React.Fragment>
            {publicRoutes.map((route, index) => (
              <Route key={`public-route-${index}`} {...route} />
            ))}
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </React.Fragment>
        )}
      </Routes>
    </BrowserRouter>
  )
}

function App(props: Props) {
  return (
    <React.Fragment>
      <Router {...props} />
        
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  )
}

export default connector(App)
