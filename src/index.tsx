import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';


//import * as serviceWorker from './serviceWorker';
import store from './Redux/store'
import './index.css'

function render() {
  const App = require('./App').default
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App.tsx', render)
};
