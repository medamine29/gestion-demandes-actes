import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Admin } from "../../data/interfaces";

const login: AsyncThunk<{ access_token: string }, Admin, {}> = createAsyncThunk<{ access_token: string }, Admin, {}>(
  "auth/login", 
  async (loginInfo: Admin, { rejectWithValue }) => {
    try {
      const { data: { access_token } }: { data: { access_token: string } } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, loginInfo);
      return { access_token }
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
});

export { login };
