import axios from "axios";
import toast from "react-hot-toast";

export async function getWishCart() {
  try {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token: localStorage.getItem("tkn") }
    });
    return response.data.data; // هترجع Array فيها المنتجات
  } catch (error) {
    console.error("Error fetching WishCart:", error);
    throw error;
  }
}

export  async function addToWishCart(productId , productName) {
  try {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers: { token: localStorage.getItem("tkn") } }
    );
    
    toast.success(`${productName.split(" ").slice(0, 2).join("")} has been added to your WishCart!`, {icon: '❤️',});
    
  } catch (error) {
    console.error('Failed to remove from WishCart:', error);

  } 
}


export  async function removeFromWishCart(productId , productName) {
  try {
    const { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
     
      { headers: { token: localStorage.getItem("tkn") } }
    );
    toast (`${productName.split(' ').slice(0, 2).join(' ')} has been removed from your WishCart!`, {
      icon: '💔',
    });

  } catch (error) {
    console.error('Failed to add to WishCart:', error);

  }
}


  
 