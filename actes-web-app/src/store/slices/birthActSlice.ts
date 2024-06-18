import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { BirthInfo, CivilityType } from '../../data/interfaces.ts';
import { actApi } from '../apis/act.api.ts';

const birthInfoInitialState: Partial<BirthInfo> = {
  civility: undefined,
  birthDate: '',
  lastName: '',
  firstName: '',
  country: 'France',
  birthPlace: '',
  unknownFather: false,
  fathersFirstName: '',
  fathersLastName: '',
  unknownMother: false,
  mothersFirstName: '',
  mothersLastName: ''
}

export const birthActSlice = createSlice({
  name: 'birthAct',
  initialState: birthInfoInitialState,
  reducers: {
    setBirthInfo(state, action: PayloadAction<BirthInfo>) {
      return action.payload
    }
  },
  extraReducers(builder) {
    builder.addMatcher(
      actApi.endpoints.addAct.matchFulfilled,
      (state, action) => {
        return birthInfoInitialState;
      }
    );
  }
});

export const birthActReducer = persistReducer({
  key: 'rtk:birthAct',
  storage,
  whitelist: ['civility', 'birthDate', 'lastName', 'firstName', 'country', 'birthPlace', 'unknownFather', 'fathersFirstName', 'fathersLastName', 'unknownMother', 'mothersFirstName', 'mothersLastName']
}, birthActSlice.reducer);

export const { setBirthInfo } = birthActSlice.actions;
