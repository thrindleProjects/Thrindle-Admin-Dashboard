import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import formatDate from "../../utils/formatDate";
import { numberFormat } from "../../utils/formatPrice";
import NewLoader from "../newLoader/newLoader";
import MerchantHeader from "./MerchantHeader";

function MerchantProducts() {
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState([]);

  let { store_id } = useParams();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoadingProducts(true);
      const fetchProducts = async () => {
        try {
          let res = await axiosInstance.get(`/products/store/${store_id}`);
          setProducts(res.data.data);
          setLoadingProducts(false);
        } catch (error) {
          if (error.response) {
            console.log(error.response);
            toast.warning(`${error.response.data.message}`);
          } else {
            toast.error(`${error}`);
          }
        } finally {
          setLoadingProducts(false);
        }
      };

      fetchProducts();
    }

    return () => {
      mounted = false;
    };
  }, [store_id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="rounded-md shadow-md">
      <MerchantHeader text="Merchant's Products" />
      {loadingProducts ? (
        <div className="h-vh40">
          <NewLoader />
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <p className="p-2">No Products</p>
          ) : (
            <table className="bg-white-main w-full">
              <caption className="text-left p-4 font-Bold">
                {products.length > 1
                  ? `${products.length} products found`
                  : `${products.length} product found`}
              </caption>
              <thead>
                <tr className="grid grid-cols-5 p-4  border-t border-b border-white-borderGrey font-Medium text-white-tableHeader text-center">
                  <th>Product Name</th>
                  <th>Product Stock</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Upload Date</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className="grid grid-cols-5 border-b border-white-borderGrey p-4 text-white-text text-center"
                  >
                    <td>{product.name}</td>
                    <td>{product.no_in_stock}</td>
                    <td>{product.category.name}</td>
                    <td>N{numberFormat(product.price)}</td>
                    <td>{formatDate(product.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default MerchantProducts;
