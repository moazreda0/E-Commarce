import axios from "axios";
import toast from "react-hot-toast";


export async function addToCart(productId , productName) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      toast.success(`${productName.split(" ").slice(0, 2).join("")} has been added to your cart successfully!`);
      
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  }