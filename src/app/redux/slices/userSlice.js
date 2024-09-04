import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/auth/login`, credentials);
            return {
                ...credentials,
                user_id: response.data.user_id
            };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const fetchUserSummary = createAsyncThunk(
    'user/fetchUserSummary ',
    async (user_id, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/user/summary`, { user_id });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        email: '',
        user_id: null,
        error: null,
        conversation_count: 0,
        loading: true,
        database_count: 0,
        isAuthenticated: false
    },
    reducers: {
        logout: (state) => {
            state.name = '';
            state.email = '';
            state.user_id = null;
            state.error = null;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = null;
                state.isAuthenticated = false;

            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.user_id = action.payload.user_id;
                state.isAuthenticated = true;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.isAuthenticated = false;

            })
            .addCase(fetchUserSummary.pending, (state) => {
                state.error = null;
                state.loading = true
            })
            .addCase(fetchUserSummary.fulfilled, (state, action) => {
                state.conversation_count = action.payload.conversation_count;
                state.database_count = action.payload.database_count;
                state.loading = false

            })
            .addCase(fetchUserSummary.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false
            });
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
