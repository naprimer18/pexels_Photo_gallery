import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter  } from 'react-router-dom'
import store from './store'
import App from './app'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
  target
  )