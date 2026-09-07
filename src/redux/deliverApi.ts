import { baseApi } from "./baseApi";



export const deliveryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllDeliver: builder.query({
      query: ({ filter = 'on_the_way', per_page = 5, page = 1 }) =>
        `/rider/deliveries?filter=${filter}&per_page=${per_page}&page=${page}`,
      // Serialize query args to keep caching intact across page numbers if needed
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs.filter}`;
      },
      // Merge new page results with existing accumulated data
      merge: (currentCache, responseData, { arg }) => {
        if (arg.page === 1) {
          return responseData;
        }
        currentCache.data.orders.data.push(...responseData.data.orders.data);
        currentCache.data.orders.current_page = responseData.data.orders.current_page;

        currentCache.data.orders.last_page = responseData.data.orders.last_page;
      },
      
      // Refetch when page changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page || currentArg?.filter !== previousArg?.filter;
      },
      providesTags : ["Deliver","Wallet"]
    }),


    deliveryDetails : builder.query({
      query : (id)=>({
        url : `/rider/deliveries/${id}`,
        method : "GET"
      }),
      providesTags : ["Wallet","Deliver"]
    }),

    deliveryStatusUpdate : builder.mutation({
      query : ({id,payload})=>({
        url : `/rider/deliveries/${id}/status`,
        method : "PATCH",
        body : payload
      }),
      invalidatesTags : ["Deliver","Wallet"]
    })

    
  }),
});

export const {
    useGetAllDeliverQuery,
    useDeliveryDetailsQuery,
    useDeliveryStatusUpdateMutation
} = deliveryApi;