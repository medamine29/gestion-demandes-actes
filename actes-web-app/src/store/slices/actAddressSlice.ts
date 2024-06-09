import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ActAddress, CivilityType, RequestReason } from '../../data/interfaces.ts';
import { actApi } from '../apis/act.api.ts';

const actAddressInitialState: Partial<ActAddress> = {
  civility: CivilityType.MALE,
  relationship: undefined,
  actFormat: undefined,
  copiesCount: undefined,
  requestReason: undefined,
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
    builder.addMatcher(
      actApi.endpoints.addAct.matchFulfilled,
      (state, action) => {
        return actAddressInitialState;
      }
    );
  }
});

export const actAddressReducer = persistReducer({
  key: 'rtk:actAddress',
  storage,
  whitelist: ['civility', 'firstName', 'lastName', 'country', 'address', 'postalCode', 'city', 'email', 'validateEmail', 'phone', 'relationship', 'actFormat', 'copiesCount', 'requestReason']
}, actAddressSlice.reducer);

export const { setActAddress } = actAddressSlice.actions;
