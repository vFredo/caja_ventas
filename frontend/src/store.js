import { configureStore, applyMiddleware} from '@reduxjs/toolkit' 
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension'
import thunk from 'redux-thunk'

const middleware = [thunk]

const store = configureStore(
    allReducers,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  
  export default store
