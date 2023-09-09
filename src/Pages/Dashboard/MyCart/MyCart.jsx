import React from "react";
import useCart from "../../../hooks/useCart";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import Swal from "sweetalert2";

const MyCart = () => {
  const [cart] = useCart();
  const total = cart.reduce((sum, item) => item.price + sum, 0);

const handleDelete = item =>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:5000/carts/${item._id}`,{
        method:'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        
        // console.log(data);
        // if(data.deletedCount > 0{
        //   Swal.fire(
        //     'Deleted!',
        //     'Your file has been deleted.',
        //     'success'
        //   )
        // })
        
      }
      )
      
    }
  })
}

  return (
    <div className="mt-10 w-full lg:ml-16">
      <Helmet>
        <title>Bistro-boss || MyCart</title>
      </Helmet>
      <SectionTitle
        heading={"WANNA ADD MORE?"}
        subHeading={"My Cart"}
      ></SectionTitle>

      <div className="mt-12 text-xl font-semibold flex items-center justify-between bg-green-700 p-2 rounded ">
        <div>
          
          <h3>Total items : {cart?.length}</h3>
        </div>
        <div>
          <h4>Total Price : $ {total}</h4>
        </div>
        <button className="btn btn-active bg-purple-600 text-white">Pay</button>
      </div>
      <div className="overflow-x-auto mt-4">
        <table className="table">
          <thead>
            <tr className="text-lg text-white">
              <th>No</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {cart?.map((item, index) => (
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
                  <button onClick={()=> handleDelete(item)} className="btn btn-ghost bg-red-700 text-white btn-sm">
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
