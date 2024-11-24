import { useContext } from "react";
import logo from "./../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { setToken, token } = useContext(authContext);
  const navigate = useNavigate();
  function Logout() {
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/Login");
  }
  return (
    <nav className="py-4  bg-slate-100 ">
      <div className="lg:w-[90%] mx-auto lg:text-center lg:flex lg:justify-between items-center ">
        <div className="nav-logo text-center">
          <img src={logo} alt="FreshCart Logo" className="m-auto" />
        </div>
        <div className="nav-links text-center lg:text-left">
          <ul className="space-x-4 lg:flex lg:space-x-6">
            {token ? (
              <>
                <li>
                  {" "}
                  {/* Products*/}
                  <NavLink to="/" className="hover:text-green-500">
                    Products
                  </NavLink>
                </li>
                <li>
                  {/* Brands*/}
                  <NavLink to="/brand" className="hover:text-green-500">
                    Brands
                  </NavLink>
                </li>
                <li>
                  {/* Category*/}
                  <NavLink to="/category" className="hover:text-green-500">
                    Category
                  </NavLink>
                </li>
                <li>
                  {/* Cart*/}
                  <NavLink to="/Cart" className="hover:text-green-500">
                  Cart <i className="fa-solid fa-cart-shopping"></i>
                  </NavLink>
                </li>
                 <li>
                  <NavLink to="/WishCart" className="hover:text-green-500">
                  WishCart <i className="fa-solid fa-face-grin-hearts"></i>
                  </NavLink>
                </li>
              </>
            ) : (
              " "
            )}
          </ul>
        </div>
        <div className="social-links text-center lg:text-left mt-4 lg:mt-0">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-gray-600 hover:text-blue-500"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-gray-600 hover:text-pink-500"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-gray-600 hover:text-blue-500"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
        <div className="auth-links text-center lg:text-left mt-4 lg:mt-0 space-x-4">
          {token ? (
            <button onClick={Logout} className="hover:text-green-500">
              {" "}
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="hover:text-green-700">
                Login{" "}
              </NavLink>
              <NavLink to="/register" className="hover:text-green-500">
                Register
              </NavLink>{" "}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
