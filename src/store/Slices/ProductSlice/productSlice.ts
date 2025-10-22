import { Product } from "@/types/Product"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ProductState{
    availableSize:string,
    bulkProduct:Product[]
}

const initialState :ProductState={
    availableSize:"20 mg",
    bulkProduct:[]
}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        setAvailableSize:(state:ProductState,action : PayloadAction<string>)=>{
            state.availableSize = action.payload
        },
        setBulkProduct:(state:ProductState,action : PayloadAction<Product[]>)=>{
           state.bulkProduct = action.payload
        }
    }
})

export const {setAvailableSize,setBulkProduct} = productSlice.actions
export default productSlice.reducer