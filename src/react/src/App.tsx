import React, { useEffect } from 'react'
import { ConnectedProps, connect } from 'react-redux'
import { getUser } from './api/requests/users'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootState } from './api/store/type'
import { adminRoutes, publicRoutes } from './routes';
import { ToastContainer } from 'react-toastify'

function mapStateToProps(state: RootState) {
  console.log(state)
  return {
    getUserState: state.users.getUser
  }
}

const mapDispatchToProps = {dispatchGetUser: getUser}
const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps

const Router = ({getUserState, dispatchGetUser}: Props) => {
  useEffect(() => {
    console.log(getUserState)
    if (getUserState.unstarted) {
      dispatchGetUser()
    }
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        {getUserState.succeeded && (
          <React.Fragment>
            {adminRoutes.map((route, index) => (
              <Route key={`route-${index}`} {...route} />
            ))}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </React.Fragment>
        )}

        {getUserState.failed && (
          <React.Fragment>
            {publicRoutes.map((route, index) => (
              <Route key={`route-${index}`} {...route} />
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
        position="bottom-center"
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
