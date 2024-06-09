import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MunicipalityDetails } from "../../data/interfaces";

const territoryApi = createApi({
  reducerPath: 'territories',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}`,
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
            url: '/territories/countries',
            method: 'GET',
          };
        },
      }),
      fetchMunicipalities: builder.query<string[], string>({
        query: (searchInput: string) => {
          return {
            url: `/municipalities?searchInput=${searchInput}`,
            method: 'GET',
          };
        },
      }),
      fetchMunicipalityDetails: builder.query<MunicipalityDetails, string>({
        query: (name: string) => {
          return {
            url: `/municipalities/${name}`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { 
  useFetchCountriesQuery,
  useFetchMunicipalitiesQuery,
  useFetchMunicipalityDetailsQuery
} = territoryApi;

export { territoryApi };
