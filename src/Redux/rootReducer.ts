import { AnyAction, combineReducers} from '@reduxjs/toolkit';
import  auth  from './Reducers/authSlice';
import  product from './Reducers/productSlice';
import notification from './Reducers/notification';

const appReducer = combineReducers({
    auth ,
    product,
    notification
})


const rootReducer = (state : any, action : AnyAction ) => {
    if (action.type === 'auth/logout') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer