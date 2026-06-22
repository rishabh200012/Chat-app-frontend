import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";
import { socket } from "../socket/SocketConnection";
import {
  getAllUsers,
  createOrGetConversation,
  getMessages,
  logoutUser,
} from "../api/userServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutReducer } from "../redux/auth/authSlice";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [conversation, setConversation] = useState<any>(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const reduxUser = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("online-users", (user) => {
      setOnlineUsers(user);
    });
    return () => {
      socket.off("online-users");
    };
  }, []);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();

        if (res.success) {
          setUsers(res.users);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSendMessage = async () => {
    if (!text.trim()) return;

    socket.emit("send-message", {
      conversationId: conversation._id,
      receiverId: selectedUser._id,
      text,
    });

    setText("");
  };

  const handleUserClick = async (user: any) => {
    setSelectedUser(user);

    const res = await createOrGetConversation(user._id);

    if (res.success) {
      setConversation(res.conversation);
      const msgRes = await getMessages(res.conversation._id);

      if (msgRes.success) {
        setMessages(msgRes.messages);
      }
    }
  };

  const handleBackToUsers = () => {
    setSelectedUser(null);
    setConversation(null);
    setMessages([]);
  };

  const handleLogout = async () => {
    await logoutUser();
    socket.disconnect();

    dispatch(logoutReducer());

    navigate("/login");
  };
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <div
        className={`w-full flex-col border-r border-gray-200 dark:border-gray-700 md:w-80 ${selectedUser ? "hidden md:flex" : "flex"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-5 py-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-medium text-teal-700">
              {reduxUser.userName?.slice(0, 2).toUpperCase()}
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              {reduxUser.userName}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="border-b border-gray-200 px-3 py-2">
          <input
            className="w-full rounded-full bg-gray-100 px-4 py-2 text-sm outline-none placeholder-gray-400"
            placeholder="Search..."
          />
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user: any) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user)}
              className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-5 py-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
                {user.name?.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {messages.length === 0
                    ? "Tap to chat"
                    : messages[messages.length - 1].text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-start p-2.5">
          <button
            onClick={handleLogout}
            className="flex h-14 w-14 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-full border border-gray-300 transition hover:bg-gray-100"
          >
            <FaRegUser className="text-lg" />
            <span className="text-[10px] leading-none">Logout</span>
          </button>
        </div>
      </div>
      <div
        className={`flex min-w-0 flex-1 flex-col ${selectedUser ? "flex" : "hidden md:flex"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-gray-50 px-3 py-3 sm:px-5">
          {selectedUser ? (
            <>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToUsers}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 hover:bg-gray-200 md:hidden"
                >
                  <IoArrowBack className="text-lg" />
                </button>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
                  {selectedUser.name?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{selectedUser.name}</p>
                  <p
                    className={`text-xs ${onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-gray-400"}`}
                  >
                    {onlineUsers.includes(selectedUser._id)
                      ? "online"
                      : "offline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 sm:gap-5">
                <FaVideo
                  className="cursor-pointer"
                  onClick={() => navigate("/video-call")}
                />
                <IoCall
                  className="cursor-pointer"
                  onClick={() => navigate("/voice-call")}
                />
                <BsThreeDotsVertical className="cursor-pointer" />
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400">
              Welcome to the application select user from the list
            </p>
          )}
        </div>

        {/* Messages */}
        <div className="flex flex-1 flex-col gap-1 overflow-y-auto bg-gray-100 p-3 sm:p-6">
          {messages.map((message: any) => (
            <div
              key={message._id}
              className={`flex ${message.sender === selectedUser?._id ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] break-words rounded-2xl px-3 py-2 text-sm sm:max-w-xs ${message.sender === selectedUser?._id ? "rounded-bl-none bg-green-100 text-gray-900" : "rounded-br-none bg-white text-gray-900"}`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        {selectedUser && (
          <div className="flex items-center gap-3 border-t border-gray-200 bg-gray-50 px-3 py-3 sm:px-4">
            <input
              className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm outline-none"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message"
            />
            <button
              onClick={handleSendMessage}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white"
            >
              ➤
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
