import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Provider} from 'react-redux'
import storeConfig from './api/store'
import 'react-toastify/dist/ReactToastify.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={storeConfig}>
    <App />
  </Provider>,
)
