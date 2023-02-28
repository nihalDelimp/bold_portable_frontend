import { combineReducers } from '@reduxjs/toolkit';
import auth from './Reducers/auth';

const rootReducer = combineReducers({
    auth
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer