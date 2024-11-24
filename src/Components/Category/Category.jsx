

  
  import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BallTriangle } from "react-loader-spinner";

const Category = () => {
  const [Categorys, setCategorys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllCategorys() {
    try {
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategorys(response.data.data); 
      setIsLoading(false); 
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching Categorys:", error);
    }
  }

  useEffect(() => {
    getAllCategorys();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Category</title>
      </Helmet>
      <h1 className="text-center text-2xl font-bold my-6">Brands</h1>

      {isLoading ? (
        <div className="h-[550px] flex justify-center items-center">
          <BallTriangle height={100} width={100} color="#4fa94d" visible />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {Categorys.map((category) => (
            <div
              key={category._id}
              className="m-4 p-4 border rounded-lg w-full sm:w-50 md:w-48 lg:w-44"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h2 className="text-center text-lg font-semibold">{category.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
