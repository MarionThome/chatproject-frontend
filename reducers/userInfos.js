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
        state.value.username = action.payload;
      },
      resetUsername : (state, action) => {
        state.value.username = "";
      }
    },
   });

   export const {addUsername, resetUsername} = usersSlice.actions;
export default usersSlice.reducer;