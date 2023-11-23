import { createSlice } from "@reduxjs/toolkit";
import authconfig from '../Appwrite/Config'

const initialState = {
    status:false,
    userdata:[]
}


const postslice = createSlice({
    name:'POST',
    initialState,
    reducers:{
        Post:(state,action)=>{
            state.status=true,
            state.userdata=action.payload
        }
    }
}) 
export default postslice.reducer;

export const {Post} = postslice.actions;