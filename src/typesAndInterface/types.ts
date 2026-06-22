type FormName = "Login" | "Register";

export type FormType = {
  formName: FormName;
};

interface UserType {
  userName: string;
}

export interface UserSliceReducer {
  user: UserType;
  isAuthenticated: boolean;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}
export interface UserLogin {
  email: string;
  password: string;
}
export interface UserOtp {
  email: string;
  otp: string;
}
