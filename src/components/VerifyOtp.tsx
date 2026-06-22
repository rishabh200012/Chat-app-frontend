import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { otpVerify } from "../api/userServices";
import { setErrorPopup } from "../redux/errorMiddleware/errorSlice";
import { useNavigate } from "react-router-dom";
import { registerReducer } from "../redux/auth/authSlice";

const VerifyOtp = () => {
  const email = useSelector((state: RootState) => state.auth.user.userEmail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleVerifyOtp = async (formData: FormData) => {
    const userObj = {
      email,
      otp: formData.get("otp") as string,
    };
    try {
      const res = await otpVerify(userObj);
      if (res.success) {
        dispatch(registerReducer(res.userData));
        navigate("/");
      } else {
        dispatch(setErrorPopup(res.message));
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <form
        className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-md sm:p-8"
        action={handleVerifyOtp}
      >
        <h1 className="text-center text-2xl font-semibold">Verify OTP</h1>

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          className="
            px-4
            py-3
            rounded-lg
           
            border
           
            outline-none
            placeholder:text-gray-300
          "
        />

        <button
          type="submit"
          className="
            bg-blue-500
            hover:bg-blue-600
            transition
            text-white
            py-3
            rounded-lg
            font-medium
          "
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
