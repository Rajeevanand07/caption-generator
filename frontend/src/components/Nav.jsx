import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdCheckCircle } from "react-icons/md"; // Example icon


const Nav = () => {
  const {isAuthenticated,setIsAuthenticated} = useContext(AuthContext)
  const navigate = useNavigate();
  
  const handleLogout = () => {
    try {
      const res = axios.get("http://localhost:3000/api/auth/logout", { withCredentials: true })
      console.log(res);
      setIsAuthenticated(false);
      toast.success("Logged Out", {
        icon: <MdCheckCircle style={{ color: "#006A71", fontSize: "40px" }} />
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="bg-[#F2EFE7] min-h-[10vh] flex items-center ">
      <div className="px-4 sm:px-6 lg:px-8 flex w-full justify-center items-center">
        <div className="flex justify-between w-full items-center h-16">
          {/* Logo */}
          <div className="items-center flex">
            <Link to="/" className="flex items-center">
                <div className="relative inline-block">
                  <div className="absolute w-5 h-5 bg-[#9ACBD0] rounded-full -top-0 -left-2 "></div>
                  <span className="relative z-1 text-2xl font-bold" style={{ color: '#006A71' }}>
                    Caption.ai
                  </span>
                  <div className="absolute w-5 h-5 bg-[#48A6A7] rounded-full -bottom-0 -right-3"></div>
                </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              to="/caption"
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-[#F2EFE7] transition-colors duration-200"
              style={{ color: '#48A6A7' }}
            >
              Generate Caption
            </Link>
            <Link
              to="/profile"
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-[#F2EFE7] transition-colors duration-200"
              style={{ color: '#48A6A7' }}
            >
              Profile
            </Link>
          </div>

          {/* Auth Buttons */}
         {!isAuthenticated ? (
           <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 cursor-pointer rounded-md text-white font-medium transition-colors duration-200"
              style={{ backgroundColor: '#006A71' }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 cursor-pointer py-2 rounded-md font-medium border-2 transition-colors duration-200"
              style={{ 
                color: '#006A71',
                borderColor: '#006A71',
                backgroundColor: 'transparent'
              }}
            >
              Sign Up
            </Link>
          </div>
         ):(
           <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="px-4 cursor-pointer py-2 rounded-md text-white font-medium transition-colors duration-200"
              style={{ backgroundColor: '#006A71' }}
            >
              Logout
            </button>
          </div>
         )}
        </div>
      </div>
    </nav>
  )
}

export default Nav