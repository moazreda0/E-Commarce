import { Outlet } from 'react-router-dom'
import Navbar from './../Navbar/Navbar.JSX'

const Layout
 = () => {
    return (
      <>
      <Navbar />
      <Outlet/>
      
      <footer className="bg-green-800 text-white py-10 mt-auto">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap justify-between">
      
      {/* Company Info */}
      <div className="w-full md:w-1/4 mb-8">
        <h6 className="font-bold mb-4 text-lg text-center">About Us</h6>
        <p className="text-sm mx-5">
          Welcome to Your Store, your number one source for all things [product category]. We’re dedicated to providing you the best of products, with a focus on dependability, customer service, and uniqueness.
        </p>
      </div>

      {/* Quick Links */}
      <div className="w-full md:w-1/4 mb-8">
        <h6 className="font-bold mb-4 text-lg">Quick Links</h6>
        <ul>
          <li><a href="#" className="text-sm hover:text-yellow-400">Home</a></li>
          <li><a href="#" className="text-sm hover:text-yellow-400">Shop</a></li>
          <li><a href="#" className="text-sm hover:text-yellow-400">Categories</a></li>
          <li><a href="#" className="text-sm hover:text-yellow-400">About Us</a></li>
          <li><a href="#" className="text-sm hover:text-yellow-400">Contact Us</a></li>
        </ul>
      </div>

      {/* Customer Service */}
      <div className="w-full md:w-1/4 mb-8">
        <h6 className="font-bold mb-4 text-lg">Customer Service</h6>
        <ul>
          <li><a href="#" className="text-sm hover:text-yellow-400">FAQ</a></li>
          <li><a href="#" className="text-sm hover:text-yellow-400">Shipping & Returns</a></li>
          <li><a href="#" className="text-sm hover:text-yellow-400">Privacy Policy</a></li>
          <li><a href="#" className="text-sm hover:text-yellow-400">Terms & Conditions</a></li>
          <li><a href="#" className="text-sm hover:text-yellow-400">Support</a></li>
        </ul>
      </div>

      {/* Contact & Social Media */}
      <div className="w-full md:w-1/4 mb-8">
        <h6 className="font-bold mb-4 text-lg">Contact Us</h6>
        <p className="text-sm mb-4 ">Have any questions? We'd love to hear from you!</p>
        <ul>
          <li className="flex items-center mb-2">
            <i className="fa-solid fa-phone mr-2"></i>
            <span>+1 234 567 890</span>
          </li>
          <li className="flex items-center mb-2">
            <i className="fa-solid fa-envelope mr-2"></i>
            <span>support@yourstore.com</span>
          </li>
          <li className="flex items-center mb-2">
            <i className="fa-solid fa-map-marker-alt mr-2"></i>
            <span>1234 Your Street, City, Country</span>
          </li>
        </ul>
        <h6 className="font-bold mt-4 text-lg">Follow Us</h6>
        <div className="flex space-x-4 mt-2">
          <a href="#" className="text-gray-400 hover:text-yellow-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400">
            <i className="fab fa-pinterest-p"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="border-t border-gray-700 mt-8 pt-6 text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} Your Store Name. All Rights Reserved.</p>
      <div className="mt-4">
        <a href="#" className="text-sm text-gray-400 hover:text-yellow-400 mx-2">Privacy Policy</a>
        <a href="#" className="text-sm text-gray-400 hover:text-yellow-400 mx-2">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>



      </>
    )
  }
  
  export default Layout
  
