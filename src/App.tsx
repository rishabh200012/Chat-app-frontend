import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import RegisterAndLoginForm from "./components/RegisterAndLoginForm";
import ProtectedRoute from "./protected/protectedRoute";
import ErrorPopup from "./components/ErrorPopup";
import VerifyOtp from "./components/VerifyOtp";
import { authCheck } from "./api/userServices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setErrorPopup } from "./redux/errorMiddleware/errorSlice";
import { logoutReducer } from "./redux/auth/authSlice";
import ChatPage from "./components/ChatPage";
import VideoCall from "./components/VideoCall";
import VoiceCall from "./components/VoiceCall";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const userValidation = async () => {
      try {
        const res = await authCheck();
        if (!res.success) {
          dispatch(logoutReducer());
          navigate("/login", { replace: true });
        }
      } catch (error) {
        dispatch(setErrorPopup("Something went wrong"));
        navigate("/login", { replace: true });
      }
    };
    userValidation();
  }, []);

  return (
    <>
      <ErrorPopup />

      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ChatPage />} />
          <Route path="/video-call" element={<VideoCall />} />
          <Route path="/voice-call" element={<VoiceCall />} />
        </Route>
        <Route
          path="/register"
          element={<RegisterAndLoginForm formName={"Register"} />}
        />
        <Route
          path="/login"
          element={<RegisterAndLoginForm formName={"Login"} />}
        />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </>
  );
}

export default App;
