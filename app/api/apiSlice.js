import { createApi } from '@reduxjs/toolkit/query/react';
import createBaseQuery from './createBaseQuery';
export const apiSlice = createApi({
    baseQuery: createBaseQuery(API_URL),
    endpoints: (builder) => ({
        getLists: builder.query({
            query: () => `/get-lists`,
            // transformResponse: (response, meta, arg) => response.data,
            // transformErrorResponse: (response, meta, arg) => response.status,
        }),
        createList: builder.mutation({
            query: (list) => ({
                url: `/create`,
                method: 'POST',
                body: list
            }),
            // onQueryStarted is useful for optimistic updates
            // async onQueryStarted(
            //     arg,
            //     { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
            // ) { },
        }),
    }),
});

export const { useGetListsQuery, useCreateListMutation } = apiSlice;
