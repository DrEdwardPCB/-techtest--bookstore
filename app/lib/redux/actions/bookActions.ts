import { createAction } from "@reduxjs/toolkit";
import { EReducerAction } from "../actionTypes";
import { TBookCreateInput, TBookUpdateInput } from "@/app/types/book";

export const AddBookAction = createAction<TBookCreateInput>(EReducerAction.ADD_BOOK)
export const EditBookAction = createAction<TBookUpdateInput>(EReducerAction.EDIT_BOOK)
export const DeleteBookAction = createAction<string>(EReducerAction.DELETE_BOOK)