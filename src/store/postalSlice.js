import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

const initialState = {
  data:[],
  loading : false,
  error : null
}

export const fetchPostaldata = createAsyncThunk (
  "master/postal_master",
  async () => {
    const response = await api.post("master/postal_master", {
        limit: 1000,
        start: 0,
        filter: {},
      })
      return response.data.result.data
  }
)

const postalSlice = createSlice({
  name : "postal",
  initialState,
  reducers : {},
  
  extraReducers : (builder) => {
    builder

    .addCase(fetchPostaldata.pending, (state) => {
      state.loading = true
    })

    .addCase(fetchPostaldata.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })

    .addCase(fetchPostaldata.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message
    })
  }
})

export default postalSlice.reducer;