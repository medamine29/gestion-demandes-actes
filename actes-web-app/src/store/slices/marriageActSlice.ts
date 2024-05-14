import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CivilityType, MarriageInfo } from '../../data/interfaces.ts';

const marriageInfoInitialState: Partial<MarriageInfo> = {
  marriageDate: '',
  country: '',
  marriagePlace: '',
  firstPerson: {
    civility: CivilityType.MALE,
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
    civility: CivilityType.FEMALE,
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

  }
});

export const marriageActReducer = persistReducer({
  key: 'rtk:birthAct',
  storage,
  whitelist: ['marriageDate', 'country', 'marriagePlace', 'firstPerson', 'secondPerson']
}, marriageActSlice.reducer);

export const { setMarriageInfo } = marriageActSlice.actions;