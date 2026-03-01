import React, { useEffect, useState } from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import { FireAPI } from "../hooks/useRequest";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const sliderSetting = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await FireAPI("products", "GET", null, null);
        console.log("Fetched Data:", data);
        setProducts(data?.products || []);
      } catch (error) {
        console.log("Error Feting products: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleAddProduct = async () => {
    const newProduct = {
      id: 31,
      title: "Essence Mascara Lash Princess",
      brand: "Essence",
      category: "beauty",
      price: 9.99,
      discountPercentage: 7.17,
      rating: 4.94,
      stock: 5,
      availabilityStatus: "In Stock",
      images: [
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
      ],
    };
    try {
      const response = await FireAPI("products/add", "POST", newProduct);
      console.log("Product added:", response);
      setProducts([...products, response]);
    } catch (error) {
      console.log("Error Uploading Product: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (id) => {
    const updatedData = {
      title: "Updated Product Title",
      price: 149,
    };
    try {
      const response = await FireAPI(`products/${id}`, "PUT", updatedData);
      console.log("Product updated:", response);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p)),
      );
    } catch (error) {
      console.log("Error Updating Product", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await FireAPI(`products/${id}`, "DELETE");
      console.log("product deleted");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.log("Error Updating Product", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-2">
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add Product
        </button>
        <button
          onClick={() => handleUpdateProduct(products[0]?.id)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Update First Product
        </button>
        <button
          onClick={() => handleDeleteProduct(products[0]?.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete First Product
        </button>
      </div>
      {loading ? (
        <div>
          <p>loading...</p>
        </div>
      ) : (
        <div className="">
          <div className="grid gap-6 m-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((item) => (
              <div
                key={item?.id}
                className="rounded-2xl flex flex-col items-center transition hover:scale-105 hover:shadow-xl duration-300"
              >
                {item?.images?.length > 0 ? (
                  <Slider {...sliderSetting} className="w-full">
                    {item.images.map((img, index) => (
                      <div key={index} className="">
                        <img
                          src={img}
                          alt={item.title}
                          className="w-full h-60 object-cover rounded-t-2xl"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-t-2xl">
                    <p>No Image</p>
                  </div>
                )}
                <div className="px-4 pb-4">
                  <h3 className="font-semibold text-lg mt-2">{item?.title}</h3>
                  <p className="text-sm text-gray-500">{item?.brand}</p>
                  <p className="text-sm text-gray-400 mt-2">{item?.category}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-semibold">${item?.price}</p>
                    <span className="text-sm text-green-600">
                      -${item?.discountPercentage}
                    </span>
                  </div>
                  <div className="flex items-center mt-1 text-yellow-500">
                    <FaStar />
                    {item?.rating}
                  </div>
                  <p
                    className={`text-sm font-medium mt-1 ${
                      item.availabilityStatus === "In Stock"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item?.stock}
                  </p>
                  <button className="bg-blue-500 text-white rounded-full mt-1 p-2 hover:bg-blue-600 transition">
                    <RiShoppingCartFill size={22} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;