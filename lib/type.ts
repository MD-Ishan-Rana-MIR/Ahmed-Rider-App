
// 1. Define Request Payload Interface
export interface RiderRegistrationPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
  country : string;
  city : string;
  currency : string

}

// 2. Define Response Interface
export interface RiderRegistrationResponse {
  success: string;
  message: string;
  data: {
    user : {
        id : number;
        name : string;
        email : string
    }
  };
}


export interface RiderOtpVerifyPayload {
  email : string;
  otp : string
}



export interface RiderOtpVerifyResponse {
  status : string;
  message : string;
  data : {
    id : Number;
    email : string;
    email_verified_at : string
  }
}