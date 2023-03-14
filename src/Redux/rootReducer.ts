import { combineReducers } from '@reduxjs/toolkit';
import  auth  from './Reducers/auth';
import  product  from './Reducers/productSlice'

const rootReducer = combineReducers({
    auth ,
    product
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer