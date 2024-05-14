import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ActeType } from '../../data/interfaces.ts';
import { setBirthInfo } from "./birthActSlice.ts"
import { setMarriageInfo } from './marriageActSlice.ts';
import { setDeathInfo } from './deathActSlice.ts';
import { login } from '../thunks/login.thunk.ts';

interface AuthState {
  token?: string;
  actType?: ActeType
}

const initialState: AuthState = {
  token: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      delete state.token
    }
  },
  extraReducers(builder) {


    builder.addCase(setBirthInfo, (state, action) => {
      state.actType = ActeType.BIRTH
    })

    builder.addCase(setMarriageInfo, (state, action) => {
      state.actType = ActeType.MARRIAGE
    })

    builder.addCase(setDeathInfo, (state, action) => {
      state.actType = ActeType.DEATH
    })

    builder.addCase(login.fulfilled, (state, action) => {
      const { access_token } = action.payload
      state.token = access_token;
    })

  }
});

 export const authReducer = persistReducer({
  key: 'rtk:auth',
  storage,
  whitelist: ['token', 'actType']
}, authSlice.reducer);

export const { logout } = authSlice.actions;