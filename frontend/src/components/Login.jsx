import { Link, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { MdCheckCircle } from "react-icons/md"; // Example icon

const UserIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.33 4 18V20H20V18C20 15.33 14.67 14 12 14Z" />
  </svg>
);

const LockIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" />
  </svg>
);


const Login = () => {
  const {setIsAuthenticated} = useContext(AuthContext)
  const navigate = useNavigate();
  const {register, handleSubmit,reset} = useForm();
  const handleLogin = async (cred) => {
  try {
    await axios.post(
      "http://localhost:3000/api/auth/login",
      cred,
      {
        withCredentials: true   // 🔥 this is required to receive cookies
      }
    );
    setIsAuthenticated(true);
    toast.success("Login Successful", {
      icon: <MdCheckCircle style={{ color: "#006A71", fontSize: "40px" }} />
    });
    navigate("/caption");
    reset();
  } catch (error) {
    console.log(error.response.data.message);
      toast.error(error.response?.data?.message || "Login failed");
  }
};
  return (
    <div className="bg-[#F2EFE7] min-h-[90vh] flex items-center justify-center font-sans p-4">
      <div className="relative w-full max-w-sm flex justify-center">
        <div className="absolute h-15 w-15 md:w-30 md:h-30 bg-[#9ACBD0] rounded-full -top-7 -left-0 md:-top-15 md:-left-15 z-0"></div>
        <div className="absolute h-15 w-15 md:w-30 md:h-30 bg-[#48A6A7] rounded-full -bottom-7 -right-0 md:-bottom-15 md:-right-15 z-0"></div>
          <div className="relative max-sm:w-[80%] bg-white rounded-lg p-6 z-10 md:p-12">
          
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-center text-[#006A71] mb-2">LOGIN</h1>
            <p className="text-black/60 text-center mb-8">How to get started</p>

            <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  placeholder="Username"
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
                />
              </div>

              <div className="relative mb-6">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48A6A7]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#006A71] text-white font-bold py-3 rounded-lg hover:bg-[#48A6A7] transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                Login Now
              </button>
              <p className='flex justify-center pt-5 gap-2'>dont't have an account? <Link className='text-blue-700 underline' to="/signup">signup</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login
