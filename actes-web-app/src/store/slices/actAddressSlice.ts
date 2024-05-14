import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ActAddress, BirthInfo, CivilityType } from '../../data/interfaces.ts';

const actAddressInitialState: Partial<ActAddress> = {
  civility: CivilityType.MALE,
  firstName: '',
  lastName: '',
  country: '',
  address: '',
  postalCode: '',
  city: '',
  email: '',
  validateEmail: '',
  phone: ''
}

export const actAddressSlice = createSlice({
  name: 'actAddress',
  initialState: actAddressInitialState,
  reducers: {
    setActAddress(state, action: PayloadAction<ActAddress>) {
      return action.payload
    }
  },
  extraReducers(builder) {

  }
});

export const actAddressReducer = persistReducer({
  key: 'rtk:actAddress',
  storage,
  whitelist: ['civility', 'firstName', 'lastName', 'country', 'address', 'postalCode', 'city', 'email', 'validateEmail', 'phone', 'relationship', 'actFormat']
}, actAddressSlice.reducer);

export const { setActAddress } = actAddressSlice.actions;
