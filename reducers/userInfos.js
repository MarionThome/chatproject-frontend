import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        username : "", 
    }
   };

   export const usersSlice = createSlice({
    name: 'userInfos',
   
    initialState,
    reducers: {
      addUsername: (state, action) => {
        console.log("action payload", action.payload)
        state.value.username = action.payload;
      },
      resetUsername : (state, action) => {
        console.log("reset")
        state.value.username = "";
      }
    },
   });

   export const {addUsername, resetUsername} = usersSlice.actions;
export default usersSlice.reducer;