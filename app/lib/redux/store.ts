import { configureStore } from '@reduxjs/toolkit'
import { bookReducer } from './reducers/bookReducer'

export const makeStore = () => {
    return configureStore({
        reducer: { bookReducer },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
