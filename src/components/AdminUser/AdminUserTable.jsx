import React from "react";

const AdminUserTable = ({ data, index }) => {
  return (
    <div>
      <div className="flex justify-between text-right text-sm items-center">
        <p>{index + 1}</p>
        <img
          alt=""
          className="w-16 h-16"
          src={`http://store-staging-api.thrindle.com/api/thrindle/images/${data?.product?.images[0]}`}
        />
        <p>{data?.product?.name}</p>
        <p>N {data?.product?.original_price.toLocaleString()}.00</p>
        <p> {data?.product?.market.name}</p>
        <p> {data?.product?.category.name}</p>
        <p> {data?.action}</p>
      </div>
      <hr className="my-7" />
    </div>
  );
};

export default AdminUserTable;
