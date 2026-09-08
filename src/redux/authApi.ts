import { RiderOtpVerifyPayload, RiderOtpVerifyResponse, RiderRegistrationPayload, RiderRegistrationResponse } from "../../lib/type";
import { baseApi } from "./baseApi";

export interface ProfileUpdateArgs {
  name: string;
  phone_number: string;
  gender: string;
  dob: string;
  address: string;
  imageFile?: { uri: string; name: string; type: string } | null;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    riderRegistration: builder.mutation<RiderRegistrationResponse, RiderRegistrationPayload>({
      query: (data) => ({
        url: "/auth/rider/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags : ["Auth"]
    }),
    otpVerify: builder.mutation<RiderOtpVerifyResponse, RiderOtpVerifyPayload>({
      query: (data) => ({
        url: `/auth/email/verify`,
        method: "POST",
        body: data,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: `/auth/email/resend`,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags : ["Auth"]
    }),
    emailVerify: builder.mutation({
      query: (_data) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: _data,
      }),
      invalidatesTags : ["Auth"]
    }),
    forgetOtpVerify: builder.mutation({
      query: (data) => ({
        url: `/auth/forgot-password/verify`,
        method: "POST",
        body: data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (payload) => ({
        url: `/auth/forgot-password/reset`,
        method: "POST",
        body: payload,
      }),
    }),
    riderProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags : ["Auth"]
    }),
    riderLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags : ["Auth"]
    }),
    riderProfileUpdate: builder.mutation({
      query : (formData)=>({
        url : "/rider/profile",
        method : "POST",
        body : formData
      }),
      invalidatesTags : ["Auth"]
    }),

    profileBasickSetUp: builder.mutation({
      query: (data) => ({
        url: `/rider/profile/setup`,
        method: "POST",
        body: data
      }),
      invalidatesTags : ["Auth"]
    }),

    riderDocumentUpload: builder.mutation({
      query : (formData)=>({
        url : "/rider/profile/documents",
        method : "POST",
        body : formData
      }),
      invalidatesTags : ["Auth"]
    }),
    riderProfileImageAndNumber : builder.mutation({
      query : (formData)=>({
        url : `/rider/profile/finalize`,
        method : "POST",
        body : formData
      }),
      invalidatesTags : ["Auth"],
    })


  }),
});

export const {
  useRiderRegistrationMutation,
  useOtpVerifyMutation,
  useResendOtpMutation,
  useLoginMutation,
  useEmailVerifyMutation,
  useForgetOtpVerifyMutation,
  useForgetPasswordMutation,
  useRiderProfileQuery,
  useRiderLogoutMutation,
  useRiderProfileUpdateMutation,
  useProfileBasickSetUpMutation,
  useRiderDocumentUploadMutation,
  useRiderProfileImageAndNumberMutation
  
} = authApi;