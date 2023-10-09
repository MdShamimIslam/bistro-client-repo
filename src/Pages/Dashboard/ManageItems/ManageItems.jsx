import React from "react";
import { Helmet } from "react-helmet";
import SectionTitle from "../../../Components/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageItems = () => {
  const [menu, ,refetch] = useMenu();
  const [axiosSecure] = useAxiosSecure();

  const handleDelete = (item) => {
    
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete ${item.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/menu/${item._id}`)
          .then((data) => {
            if(data.data.deletedCount > 0){
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            
          });
      
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro-boss || manage items </title>
      </Helmet>
      <SectionTitle
        subHeading="Hurry Up"
        heading="MANAGE ALL ITEMS"
      ></SectionTitle>
      <div className="overflow-x-auto mt-4">
        <table className="table">
          <thead>
            <tr className="text-lg">
              <th>No</th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-lg">
            {menu?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
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
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost bg-red-700 text-white btn-sm"
                  >
                    <i className="fa-solid fa-trash-can"></i>
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

export default ManageItems;
