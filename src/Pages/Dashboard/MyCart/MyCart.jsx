import React from "react";
import useCart from "../../../hooks/useCart";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";

const MyCart = () => {
  const [data] = useCart();
  const total = data?.reduce((sum,item)=> item.price + sum, 0);
  return (
    <div className="mt-10">
      <Helmet>
        <title>Bistro-boss || MyCart</title>
      </Helmet>
      <SectionTitle  heading={'MANAGE ALL ITEMS'} subHeading={'Hurry Up'}></SectionTitle>
      <div className="mt-12 flex items-center justify-between">
        <h3>Total items : {data?.length}</h3>
        <h4>Total Price : $ {total}</h4>
        <button className="btn btn-active">Pay</button>
      </div>
        <div className="overflow-x-auto mt-4">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <th>
                    <button className="btn btn-ghost">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default MyCart;
