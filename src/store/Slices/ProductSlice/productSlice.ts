import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ProductState{
    availableSize:string,
}

const initialState :ProductState={
    availableSize:"20 mg"
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setAvailableSize:(state:ProductState,action : PayloadAction<string>)=>{
            state.availableSize = action.payload
        }
    }
})

export const {setAvailableSize} = productSlice.actions
export default productSlice.reducer