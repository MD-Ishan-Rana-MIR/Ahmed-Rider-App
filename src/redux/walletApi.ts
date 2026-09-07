import { baseApi } from "./baseApi";

export interface ProfileUpdateArgs {
  name: string;
  phone_number: string;
  gender: string;
  dob: string;
  address: string;
  imageFile?: { uri: string; name: string; type: string } | null;
}

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getWallectDashboard : builder.query({
        query : ()=>({
            url : `/wallet`,
            method : "GET"
        }),
        providesTags : ["Wallet","Deliver"]
    })
  }),
});

export const {
  useGetWallectDashboardQuery
} = walletApi;