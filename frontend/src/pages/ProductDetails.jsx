/*
import {Link} from "react-router-dom";

function ProductDetails({product}) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  return (
    <Link to={`/product/${product.id}`} className="block bg-white shadow-md hover:scale-[1.02] transition-transform p-4 rounded-lg cursor-pointer">
     <img src={`${BASEURL}${product.image}`} 
     alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
      <h2 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-gray-800 font-medium">${product.price.toFixed(2)}</p>
    </Link>
  );
}

export default ProductDetails;
*/

import { Link, useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";

function ProductDetails() {
  const { id } = useParams();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id, BASEURL]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center py-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={`${product.image}`}
            alt={product.name}
            className="w-full md:w-1/2 h-96 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-800 font-semibold text-xl mb-4">${product.price}</p>
            <button onClick={() => addToCart(product)} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add to Cart 🛒
            </button>
            {/*Home button*/}
            <div className="mt-4">
              <Link to="/" className="text-blue-600 hover:underline">
                &larr; Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;