import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import image from "../assets/image.png";
import Profile from "./Profile.jsx";

const Nav = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-[#F2EFE7] min-h-[10vh] flex items-center ">
      <div className="px-4 sm:px-6 lg:px-8 flex w-full justify-center items-center">
        <div className="flex justify-between w-full items-center h-16">
          {/* Logo */}
          <div className="items-center flex">
            <Link to="/" className="flex items-center">
              <div className="relative inline-block">
                <div className="absolute w-5 h-5 bg-[#9ACBD0] rounded-full -top-0 -left-2 "></div>
                <span
                  className="relative z-1 text-2xl font-bold"
                  style={{ color: "#006A71" }}
                >
                  Caption.ai
                </span>
                <div className="absolute w-5 h-5 bg-[#48A6A7] rounded-full -bottom-0 -right-3"></div>
              </div>
            </Link>
          </div>

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 cursor-pointer rounded-md text-white font-medium transition-colors duration-200"
                style={{ backgroundColor: "#006A71" }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 cursor-pointer py-2 rounded-md font-medium border-2 transition-colors duration-200"
                style={{
                  color: "#006A71",
                  borderColor: "#006A71",
                  backgroundColor: "transparent",
                }}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center justify-center space-x-2 cursor-pointer"
            >
              <div className="flex flex-col items-end">
                <span className="text-gray-400 text-sm">Welcome,</span>
                {user && (
                  <p className="text-xl capitalize mt-[-8px] text-gray-700">
                    {user.username}
                  </p>
                )}
              </div>
              <div className="w-12 shadow-2xl h-12 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={image}
                  alt="user profile"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`fixed right-0 top-0 h-screen z-20 bg-[#F2EFE7] md:w-[70%] lg:w-[50%] xl:w-[40%]  transition-transform duration-300 ease-in-out shadow-2xl
          ${isProfileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <Profile
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
        />
      </div>
    </nav>
  );
};

export default Nav;
