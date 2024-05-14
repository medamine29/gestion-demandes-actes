import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact, FetchMessages, SearchQuery } from "../../data/interfaces.ts";

const messageApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/messages`,
  }),
  tagTypes: ['Message'],
  endpoints(builder) {
    return {
      sendMessage: builder.mutation<void, Contact>({
        query: (requestBody: Contact) => ({
          url: '',
          method: 'POST',
          body: requestBody 
        })
      }),
      fetchMessages: builder.query<FetchMessages, SearchQuery>({
        query: (searchQuery?) => {
          return {
            url: '',
            method: 'GET',
            params: searchQuery
          };
        },
        providesTags: ['Message']
      }),
      deleteMessage: builder.mutation<void, string>({
        query: (messageId) => ({
          url: `/${messageId}`,
          method: 'DELETE'
        }),
        invalidatesTags: ['Message']
      }),
    };
  },
});

export const {
  useSendMessageMutation,
  useFetchMessagesQuery,
  useDeleteMessageMutation
} = messageApi;

export { messageApi };
