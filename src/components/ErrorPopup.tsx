import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { useEffect } from "react";
import { clearErrorPopup } from "../redux/errorMiddleware/errorSlice";

const ErrorPopup = () => {
  const errorMessage = useSelector(
    (state: RootState) => state.error.errorMessage,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearErrorPopup());
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage, dispatch]);

  return (
    errorMessage && (
      <div className="fixed left-4 right-4 top-4 z-[9999] rounded-xl border border-white/20 bg-red-500 px-4 py-3 text-sm text-white shadow-lg sm:left-auto sm:right-5 sm:max-w-sm">
        {errorMessage}
      </div>
    )
  );
};
export default ErrorPopup;
