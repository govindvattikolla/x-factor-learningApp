import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: '',
    name: '',
    email: '',
    phone: '',
    profile: '',
    createdAt: ''
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setUser: (state, action) => {
            const { role, name, email, phone , profile , createdAt } = action.payload;
            state.role = role;
            state.name = name;
            state.email = email;
            state.phone = phone;
            state.profile = profile;
            state.createdAt = createdAt;
        },
        logout: () => {
            return initialState;
        }
    }
});

export const {
    setRole,
    setName,
    setEmail,
    setPhone,
    setUser,
    logout
} = userSlice.actions;

export default userSlice.reducer;