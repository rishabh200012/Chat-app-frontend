import { useNavigate } from "react-router-dom";
import type { FormType } from "../typesAndInterface/types";
import { userLogin, userRegiter } from "../api/userServices";
import { useDispatch } from "react-redux";
import { setErrorPopup } from "../redux/errorMiddleware/errorSlice";
import { loginReducer, registerReducer } from "../redux/auth/authSlice";

const RegisterAndLoginForm = ({ formName }: FormType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const message = useSelector((state: RootState) => state.error.errorMessage);

  const handleRegister = async (formData: FormData) => {
    const userObj = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    try {
      const res = await userRegiter(userObj);
      if (!res.success) {
        throw new Error(res.message);
      } else {
        dispatch(registerReducer(userObj));
        navigate("/verify-otp");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(setErrorPopup(error.message));
      } else {
        dispatch(setErrorPopup("Unknown error"));
      }
    }
  };
  const handleLogin = async (formData: FormData) => {
    const userObj = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await userLogin(userObj);
      if (!res.success) {
        if (
          res.message === "User not found" ||
          res.message === "Unauthorised"
        ) {
          dispatch(setErrorPopup(res.message));
          navigate("/register");
        }
        throw new Error(res.message);
      } else {
        dispatch(loginReducer(res.userData));
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setErrorPopup(error.message));
      } else {
        dispatch(setErrorPopup("Unknown error"));
      }
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-md sm:p-6">
        {/* Title */}
        <h2 className="mb-6 text-center text-2xl font-bold">
          {formName === "Login" ? "Login" : "Register"}
        </h2>

        {/* Form */}
        <form
          className="space-y-4"
          action={formName === "Login" ? handleLogin : handleRegister}
        >
          {/* Name field (only for register) */}
          {formName === "Register" && (
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Password */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 cursor-pointer text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            {formName === "Login" ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle text */}
        <div className="text-center mt-4">
          {formName === "Login" ? (
            <p className="text-sm">
              Don’t have an account?{" "}
              <button
                className="text-blue-500 font-medium cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Back to Register
              </button>
            </p>
          ) : (
            <p className="text-sm">
              Already have an account?{" "}
              <button
                className="text-blue-500 font-medium cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterAndLoginForm;
