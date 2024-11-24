import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BallTriangle } from "react-loader-spinner";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllBrands() {
    try {
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      setBrands(response.data.data); // تحديث الحالة مع البيانات المستلمة
      setIsLoading(false); // إيقاف التحميل بعد استلام البيانات
    } catch (error) {
      setIsLoading(false); // إيقاف التحميل في حالة حدوث خطأ
      console.error("Error fetching brands:", error);
    }
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Brand</title>
      </Helmet>
      <h1 className="text-center text-2xl font-bold my-6">Brands</h1>

      {isLoading ? (
        <div className="h-[550px] flex justify-center items-center">
          <BallTriangle height={100} width={100} color="#4fa94d" visible />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="m-4 p-4 border rounded-lg w-full sm:w-60 md:w-48 lg:w-44"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h2 className="text-center text-lg font-semibold">{brand.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Brand;
