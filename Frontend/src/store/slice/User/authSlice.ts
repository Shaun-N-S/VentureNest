import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type FormData = {
  firstName: string
  lastName: string
  age: string
  street: string
  city: string
  state: string
  zip: string
  email: string
  password: string
}

const initialState: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormData>>) => {
      return { ...state, ...action.payload }
    },
    resetForm: () => initialState,
  },
})

export const { updateForm, resetForm } = formSlice.actions
export const formReducer = formSlice.reducer
