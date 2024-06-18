import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CivilityType, MarriageInfo } from '../../data/interfaces.ts';
import { actApi } from '../apis/act.api.ts';

const marriageInfoInitialState: Partial<MarriageInfo> = {
  marriageDate: '',
  relationship: undefined,
  actFormat: undefined,
  requestReason: undefined,
  country: '',
  marriagePlace: '',
  firstPerson: {
    civility: undefined,
    lastName: '',
    usageLastName: '',
    firstName: '',
    birthDate: '',
    unknownFather: false,
    fathersFirstName: '',
    fathersLastName: '',
    unknownMother: false,
    mothersFirstName: '',
    mothersLastName: ''
  },
  secondPerson: {
    civility: undefined,
    lastName: '',
    usageLastName: '',
    firstName: '',
    birthDate: '',
    unknownFather: false,
    fathersFirstName: '',
    fathersLastName: '',
    unknownMother: false,
    mothersFirstName: '',
    mothersLastName: ''
  }
}

export const marriageActSlice = createSlice({
  name: 'marriageAct',
  initialState: marriageInfoInitialState,
  reducers: {
    setMarriageInfo(state, action: PayloadAction<MarriageInfo>) {
      return action.payload
    }
  },
  extraReducers(builder) {
    builder.addMatcher(
      actApi.endpoints.addAct.matchFulfilled,
      (state, action) => {
        return marriageInfoInitialState;
      }
    );
  }
});

export const marriageActReducer = persistReducer({
  key: 'rtk:birthAct',
  storage,
  whitelist: ['marriageDate', 'country', 'marriagePlace', 'firstPerson', 'secondPerson', 'relationship', 'actFormat', 'requestReason']
}, marriageActSlice.reducer);

export const { setMarriageInfo } = marriageActSlice.actions;