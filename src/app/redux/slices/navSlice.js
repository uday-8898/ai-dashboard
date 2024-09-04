import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    navTab: 'Home'
};




// Create the slice
const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setNavTab: (state, action) => {
            state.navTab = action.payload;
        },
    },
});

// Export the reducer to configure the store
export const { setNavTab } =
    navSlice.actions;
export default navSlice.reducer;
