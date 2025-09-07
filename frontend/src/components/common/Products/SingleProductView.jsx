import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cartReduxActions } from "@/features/shop/cartSlices";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "@phosphor-icons/react";
import ReviewsStar from "./ReviewsStar";

function SingleProductView({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addProducttoCart = (product) => {
    toast.custom((t) => (
      <div className="w-[23rem] inline-flex flex-col bg-bgprimary text-whiteprimary rounded-lg px-5 py-5 gap-2">
        <h3>Added Item to Cart</h3>
        <div className="flex flex-row gap-3">
          <div>
            <img
              className="w-[70px] h-[80px] bg-cover rounded-lg"
              src={product.featuredimageUrl}
              alt={product.productname}
            />
          </div>

          <div className="flex flex-col gap-2 px-2">
            <h4 className="text-lg">{product.productname}</h4>
            <p className="text-base">Quantity: {1}</p>
          </div>
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-whiteprimary text-bgsecondary py-2 font-normal"
          onClick={() => navigate("/cart")}
        >
          View Cart
        </button>
      </div>
    ));
    dispatch(
      cartReduxActions.addItemstoCart({
        _id: product._id,
        featuredimageUrl: product.featuredimageUrl,
        productname: product.productname,
        price: product.price,
        quantity: 1,
      })
    );
  };
  return (
    <div
      key={product?._id}
      className="flex flex-col justify-between bg-white rounded-xl md:rounded-2xl p-4 mb-2 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group/parent overflow-hidden border border-gray-100"
    >
      <Link reloadDocument to={`/products/${product?._id}`}>
        <div className="w-full aspect-square mb-3 overflow-hidden rounded-xl">
          <img
            src={product?.featuredimageUrl}
            loading="lazy"
            alt={product?.productname}
            className="w-full h-full object-cover group-hover/parent:scale-105 transition duration-500"
          />
        </div>
        <ReviewsStar />
        <div className="flex flex-col my-3 min-h-[80px]">
          <p className="text-sm md:text-base font-medium my-2 hover:text-bgsecondary transition line-clamp-2 flex-grow">
            {product?.productname}
          </p>
          <div className="flex flex-row gap-2 items-baseline">
            <p className="text-lg md:text-xl font-bold text-bgprimary">
              {"₹" + product?.price}
            </p>
            {product?.oldprice && (
              <p className="text-sm md:text-base font-normal text-gray-400 line-through">
                {"₹" + product?.oldprice}
              </p>
            )}
          </div>
        </div>
      </Link>
      <Button
        variant="outline"
        className="w-full group/button !rounded-xl mt-auto border-bgprimary text-bgprimary hover:bg-bgprimary hover:text-white"
        onClick={() => addProducttoCart(product)}
      >
        <ShoppingBag
          size={18}
          className="group-hover/button:text-white"
        />
        <span className="ml-2 group-hover/button:text-white">
          Add to cart
        </span>
      </Button>
    </div>
  );
}

export default SingleProductView;
