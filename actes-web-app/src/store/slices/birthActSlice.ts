import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { BirthInfo, CivilityType } from '../../data/interfaces.ts';

const birthInfoInitialState: Partial<BirthInfo> = {
  civility: CivilityType.MALE,
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

  }
});

export const birthActReducer = persistReducer({
  key: 'rtk:birthAct',
  storage,
  whitelist: ['civility', 'birthDate', 'lastName', 'firstName', 'country', 'birthPlace', 'unknownFather', 'fathersFirstName', 'fathersLastName', 'unknownMother', 'mothersFirstName', 'mothersLastName']
}, birthActSlice.reducer);

export const { setBirthInfo } = birthActSlice.actions;
