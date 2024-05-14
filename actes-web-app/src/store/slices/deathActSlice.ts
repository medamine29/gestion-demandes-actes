import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { DeathInfo, CivilityType } from '../../data/interfaces.ts';

const deathInfoInitialState: Partial<DeathInfo> = {
  civility: CivilityType.MALE,
  deathDate: '',
  deathPlace: '',
  lastName: '',
  firstName: '',
  country: 'France',
}

export const deathActSlice = createSlice({
  name: 'deathAct',
  initialState: deathInfoInitialState,
  reducers: {
    setDeathInfo(state, action: PayloadAction<DeathInfo>) {
      return action.payload
    }
  },
  extraReducers(builder) {

  }
});

export const deathActReducer = persistReducer({
  key: 'rtk:deathAct',
  storage,
  whitelist: ['civility', 'deathDate', 'deathPlace', 'lastName', 'firstName', 'country']
}, deathActSlice.reducer);

export const { setDeathInfo } = deathActSlice.actions;
