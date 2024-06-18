import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { DeathInfo, CivilityType } from '../../data/interfaces.ts';
import { actApi } from '../apis/act.api.ts';

const deathInfoInitialState: Partial<DeathInfo> = {
  civility: CivilityType.MALE,
  relationship: undefined,
  actFormat: undefined,
  requestReason: undefined,
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
    builder.addMatcher(
      actApi.endpoints.addAct.matchFulfilled,
      (state, action) => {
        return deathInfoInitialState;
      }
    );
  }
});

export const deathActReducer = persistReducer({
  key: 'rtk:deathAct',
  storage,
  whitelist: ['civility', 'deathDate', 'deathPlace', 'lastName', 'firstName', 'country', 'relationship', 'actFormat', 'requestReason']
}, deathActSlice.reducer);

export const { setDeathInfo } = deathActSlice.actions;
