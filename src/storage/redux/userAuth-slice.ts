import { createSlice } from "@reduxjs/toolkit";
import { userModel } from "../../interfaces";

const initialState : userModel = {
    unique_name: "",
    nameid: "",
  email: "",
  role: "",
};

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: initialState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.unique_name = action.payload.unique_name;
            state.nameid = action.payload.nameid;
            state.email = action.payload.email;
            state.role = action.payload.role;
        }
    },
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;