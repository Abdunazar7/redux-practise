import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: ["Flights", "Users"],
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: () => "/flights",
      providesTags: ["Flights"],
    }),

    addFlight: builder.mutation({
      query: (body) => ({
        url: "/flights",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Flights"],
    }),

    updateFlight: builder.mutation({
      query: ({ id, data }) => ({
        url: `/flights/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Flights", "Users"],
    }),

    deleteFlight: builder.mutation({
      query: (id) => ({
        url: `/flights/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Flights", "Users"],
    }),

    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    addUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    assignFlight: builder.mutation({
      query: ({ flightId, userIds }) => ({
        url: "/users/assign-flight",
        method: "POST",
        body: { flightId, userIds },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetFlightsQuery,
  useAddFlightMutation,
  useUpdateFlightMutation,
  useDeleteFlightMutation,
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAssignFlightMutation,
} = api;
