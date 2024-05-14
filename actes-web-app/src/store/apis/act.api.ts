import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ActDetails, AddAct, FetchActs, SearchQuery } from "../../data/interfaces.ts";

const actApi = createApi({
  reducerPath: 'acts',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/acts`,
  }),
  tagTypes: ['Act'],
  endpoints(builder) {
    return {
      addAct: builder.mutation<void, AddAct>({
        query: (requestBody: AddAct) => ({
          url: '/',
          method: 'POST',
          body: requestBody 
        })
      }),
      fetchActs: builder.query<FetchActs, SearchQuery>({
        query: (searchQuery?) => {
          return {
            url: '',
            method: 'GET',
            params: searchQuery
          };
        },
        providesTags: ['Act']
      }),
      fetchActDetails: builder.query<ActDetails, string>({
        query: (actId) => {
          return {
            url: `/${actId}`,
            method: 'GET'
          };
        },
      }),
      deleteAct: builder.mutation<void, string>({
        query: (actId) => ({
          url: `/${actId}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Act']
      }),
    };
  },
});

export const {
  useAddActMutation,
  useFetchActsQuery,
  useFetchActDetailsQuery,
  useDeleteActMutation
} = actApi;

export { actApi };
