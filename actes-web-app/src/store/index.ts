import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Reducer } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
 } from 'redux-persist';
import { authSlice, authReducer } from "./slices/authSlice.ts";
import { birthActSlice, birthActReducer } from "./slices/birthActSlice.ts";
import { actAddressSlice, actAddressReducer } from "./slices/actAddressSlice.ts";
import { marriageActSlice, marriageActReducer } from "./slices/marriageActSlice.ts";
import { deathActSlice, deathActReducer } from "./slices/deathActSlice.ts";
import { territoryApi } from "./apis/territory.api.ts";
import { actApi } from "./apis/act.api.ts";
import { messageApi } from "./apis/message.api.ts";

const reducers = {
  [authSlice.name]: authReducer,
  [birthActSlice.name]: birthActReducer,
  [marriageActSlice.name]: marriageActReducer,
  [actAddressSlice.name]: actAddressReducer,
  [deathActSlice.name]: deathActReducer,
  [territoryApi.reducerPath]: territoryApi.reducer,
  [actApi.reducerPath]: actApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (
  state,
  action
 ) => {
  return combinedReducer(state, action);
 };

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat([
      territoryApi.middleware,
      actApi.middleware,
      messageApi.middleware
    ])
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export { setBirthInfo } from "./slices/birthActSlice.ts";
export { setMarriageInfo } from "./slices/marriageActSlice.ts"
export { setDeathInfo } from "./slices/deathActSlice.ts"
export { setActAddress } from "./slices/actAddressSlice.ts"
export { useFetchCountriesQuery, useFetchMunicipalitiesQuery, useFetchMunicipalityDetailsQuery } from "./apis/territory.api.ts"
export { useAddActMutation, useFetchActsQuery, useFetchActDetailsQuery, useDeleteActMutation } from "./apis/act.api.ts"
export { useSendMessageMutation, useFetchMessagesQuery, useDeleteMessageMutation } from "./apis/message.api.ts"

export { login } from "./thunks/login.thunk.ts"
export { logout } from "./slices/authSlice.ts"