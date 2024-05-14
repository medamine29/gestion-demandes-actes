import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const territoryApi = createApi({
  reducerPath: 'territories',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/territories`,
    // TODO : remove this
    // fetchFn: async (...args) => {
    //   await pause(1500);
    //   return fetch(...args)
    // },
  }),

  tagTypes: ['Territory'],
  endpoints(builder) {
    return {
      fetchCountries: builder.query<string[], void>({
        query: () => {
          return {
            url: '/countries',
            method: 'GET',
          };
        },
      }),
      fetchMunicipalities: builder.query<string[], string>({
        query: (name: string) => {
          return {
            url: `/municipalities?name=${name}`,
            method: 'GET',
          };
        },
      })
    };
  },
});

export const { 
  useFetchCountriesQuery,
  useFetchMunicipalitiesQuery
} = territoryApi;

export { territoryApi };
