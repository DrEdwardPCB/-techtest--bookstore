import { TBook } from '@/app/types/book'
import { createReducer } from '@reduxjs/toolkit'
import { v4 } from 'uuid'
import {
    AddBookAction,
    DeleteBookAction,
    EditBookAction,
} from '../actions/bookActions'

export interface IBookReducer {
    books: TBook[]
}
const initialState: IBookReducer = {
    books: [],
}

export const bookReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(AddBookAction, (state, action) => {
            const newbook: TBook = Object.assign({ id: v4() }, action.payload)
            state.books.push(newbook)
        })
        .addCase(EditBookAction, (state, action) => {
            const oldBook = state.books.find((e) => e.id === action.payload.id)
            if (oldBook) {
                const updatedBook: TBook = Object.assign(
                    oldBook,
                    action.payload
                )
                state.books = state.books.map((e) =>
                    e.id === oldBook.id ? updatedBook : e
                )
            }
        })
        .addCase(DeleteBookAction, (state, action) => {
            state.books = state.books.filter((e) => e.id !== action.payload)
        })
        .addDefaultCase(() => {})
)
