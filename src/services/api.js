import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scenarioAPI = createApi({
  reducerPath: "scenarioAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    addScenario: builder.mutation({
      query: (payload) => ({
        url: "scenarios",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Scenarios"],
    }),
    editScenario: builder.mutation({
      query: (payload) => ({
        url: "scenarios", //put icin buraya id gelebilir payload'un id kısmını alırız
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Scenarios"],
    }),
    getScenarios: builder.query({
      query: () => "scenarios",
      providesTags: ["Scenarios"],
    }),
    getScenarioById: builder.query({
      query: (id) => `scenarios/${id}`,
      providesTags: ["Scenarios"],
    }),
    deleteScenario: builder.mutation({
      query: (id) => ({
        url: `scenarios/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Scenarios"],
    }),
  }),
});
export const {
  useAddScenarioMutation,
  useEditScenarioMutation,
  useDeleteScenarioMutation,
  useGetScenarioByIdQuery,
  useGetScenariosQuery
} = scenarioAPI;
