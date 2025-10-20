import { useContext, useEffect, useState } from "react";
import image from "../assets/image.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MdCheckCircle } from "react-icons/md";

const Profile = ({ isProfileOpen, setIsProfileOpen }) => {
  const { caption, user,isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get("http://localhost:3000/api/post", {
          withCredentials: true,
        });       
        setHistoryData(data.posts || []);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }
    // fetch only if user exists
    if (user) fetchPosts();
  }, [isAuthenticated, user,caption]);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true,
      });
      console.log(res);
      setIsAuthenticated(false);
      setIsProfileOpen(false);
      toast.success("Logged Out", {
        icon: <MdCheckCircle style={{ color: "#006A71", fontSize: "40px" }} />,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const copyText = async (text) => {
    try {
      if (!text) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      toast.success("Caption copied", {
        icon: <MdCheckCircle style={{ color: "#006A71", fontSize: "20px" }} />,
      });
    } catch (err) {
      toast.error("Failed to copy caption");
      console.log(err);
    }
  };

  useEffect(() => {
    if (isProfileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isProfileOpen]);

  return (
    <div className="h-screen overflow-y-auto bg-[#F2EFE7]">
      <span
        onClick={() => setIsProfileOpen(false)}
        className="text-3xl cursor-pointer flex justify-end pt-10 pr-10 hover:text-[#006A71]"
      >
        x
      </span>
      <div className="flex flex-col h-full p-6">
        <div className="h-[30%] border-b-[1.5px] border-gray-300 flex justify-between md:items-center flex-col md:flex-row ">
          <div className=" gap-5 flex h-full items-center">
            <div className="shadow-2xl h-20 w-20 md:h-30 md:w-30 rounded-full overflow-hidden">
              <img className="h-full w-full object-cover" src={image} alt="" />
            </div>
            <span>
              <h2 className=" text-2xl md:text-4xl capitalize">{user?.username}</h2>
              <p className=" text-sm md:text-lg text-gray-500 mt-[-8px]">{user?.email}</p>
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 bg-[#006A71] py-2 cursor-pointer rounded-md text-white font-medium transition-colors duration-200"
          >
            Logout
          </button>
        </div>
        <div className="mt-8">
          <span className="text-2xl font-semibold text-[#006A71]">
            HISTORY :
          </span>
          <div className="mt-4 space-y-4">
            {historyData.length === 0 ? (
              <p className="text-gray-500">No history available.</p>
            ) : (
              historyData.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt="history item"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-grow">
                    <p className="text-gray-700 line-clamp-2">{item.caption}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">
                        {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
                      </span>
                      <button
                        className="text-[#006A71] hover:text-[#48A6A7] text-sm font-medium"
                        onClick={() => copyText(item.caption)}
                      >
                        Copy Caption
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
