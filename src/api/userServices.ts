import type {
  UserLogin,
  UserRegister,
  UserOtp,
} from "../typesAndInterface/types";

export const userRegiter = async (userData: UserRegister) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const userLogin = async (userData: UserLogin) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const otpVerify = async (userData: UserOtp) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const authCheck = async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/auth-check`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
};

export const getAllUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/chat-users`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
};

export const createOrGetConversation = async (receiverId: string) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/get-convo`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      receiverId,
    }),
  });

  return res.json();
};

export const getMessages = async (conversationId: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_URL}/conversation/${conversationId}/messages`,
    {
      credentials: "include",
    },
  );

  return res.json();
};
export const logoutUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
    method: "POST",
    credentials: "include",
  });
  return res.json();
};
// export const sendMessage = async (conversationId: string, text: string) => {
//   const res = await fetch(`${import.meta.env.VITE_BASE_URL}/message`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       conversationId,
//       text,
//     }),
//   });

//   return res.json();
// };
